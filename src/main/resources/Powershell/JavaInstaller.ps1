[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17.0.5")
[System.Environment]::SetEnvironmentVariable("Path", [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine) + ";$($env:JAVA_HOME)\bin")
