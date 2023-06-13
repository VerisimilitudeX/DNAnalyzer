# Configuration
$ftpServer = "ftp.ncbi.nlm.nih.gov"
$ftpBaseDirectory = "/genomes/genbank/plant/"
$downloadDirectory = "Z:\Learning\Rust\DNAnalyzer\DNAnalyzer-NCBI\assets"
$7zipProgram = "C:\Program Files\7-Zip\7zG"

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

# Create FTP URL
$ftpUrl = "http://$ftpServer$ftpBaseDirectory"

# Get list of directories in the base directory
#Write-Host "Getting list of directories in $ftpUrl..."
$response = Invoke-WebRequest -Uri $ftpUrl
$directories = $response.links.href
$directories.split(" ")
# Loop through each directory
foreach ($plant_directory in $directories[1..$directories.Length]) {
    # Get list of files in the directory
    #Write-Host("Plant Directory: $ftpUrl $plant_directory")
    $response = Invoke-WebRequest -Uri $ftpUrl$plant_directory"latest_assembly_versions/"
    Write-Host $ftpUrl$plant_directory"latest_assembly_versions/"
    $files = $response.links.href
    $files = $files.split()| where {$_}
    $unique_file = $files[1]
    $files = $files[0]
    $filename = $unique_file.replace("/","") + "_genomic.fna.gz"
    Write-Host "File1s: " $filename
    # Find the file ending with "genomic.fna.gz" and download it

    $Path = $ftpServer + $files + "latest_assembly_versions/"+ $unique_file + $filename
    Write-Host "Path: $Path"
    Write-Host "Downloading file: $Path"

    $plant_directory = $plant_directory.replace("/","-")
    DownloadFile $Path "$downloadDirectory\$plant_directory$filename"

}
