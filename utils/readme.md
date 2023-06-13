## How to use

1. First ensure you updated the variable paths in the Powershell program, if it says "Change this" change the path.

2. Second, you may have an error message that the script is undigitally signed, a fix for this would to enter this command in your Powershell terminal.
    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```
3. Run the program by first, changing the directory to the program's directory then do `.\Database-Builder_GC-Content.ps1`

### Dependencies
 - Powershell 6.0 or later
 - An internet connection
 - 50GB of temp storage (lower might work)
 - The Rust GC Content Program

### Bugs and Issues
If you get some sort of weird permission error or failed to uncompress, the file might be corrupted (delete it and try again) or your drive is still processing the file (wait a few minutes then run program again).

Working as of 6/13/2023