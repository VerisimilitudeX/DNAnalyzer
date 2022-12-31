$downloads_folder = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path # specifys what downlaods folder is

$dir_path = ("$downloads_folder" + '/DNAnalyzer')

try {
    if ([System.IO.Directory]::Exists($dir_path)) 
    {
        Write-Host "The directory already exists."
    }
    else {
        # trys to create directory for DNAnalyzer in downloads folder
        New-Item -Path "$downloads_folder/DNAnalyzer/" -ItemType Directory
    }
}
catch [System.Exception] {
    Write-Host "Something went wrong..." -ForegroundColor Red
    Write-Error $_.Exception.Message
}

$url = 'https://github.com/Verisimilitude11/DNAnalyzer/releases/latest' # actual release
$alt_url = 'https://github.com/Verisimilitude11/DNAnalyzer/archive/refs/tags/' # source code

$request = [System.Net.WebRequest]::Create($url)
$response = $request.GetResponse()
$realTagUrl = $response.ResponseUri.OriginalString
$version = $realTagUrl.split('/')[-1].Trim('v') # example is "2.1.1"

$realDownloadUrl = $realTagUrl.Replace('tag', 'download') + '/' + "DNAnalyzer-" + $version + '.zip' # published asset
$Alt_realDownloadUrl = ($alt_url + 'v' + $version + '.zip')

$Download_URLs = @("$realDownloadUrl", "$Alt_realDownloadUrl")
$realDownloadUrl # 0
$Alt_realDownloadUrl # 1

Function Installation {
    param($version, $fileName, $folder_fileName, $Download_URLs, $Live_URL)
    Write-Host "Attempting to fetch file, please wait..."

    try {
        Invoke-WebRequest -Uri $Download_URLs[$Live_URL] -OutFile $dir_path/$fileName
    }
    catch {
        Write-Host "Fetch Failed," "StatusCode:" $Error -ForegroundColor Red
        Pause
    }

    if ([System.IO.File]::Exists("$dir_path/$fileName")) {
        Write-Host "Fetch Sucessful!" -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version
            
        try {
            Expand-Archive -Path ("$dir_path$fileName") -DestinationPath ("$dir_path$fileName").Replace('.zip', '')
            Expand-Archive -Path ("$dir_path$fileName") -DestinationPath ("$dir_path$fileName").Replace('.zip', '')
        }
        catch { 
            Write-Host "Failed to uncomperss archieve!"
        }        
    }
}

function Before_installation_checks {
    param($version, $dir_path, $Download_URLs, $Live_URL)
    $fileName = ("DNAnalyzer-" + $version + '.zip') # published asset/
    $alt_filename = ($version + '.zip') # source code asset
    $folder_fileName = "DNAnalyzer-" + $version # not zipped
    $folder_alt_filename = $version # not zipped

    if ([System.IO.File]::Exists("$dir_path" + "$folder_fileName")) {
        Write-Host ("boom1")
        # if folder with version exists
        Write-Host ("Latest verison installed") -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version 
    }
    elseif ([System.IO.File]::Exists("$dir_path" + '/' + "$fileName") -or [System.IO.File]::Exists("$dir_path" + "$alt_fileName")) {
        # if zipped file exists and folder does not
        Write-Host ("boom2")
        Write-Host 'Trying to uncompress archieve...' 
        try {
            # attempts to expand zip file 
            Expand-Archive -Path ("$dir_path" + "$alt_filename") -DestinationPath ("$dir_path" + "$folder_alt_filename")
            Expand-Archive -Path ("$dir_path" + "$fileName") -DestinationPath ("$dir_path + $folder_filename")
        }
        catch {
            Write-Host "Failed to uncomperss archieve!" -ForegroundColor Red  
        }
    }
    else {
        Write-Host ("boom3")
    }
    
    if ([System.IO.File]::Exists("$dir_path" + "$folder_fileName") -or [System.IO.File]::Exists("$dir_path" + "$folder_alt_filename")) {
        # if folder exists
        Write-Host ('Sucessfully uncompressed zip file to, ' + "$dir_path" + ' attempting to remove zipped file.') -ForegroundColor Green
        try {
            Remove-Item ("$dir_path/$fileName") # attempts to remove zip file
        }
        catch {
            Write-Host 'Failed to remove zipped folder.' -ForegroundColor Red
        } 
            
        else {
            <# If neither zipped file or folder exists with the correct version, start installation #>
            Write-Host 'File not already found on system.'
            Installation ($version, $fileName, $folder_fileName, $Download_URLs, $Live_URL) # call instalation process function
        }
    }
}
## introduction
try {
    $alt_response = Invoke-WebRequest -Method Head -Uri $Alt_realDownloadUrl -UseBasicParsing 
    $alt_content = $alt_response.Headers."Content-Type"
    $alt_content

    $response = Invoke-WebRequest -Method Head -Uri $realDownloadUrl -UseBasicParsing
    $content = $response.Headers."Content-Type"
    $content
}
catch [System.Net.WebException] {
    if ($content -eq 'application/zip') {
        # actual release
        $Live_URL = 0
        $fileName = "DNAnalyzer-" + $version + ".zip" # published asset
        $folder_fileName = "DNAnalyzer-" + $version # not zipped
        Before_installation_checks ($version, $dir_path, $Download_URLs, $Live_URL)

    }
    elseif ($alt_content -eq 'application/zip') {
        # source
        if ($folder_fileName -ne ("DNAnalyzer-" + $version + ".zip")) {
            # if folder_fileName is not already assigned by previous IF
            $Live_URL = 1
            $folder_fileName = $version # not zipped
            Before_installation_checks ($version, $dir_path, $Download_URLs, $Live_URL)
        }
    } 
    else {
        Write-Host 'Something went wrong...' -ForegroundColor Red
        $Error
        Pause
    }
}
catch {
    Write-Host 'Something went wrong...' -ForegroundColor Red
    $Error
    Pause
}


## completion
if ([System.IO.File]::Exists("$dir_path$fileName".Replace('.zip', ''))) {
    Remove-Item ("$dir_path$fileName") # attempts to remove zip file
    Set-Location -Path ("$dir_path$fileName" + '\' + "$filename").Replace('.zip', '')
    ./gradlew build
    try {
        ./gradlew run --args="--gui"
    }
    catch {
        $Error.Clear
        Write-Host ($Error) -ForegroundColor Red
    }
    
    Write-Host ("Installation Complete!") -ForegroundColor Green
    Write-Host "Version:" -ForegroundColor Green $version 
}
