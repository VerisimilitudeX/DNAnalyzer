# Local DNA Analyzer Setup Guide

This guide explains how to set up and run the local DNA Analyzer with web interface integration.

## Prerequisites

- Java 17 or higher
- Gradle build tool
- Modern web browser
- DNA Analyzer application downloaded and built

## Setup Steps

1. **Build the Application**
   ```bash
   ./gradlew build
   ```

2. **Start the Local Server**
   ```bash
   ./gradlew bootRun
   ```
   This will start the Spring Boot application on port 8080.

3. **Access the Web Interface**
   - Open your web browser and navigate to the DNAnalyzer website
   - Scroll down to the "Local Analyzer" section
   - You'll see a form with:
     - File path input field
     - Checkboxes for analysis features:
       - Verbose Mode (-v)
       - Detailed Report (-d)
       - Quick Analysis (-q)

## Using the Local Analyzer

1. **Enter File Path**
   - Provide the full path to your DNA file
   - Example: `/path/to/your/dna/sequence.fa`

2. **Select Features**
   - Check the boxes for desired analysis features
   - Each feature maps to a command-line argument:
     - Verbose Mode → -v
     - Detailed Report → -d
     - Quick Analysis → -q

3. **Run Analysis**
   - Click the "Run Analysis" button
   - The analysis will be performed locally using your installed DNA Analyzer
   - Results will be displayed on the webpage

## Troubleshooting

If you encounter issues:

1. **Server Connection**
   - Ensure the local server is running on port 8080
   - Check if you see any error messages in the terminal

2. **File Access**
   - Verify the file path is correct and accessible
   - Ensure proper read permissions for the file

3. **Analysis Errors**
   - Check the server logs for detailed error messages
   - Verify that the DNA Analyzer is properly installed

## Technical Details

- The web interface communicates with a local REST API
- API endpoint: `http://localhost:8080/api/analyze`
- CORS is enabled to allow web access to local server
- The server translates web interface selections into command-line arguments

For additional help or bug reports, please visit our [GitHub repository](https://github.com/VerisimilitudeX/DNAnalyzer) or join our [Discord server](https://discord.gg/xNpujz49gj).