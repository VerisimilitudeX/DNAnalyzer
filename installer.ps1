# Specify the downloads folder
$downloads_folder = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path

# Set the path for the DNAnalyzer directory in the downloads folder
$dir_path = "$downloads_folder/DNAnalyzer"

try {
    # Check if the directory already exists
    if ([System.IO.Directory]::Exists($dir_path)) 
    {
        Write-Host "The directory already exists."
    }
    else {
        # Try to create the directory for DNAnalyzer in the downloads folder
        New-Item -Path "$downloads_folder/DNAnalyzer/" -ItemType Directory
    }
}
catch [System.Exception] {
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
$Alt_realDownloadUrl = "$alt_url/v$version.zip"

# Store the URLs in an array
$Download_URLs = @("$realDownloadUrl", "$Alt_realDownloadUrl")

# Print the URLs for debugging
$realDownloadUrl # 0
$Alt_realDownloadUrl # 1

Function Installation {
    param($version, $fileName, $folder_fileName, $Download_URLs, $Live_URL)

    Write-Host "Attempting to fetch file, please wait..."

    try {
        # Download the file from the specified URL
        Invoke-WebRequest -Uri $Download_URLs[$Live_URL] -OutFile "$dir_path/$fileName"
    }
    catch {
        # Catch any errors and print a message
        Write-Host "Fetch Failed," "StatusCode:" $Error -ForegroundColor Red
        Pause
    }

    # Check if the file was successfully downloaded
    if ([System.IO.File]::Exists("$dir_path/$fileName")) {
        Write-Host "Fetch Sucessful!" -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version

        try {
            # Uncompress the archive
            Expand-Archive -Path "$dir_path/$fileName" -DestinationPath "$dir_path/$fileName".Replace('.zip', '')
            Expand-Archive -Path "$dir_path/$fileName" -DestinationPath "$dir_path/$fileName".Replace('.zip', '')
        }
        catch { 
            # Catch any errors and print a message
            Write-Host "Failed to uncomperss archieve!"
        }        
    }
}

function Before_installation_checks {
    param($version, $dir_path, $Download_URLs, $Live_URL)

    # Set the file names for the published asset and source code asset
    $fileName = "DNAnalyzer-$version.zip"
    $alt_filename = "$version.zip"

    # Set the folder names for the unzipped published asset and source code asset
    $folder_fileName = "DNAnalyzer-$version"
    $folder_alt_filename = $version

    # Check if the folder for the correct version already exists
    if ([System.IO.File]::Exists("$dir_path/$folder_fileName")) {
        Write-Host ("boom1")
        Write-Host ("Latest verison installed") -ForegroundColor Green
        Write-Host "Version:" -ForegroundColor Green $version 
    }
    # Check if the zipped file for the correct version exists, but the folder does not
    elseif ([System.IO.File]::Exists("$dir_path/$fileName") -or [System.IO.File]::Exists("$dir_path/$alt_fileName")) {
        Write-Host ("boom2")
        Write-Host 'Trying to uncompress archieve...' 
        try {
            # Attempt to expand the zip file
            Expand-Archive -Path "$dir_path/$alt_filename" -DestinationPath "$dir_path/$folder_alt_filename"
            Expand-Archive -Path "$dir_path/$fileName" -DestinationPath "$dir_path/$folder_filename"
        }
        catch {
            Write-Host "Failed to uncomperss archieve!" -ForegroundColor Red  
        }
    }
    else {
        Write-Host ("boom3")
    }
    
    # Check if the folder for the correct version now exists
    if ([System.IO.File]::Exists("$dir_path/$folder_fileName") -or [System.IO.File]::Exists("$dir_path/$folder_alt_filename")) {
        Write-Host ('Sucessfully uncompressed zip file to, ' + "$dir_path" + ' attempting to remove zipped file.') -ForegroundColor Green
        try {
            # Attempt to remove the zip file
            Remove-Item "$dir_path/$fileName"
        }
        catch {
            Write-Host 'Failed to remove zipped folder.' -ForegroundColor Red
        } 
    }
    else {
        # If neither zipped file or folder exists with the correct version, start installation
        Write-Host 'File not already found on system.'
        Installation ($version, $fileName, $folder_fileName, $Download_URLs, $Live_URL) # call instalation process function
    }
}

## Introduction
try {
    # Check the content type of the source code asset and published asset
    $alt_response = Invoke-WebRequest -Method Head -Uri $Alt_realDownloadUrl -UseBasicParsing 
    $alt_content = $alt_response.Headers."Content-Type"
    $alt_content

    $response = Invoke-WebRequest -Method Head -Uri $realDownloadUrl -UseBasicParsing
    $content = $response.Headers."Content-Type"
    $content
}
catch [System.Net.WebException] {
    # If the content type is a zip file, proceed with installation
    if ($content -eq 'application/zip') {
        # Actual release
        $Live_URL = 0
        $fileName = "DNAnalyzer-$version.zip" # Published asset
        $folder_fileName = "DNAnalyzer-$version" # Not zipped
        Before_installation_checks ($version, $dir_path, $Download_URLs, $Live_URL)

    }
    elseif ($alt_content -eq 'application/zip') {
        # Source code
        if ($folder_fileName -ne "DNAnalyzer-$version.zip") {
            # If folder_fileName is not already assigned by previous IF
            $Live_URL = 1
            $folder_fileName = $version # Not zipped
            Before_installation_checks ($version, $dir_path, $Download_URLs, $Live_URL)
        }
    } 
    else {
        # If the content type is not a zip file, print an error message
        Write-Host 'Something went wrong...' -ForegroundColor Red
        $Error
        Pause
    }
}
catch {
    # Catch any other errors and print a message
    Write-Host 'Something went wrong...' -ForegroundColor Red
    $Error
    Pause
}

## Completion
if ([System.IO.File]::Exists("$dir_path$fileName".Replace('.zip', ''))) {
    # Remove the zip file
    Remove-Item "$dir_path$fileName"

    # Change the location to the unzipped folder
    Set-Location -Path "$dir_path$fileName".Replace('.zip', '')

    # Run the gradle build and run commands
    ./gradlew build
    try {
        ./gradlew run --args="--gui"
    }
    catch {
        # Clear the error and print it
        $Error.Clear
        Write-Host ($Error) -ForegroundColor Red
    }
    
    # Print a success message
    Write-Host ("Installation Complete!") -ForegroundColor Green
    Write-Host "Version:" -ForegroundColor Green $version 
}
