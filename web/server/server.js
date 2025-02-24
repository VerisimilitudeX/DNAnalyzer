// Server page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const serverStatusElement = document.getElementById('server-status');
    let statusCheckInterval;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    // Copy commands functionality
    function copyToClipboardWithFeedback(command, buttonIndex) {
        navigator.clipboard.writeText(command).then(() => {
            const button = document.getElementsByClassName('copy-button')[buttonIndex];
            button.textContent = 'Copied!';
            button.classList.add('success');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('success');
            }, 2000);
        }).catch(() => {
            const button = document.getElementsByClassName('copy-button')[buttonIndex];
            button.textContent = 'Failed!';
            button.classList.add('error');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('error');
            }, 2000);
        });
    }

    window.copyCloneCommand = () => copyToClipboardWithFeedback('git clone https://github.com/VerisimilitudeX/DNAnalyzer.git && cd DNAnalyzer', 0);
    window.copyChmodCommand = () => copyToClipboardWithFeedback('chmod +x ./gradlew', 1);
    window.copyBuildCommand = () => copyToClipboardWithFeedback('./gradlew clean bootJar', 2);
    window.copyRunCommand = () => copyToClipboardWithFeedback('java -jar build/libs/DNAnalyzer.jar', 3);

    // Server status check with retry logic
    async function checkServerStatus(isInitialCheck = false) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch('http://localhost:8080/health', {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            retryCount = 0; // Reset retry count on success
            
            serverStatusElement.innerHTML = `
                <div class="status-indicator online">
                    <div class="status-dot"></div>
                    <div class="status-details">
                        <div class="status-main">Server Online</div>
                        <div class="status-info">
                            <span>Status: Running</span>
                            <span>Last checked: ${new Date().toLocaleTimeString()}</span>
                            <span>Ready to process DNA sequences</span>
                        </div>
                    </div>
                </div>
            `;
            return true;

        } catch (error) {
            retryCount++;
            const isMaxRetries = retryCount >= MAX_RETRIES;
            
            serverStatusElement.innerHTML = `
                <div class="status-indicator offline">
                    <div class="status-dot"></div>
                    <div class="status-details">
                        <div class="status-main">Server Offline</div>
                        <div class="status-info">
                            <span>Last checked: ${new Date().toLocaleTimeString()}</span>
                            ${isInitialCheck ? '<span>Follow the setup steps above to start the server</span>' : ''}
                            ${!isInitialCheck && !isMaxRetries ? `<span>Retrying... (${retryCount}/${MAX_RETRIES})</span>` : ''}
                            ${isMaxRetries ? '<span>Max retries reached. Check server setup instructions above.</span>' : ''}
                        </div>
                    </div>
                </div>
            `;

            if (isMaxRetries) {
                clearInterval(statusCheckInterval);
                showTroubleshooting();
            }
            return false;
        }
    }

    function showTroubleshooting() {
        const troubleshootingSection = document.querySelector('.troubleshooting');
        if (troubleshootingSection) {
            troubleshootingSection.classList.add('active');
            troubleshootingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Initialize status checking
    async function initializeStatusCheck() {
        const isOnline = await checkServerStatus(true);
        
        if (!isOnline) {
            // If offline on first check, start checking more frequently initially
            statusCheckInterval = setInterval(() => checkServerStatus(), 5000);
            
            // After 30 seconds, switch to normal interval if server is still offline
            setTimeout(() => {
                clearInterval(statusCheckInterval);
                statusCheckInterval = setInterval(() => checkServerStatus(), 30000);
            }, 30000);
        } else {
            // If online, check every 30 seconds
            statusCheckInterval = setInterval(() => checkServerStatus(), 30000);
        }
    }

    // Start status checking
    initializeStatusCheck();

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (statusCheckInterval) {
            clearInterval(statusCheckInterval);
        }
    });
});