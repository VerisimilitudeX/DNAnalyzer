# Specify the downloads folder
$downloads_folder = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path

$ErrorActionPreference = 'SilentlyContinue' 
$ProgressPreference = 'SilentlyContinue'  # adds increased downloading speed

# Set the path for the DNAnalyzer directory in the downloads folder
$dir_path = "$downloads_folder/DNAnalyzer"

try {
    # Check if the directory already exists
    if ([System.IO.Directory]::Exists($dir_path)) {
        Write-Host "The directory already exists."
    } else {
        # Try to create the directory for DNAnalyzer in the downloads folder
        New-Item -Path "$downloads_folder/DNAnalyzer/" -ItemType Directory
    }
} catch [System.Exception] {
    # Catch any errors and print a message
    Write-Host "Something went wrong..." -ForegroundColor Red
    Write-Error $_.Exception.Message
}

# Set the URL for the latest release and the source code
$url = 'https://github.com/Verisimilitude11/DNAnalyzer/releases/latest'
$alt_url = 'https://github.com/Verisimilitude11/DNAnalyzer/archive/refs/tags/'

# Make a request to the URL and get the response
$request = [System.Net.WebRequest]::Create($url)
$response = $request.GetResponse()

# Get the original URL of the response
$realTagUrl = $response.ResponseUri.OriginalString

# Split the URL by '/' and get the last element, then remove the 'v' prefix
$version = $realTagUrl.split('/')[-1].Trim('v')

# Set the published asset download URL and the source code download URL
$realDownloadUrl = "$realTagUrl/download/DNAnalyzer-$version.zip"
$Alt_realDownloadUrl = "$alt_url" + 'v' + "$version.zip"

Function Installation {
    param($version, $Download_URL, $dir_path, $fileName, $Live_URL)

    Write-Host "Attempting to fetch file, please wait..."

    try {
        # Download the file from the specified URL
        Invoke-WebRequest -Uri $Download_URL[$Live_URL] -OutFile "$($dir_path)/$($fileName[$Live_URL]).zip"
    } catch {
        # Catch any errors and print a message
        Write-Host "Fetch Failed," "StatusCode:" $Error -ForegroundColor Red
        Pause
    }

    # Check if the file was successfully downloaded
    if ([System.IO.File]::Exists("$($dir_path)/$($fileName[$Live_URL]).zip")) {
        Write-Host "Fetch Sucessful!" -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version

        try {
            # Uncompress the archive
            Expand-Archive -Path "$($dir_path)/$($fileName[$Live_URL]).zip" -DestinationPath "$($dir_path)/$($fileName[$Live_URL])"
        } catch { 
            # Catch any errors and print a message
            Write-Host "Failed to uncomperess archieve!"
        }        
    }
}

function Before_installation_checks {
    param($version, $dir_path, $Download_URL, $fileName, $Live_URL)

    # Check if already installed
    if ([System.IO.File]::Exists("$($dir_path)/$($fileName[$Live_URL])")) {
        Write-Host ("Latest verison already installed") -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version
        Pause
    }
    # Check if the zipped file for the correct version exists, but the folder does not
    elseif ([System.IO.File]::Exists("$($dir_path)/$($fileName[$Live_URL]).zip")) {
        Write-Host 'Trying to uncompress archieve...' 
        try {
            # Attempt to expand the zip file
            Expand-Archive -Path "$($dir_path)/$($fileName[$Live_URL]).zip" -DestinationPath "$($dir_path)/$($fileName[$Live_URL])"
        } catch {
            Write-Host "Failed to uncomperss archieve!" -ForegroundColor Red
            Pause  
        } else {
            try {
                # Attempt to remove the zip file
                Remove-Item "$($dir_path)/$($fileName[$Live_URL]).zip"
                } catch {
                Write-Host 'Failed to remove zipped folder.' -ForegroundColor Red
                Write-Host 'Permisson Error?'
            } else {
                # Check if the folder for the correct version already exists
                if ([System.IO.File]::Exists("$($dir_path)/$($fileName[$Live_URL])")) {
                    Write-Host ("Latest verison sucessfully unzipped!") -ForegroundColor Green
                    Write-Host "Location:"  $dir_path/$fileName[$Live_URL] -ForegroundColor Green
                    }
            }
        }
    }
    if (-not (Test-Path -Path ("$($dir_path)/$($fileName[$Live_URL]).zip")) -and -not (Test-Path -Path "$($dir_path)/$($fileName[$Live_URL])")) {
        # If neither zipped file or folder exists with the correct version, start installation
        Write-Host 'File/Folder not already found on system.'
        Installation $version $Download_URL $dir_path $fileName $Live_URL # Call installation process function
    }
}

