# Configuration for scraper
$ftpServer = "ftp.ncbi.nlm.nih.gov"
$ftpBaseDirectory = "/genomes/genbank/plant/"
$downloadDirectory = "Y:\Github\NCBI Assets" # change this
$ftpUrl = "http://$ftpServer$ftpBaseDirectory"
$global:FileLimit = 10; # how many files to download before invoking Process_GC_Content, higher the number the larger the space
#$7zipProgram = "C:\Program Files\7-Zip\7zG"

# Configuration for processor
$GC_Content = "Z:\Learning\Rust\DNAnalyzer\DNAnalyzer-Rust-GC_Content-x64_compiled.exe" # change this to the path of the rust program 
$report_out = "Z:\Learning\Rust\DNAnalyzer\assets\output" # change this to where to output the GC content data.

# Function to download file
function DownloadFile($remotePath, $localPath) {
    try {
        if (!(Test-Path $localPath -PathType Leaf)) {
        $remotePath = "http://" + $remotePath 
        Start-BitsTransfer -Source $remotePath -Destination $localPath
        Write-Host "Downloaded file: $localPath"
        }
    }
    catch {
        Write-Host "Failed to download file: $remotePath"
        Write-Host $_.Exception.Message
    }
}
function Process_GC_Content($assets_compressed, $GC_Content, $report_out) {
    Write-Host "Processing GC Content..." -ForegroundColor Green
    $files = Get-ChildItem -Path $assets_compressed -Filter *.gz
    Function Gunzip-File([ValidateScript({Test-Path $_})][string]$File){
        $srcFile = Get-Item -Path $File
        $newFileName = Join-Path -Path $srcFile.DirectoryName -ChildPath $srcFile.BaseName
    
        try
        {
            $srcFileStream = New-Object System.IO.FileStream($srcFile.FullName,([IO.FileMode]::Open),([IO.FileAccess]::Read),([IO.FileShare]::Read))
            $dstFileStream = New-Object System.IO.FileStream($newFileName,([IO.FileMode]::Create),([IO.FileAccess]::Write),([IO.FileShare]::None))
            $gzip = New-Object System.IO.Compression.GZipStream($srcFileStream,[System.IO.Compression.CompressionMode]::Decompress)
            $gzip.CopyTo($dstFileStream)
        } 
        catch
        {
            Write-Host "$_.Exception.Message" -ForegroundColor Red
        }
        finally
        {
            $gzip.Dispose()
            $srcFileStream.Dispose()
            $dstFileStream.Dispose()
        }
    }

    foreach ($file in $files) {
        try {
            [System.IO.File]::OpenWrite($file).Close()
            $Writable = $true
        }
        catch {
            $Writable = $false
            Write-Host "$_.Exception.Message" -ForegroundColor Red      
        }
        if ($Writable) {
        # Unzip the file
        Write-Host "Unzipping file $($file.Name)..."
        Gunzip-File -File $file.FullName
        $asset_compressed = Join-Path -Path $assets_compressed -ChildPath $file
        $asset_uncompressed = Join-Path -Path $assets_compressed -ChildPath $file.BaseName
        $file_size = (Get-Item $asset_uncompressed).length/1MB
        Write-Host "`nUncompress Complete! File Size: $file_size MB `nOutput file path: $asset_uncompressed`n" -ForegroundColor Green

        # Run the program with the unzipped file as an argument
        $programOutput = & $GC_Content $asset_uncompressed

        # Save the program's output to the output file
        if ($programOutput -like "*Average*") {
            $programOutput | Out-File -FilePath $report_out\$($file.BaseName).txt
            Write-Host "Program Output: $programOutput `n"
            Write-Host "Saved program output to file located at $report_out\$($file.BaseName).txt" -ForegroundColor Green
        }
        else {Write-Host "Something went wrong with the program output." -ForegroundColor Red}

        # Delete the unzipped file
        try {
            if (Test-Path -Path $asset_compressed -PathType Leaf) {
                Remove-Item -Path $asset_compressed -Force
            }
        }
        catch {
            Write-Host "$_.Exception.Message" -ForegroundColor Red
            Write-Host "Failed to delete file: $asset_compressed"
        }

        try {
            if (Test-Path -Path $asset_uncompressed -PathType Leaf) {
                Remove-Item -Path $asset_uncompressed -Force
            }
        }
        catch {
            Write-Host "$_.Exception.Message" -ForegroundColor Red
            Write-Host "Failed to delete file: $asset_uncompressed"
        }
        }
    }

}
# Get list of directories in the base directory
Write-Host "Getting list of directories in $ftpUrl..."
$response = Invoke-WebRequest -Uri $ftpUrl
$directories = $response.links.href
$directories.split(" ")
function ResumeCount($FullDownloadDirectory, $count) {
    if (Test-Path -Path $FullDownloadDirectory -PathType Leaf) {
        $count += 1
        Write-Host "File already exists: $FullDownloadDirectory"
        return $count
    }
    else {
        Write-Host "Downloading file: $plant_directory$filename"
        DownloadFile $Path $FullDownloadDirectory
        $count += 1
        return $count
    }
}

# Loop through each directory
foreach ($plant_directory in $directories[1..$directories.Length]) {
    # Get list of files in the directory
    #Write-Host("Plant Directory: $ftpUrl $plant_directory")
    $response = Invoke-WebRequest -Uri $ftpUrl$plant_directory"latest_assembly_versions/"
    $files = $response.links.href
    $files = $files.split()| Where-Object {$_}
    $unique_file = $files[1]
    $files = $files[0]
    $filename = $unique_file.replace("/","") + "_genomic.fna.gz"
    # Find the file ending with "genomic.fna.gz" and download it

    $Path = $ftpServer + $files + "latest_assembly_versions/"+ $unique_file + $filename

    $plant_directory = $plant_directory.replace("/","-")
    $FullDownloadDirectory = "$downloadDirectory\$plant_directory$filename"

    $count = ResumeCount $FullDownloadDirectory $count
    Write-Host "Files in queue to be processed: $count, waiting until $FileLimit files..."
    if ($count -eq $FileLimit) {
        Process_GC_Content $downloadDirectory $GC_Content $report_out
        $count = 0
    }
}
