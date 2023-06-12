$folderPath = "Z:\Learning\Rust\DNAnalyzer\assets" # change this to the folder containing the files you want to process
$programPath = "Z:\Learning\Rust\DNAnalyzer\DNAnalyzer-Rust-GC_Content.exe" # change this to the path of the rust program 
$outputFolderPath = "Z:\Learning\Rust\DNAnalyzer\src\output" # change this to where to output the GC content data.

# Create the output folder if it doesn't exist
#New-Item -ItemType Directory -Force -Path $outputFolderPath | Out-Null

# Get all items in the folder and filter only the files
$files = Get-ChildItem -Path $folderPath | Where-Object { -not $_.PSIsContainer }

# Get all items in the folder and filter only the files
$files = Get-ChildItem -Path $folderPath | Where-Object { -not $_.PSIsContainer }

foreach ($file in $files) {
    $outputFilePath = Join-Path -Path $outputFolderPath -ChildPath ($file.BaseName + ".txt")

    # Start the program as a background process, redirecting its output
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = $programPath
    $processInfo.Arguments = $file.FullName
    $processInfo.RedirectStandardOutput = $true
    $processInfo.UseShellExecute = $false
    $processInfo.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $processInfo

    # Start the process
    $process.Start() | Out-Null

    # Continuously read and print the program's output until the process is complete
    while (!$process.HasExited) {
        $output = $process.StandardOutput.ReadLine()
        if ($output) {
            Write-Host "Program Output for file $($file.Name): $output"
            $output | Out-File -FilePath $outputFilePath -Append
        }
    }

    # Capture and print any remaining output after the process has completed
    $remainingOutput = $process.StandardOutput.ReadToEnd()
    if ($remainingOutput) {
        Write-Host "Program Output for file $($file.Name): $remainingOutput"
        $remainingOutput | Out-File -FilePath $outputFilePath -Append
    }

    # Close the process
    $process.Close()
    $process.Dispose()
}