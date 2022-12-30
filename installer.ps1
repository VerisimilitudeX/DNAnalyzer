$downloads_folder = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path 
$ErrorActionPreference = "Stop"

try {
    $dir_path = New-Item -Path $downloads_folder/DNAnalyzer/ -ItemType Directory
    }
catch {
    Write-Output "Directory Exists Already"
    $dir_path = "$downloads_folder/DNAnalyzer/"
}

$url = 'https://github.com/Verisimilitude11/DNAnalyzer/releases/latest'
$request = [System.Net.WebRequest]::Create($url)
$response = $request.GetResponse()
$realTagUrl = $response.ResponseUri.OriginalString
$version = $realTagUrl.split('/')[-1].Trim('v')
$fileName = "DNAnalyzer-" + $version + ".zip"
$realDownloadUrl = $realTagUrl.Replace('tag', 'download') + '/' + $fileName

try {
    Expand-Archive -Path ("$dir_path" + "$version" + '.zip')
    Expand-Archive -Path ("$dir_path" + "$fileName")
}
catch {}

if ([System.IO.File]::Exists("$dir_path" + "$version"))
    {
        Write-Host ("Latest verison already installed") -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version 
        pause
    } 
elseif ([System.IO.File]::Exists(("$dir_path" + "$fileName").Replace('.zip',  '')))
{
    Write-Host "Latest verison already installed" -ForegroundColor Green
    Write-Host "Version:" -ForegroundColor Green $version 
    pause
    
}

Write-Host "Attempting to fetch file, please wait..."
try {
Invoke-WebRequest -Uri $realDownloadUrl -OutFile $dir_path/$fileName
} catch {
  Write-Host "Fetch Failed, trying again..." "StatusCode:" $_.Exception.Response.StatusCode.value__ -ForegroundColor Red
        }

if ([System.IO.File]::Exists("$dir_path/$fileName")) 
    {
    Write-Host "Fetch Sucessful!" -ForegroundColor Green
    Write-Host "Version:" -ForegroundColor Green $version
    }
else {
    $url = 'https://github.com/Verisimilitude11/DNAnalyzer/archive/refs/tags/' # url
    $version = 'v' + $version
    $fileName = $version + ".zip"
    $realDownloadUrl = $url + $fileName
    Invoke-WebRequest -Uri $realDownloadUrl -OutFile $dir_path/$fileName
    }

if ([System.IO.File]::Exists("$dir_path/$fileName"))
    {
        Write-Host "Fetch Sucessful!" -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version
        
        try {
            Expand-Archive -Path ("$dir_path" + '\'+ "$fileName") -DestinationPath ("$dir_path" + '\'+ "$fileName").Replace('.zip',  '')
            Expand-Archive -Path ("$dir_path" + "$version" + '.zip') -DestinationPath "$dir_path/$fileName"
        }
        catch { 
            Write-Host "Failed to uncomperss archieve!"
        }        
    }   

if ([System.IO.File]::Exists("$dir_path/$fileName".Replace('.zip',  '')))
    {
    Remove-Item ("$dir_path/$fileName")
    Set-Location -Path ("$dir_path" + '\'+ "$fileName" + '\' + "$filename").Replace('.zip',  '')
    ./gradlew build
    try {
        ./gradlew run --args="--gui"
        }
    catch {
    Write-Host ($_.Exception.Message) -ForegroundColor Red
    }
    
    Write-Host ("Installation Complete!") -ForegroundColor Green
    Write-Host "Version:" -ForegroundColor Green $version 
    pause
    } 
elseif ([System.IO.File]::Exists(("$dir_path" + "$fileName").Replace('.zip',  '')))
{
    Remove-Item ("$dir_path" + "$fileName")
    Write-Host "Installation Complete!" -ForegroundColor Green
    Write-Host "Version:" -ForegroundColor Green $version 
    pause
    
}
