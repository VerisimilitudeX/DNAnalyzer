// Server page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const serverStatusElement = document.getElementById('server-status');
    
    // Copy command functionality for chmod command
    function copyChmodCommand() {
        const command = 'chmod +x ./gradlew';
        copyToClipboardWithFeedback(command, 0);
    }
    
    // Copy command functionality for build command
    function copyBuildCommand() {
        const command = './gradlew clean bootJar';
        copyToClipboardWithFeedback(command, 1);
    }
    
    // Copy command functionality for run command
    function copyRunCommand() {
        const command = 'java -jar build/libs/DNAnalyzer.jar';
        copyToClipboardWithFeedback(command, 2);
    }
    
    // Helper function to copy and show feedback
    function copyToClipboardWithFeedback(command, buttonIndex) {
        navigator.clipboard.writeText(command).then(() => {
            const copyButton = document.querySelectorAll('.copy-button')[buttonIndex];
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
            }, 2000);
        });
    }
    
    // Make copy functions available globally for the onclick handlers
    window.copyChmodCommand = copyChmodCommand;
    window.copyBuildCommand = copyBuildCommand;
    window.copyRunCommand = copyRunCommand;

    // Server status check functionality
    async function checkServerStatus() {
        try {
            const response = await fetch('http://localhost:8081/api/status');
            const data = await response.json();
            
            if (data.status === 'online') {
                serverStatusElement.innerHTML = `
                    <div style="color: #4CAF50">
                        ● Server Online
                        <br>
                        <small>Last checked: ${new Date().toLocaleTimeString()}</small>
                    </div>
                `;
            } else {
                throw new Error('Server offline');
            }
        } catch (error) {
            serverStatusElement.innerHTML = `
                <div style="color: #f44336">
                    ● Server Offline
                    <br>
                    <small>Last checked: ${new Date().toLocaleTimeString()}</small>
                    <br>
                    <small>Follow the setup steps above to start the server</small>
                </div>
            `;
        }
    }

    // Check status immediately and then every 30 seconds
    checkServerStatus();
    setInterval(checkServerStatus, 30000);
});