## Introduction

# Store the URLs in an array
$Download_URL = @("$realDownloadUrl", "$Alt_realDownloadUrl")

try {
    # Check the content type of the source code asset and published asset
    $alt_response = Invoke-WebRequest -Method Head -Uri $Download_URL[1] -UseBasicParsing 
    $alt_content = $alt_response.Headers."Content-Type"
    # $alt_content source code

    $response = Invoke-WebRequest -Method Head -Uri $Download_URL[0] -UseBasicParsing
    $content = $response.Headers."Content-Type"
    # $content  actual release
}
catch [System.Net.WebException] {
    if ($null -eq $content -and $null -eq $alt_content) {
        Write-Host 'Internet error maybe?' -ForegroundColor Red
        Pause
    }
}
catch {
    # Catch any other errors and print a message
    Write-Host 'Something went wrong...' -ForegroundColor Red
    $Error
}

finally {
    # If the 'actual release' content type is a zip file, proceed with installation
    
    $fileName = @("DNAnalyzer-$version", "DNAnalyzer-$version-BETA_SOURCE")
    
    if ($content -eq 'application/zip') {
        # Actual Release
        $Live_URL = 0 
        Before_installation_checks $version $dir_path $Download_URL $fileName $Live_URL
    }
    
    # If the 'source code' content type is a zip file, proceed with installation
    elseif ($alt_content -eq 'application/zip') {
        # Source code
        $Live_URL = 1
        Before_installation_checks $version $dir_path $Download_URL $fileName $Live_URL
    }
     
    else {
        # If the content type is not a zip file, print an error message
        Write-Host 'Something went wrong...' -ForegroundColor Red
        $Error
        Pause
    }
    
}

# Clean up and compilation
if ([System.IO.File]::Exists("$($dir_path)/$($fileName[$Live_URL]).zip")) { # if zipped file exists
    # Remove the zip file
    try {
        # Attempt to remove the zip file
        Remove-Item "$($dir_path)/$($fileName[$Live_URL]).zip"
    }
    catch {
        Write-Host 'Failed to remove zipped folder.' -ForegroundColor Red
        $Error
    }
    $subfolder_location = Get-ChildItem -Path "$($dir_path)/$($fileName[$Live_URL])/" -Filter "*DNAnalyzer*" -Directory
    $items = Get-ChildItem -Path "$($dir_path)/$($fileName[$Live_URL])/$($subfolder_location)"
    $items | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "$($dir_path)/$($fileName[$Live_URL])"
    }
    
    if (Test-Path "$($dir_path)/$($fileName[$Live_URL])/$($fileName[0])") {
        Remove-Item -Path "$($dir_path)/$($fileName[$Live_URL])/$($fileName[0])" -Recurse
    }
}

# Change the location to the unzipped folder
Set-Location -Path "$($dir_path)/$($fileName[$Live_URL])/$($subfolder_location)"
$installer_location = Get-Location
explorer "$installer_location"
# Runs the gradle build and run commands
try {
    ./gradlew build
    ./gradlew run --args="--gui"
}
catch { # prints the error
    Write-Host ($Error) -ForegroundColor Red
}

# Print a success message
Write-Host ("Installation Complete!") -ForegroundColor Green
Write-Host "Version:" -ForegroundColor Green $version 
