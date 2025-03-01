/*
 * DNAnalyzer Server Page JavaScript
 * Copyright © 2025 Piyush Acharya
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Navbar scroll behavior
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Server status check
    const serverStatusElement = document.getElementById('server-status');
    let statusCheckInterval;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const SERVER_PORT = 8080;
    
    // Copy commands functionality
    window.copyCloneCommand = function() {
        copyToClipboard('git clone https://github.com/VerisimilitudeX/DNAnalyzer.git && cd DNAnalyzer', 0);
    };
    
    window.copyChmodCommand = function() {
        copyToClipboard('chmod +x ./gradlew', 1);
    };
    
    window.copyBuildCommand = function() {
        copyToClipboard('./gradlew clean bootJar', 2);
    };
    
    window.copyRunCommand = function() {
        copyToClipboard('java -jar build/libs/DNAnalyzer.jar', 3);
    };
    
    function copyToClipboard(text, buttonIndex) {
        navigator.clipboard.writeText(text).then(() => {
            const buttons = document.querySelectorAll('.copy-button');
            const button = buttons[buttonIndex];
            button.textContent = 'Copied!';
            button.classList.add('success');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('success');
            }, 2000);
        }).catch(() => {
            const buttons = document.querySelectorAll('.copy-button');
            const button = buttons[buttonIndex];
            button.textContent = 'Failed';
            button.classList.add('error');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('error');
            }, 2000);
        });
    }

    // Server status check with retry logic
    async function checkServerStatus(isInitialCheck = false) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            // Try the API status endpoint first
            const response = await fetch(`http://localhost:${SERVER_PORT}/api/v1/status`, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                }
            });

            clearTimeout(timeoutId);
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
            // Try root URL as fallback
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(`http://localhost:${SERVER_PORT}/`, {
                    method: 'GET',
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (response.ok || response.status === 404) {
                    // Even a 404 means the server is running
                    retryCount = 0;
                    
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
                }
                throw new Error('Server not responding correctly');
            } catch (fallbackError) {
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
    }

    function showTroubleshooting() {
        const troubleshootingSection = document.getElementById('troubleshooting');
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

    // Add animated appearance for steps
    const animateSteps = () => {
        const stepCards = document.querySelectorAll('.step-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        stepCards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    };

    // Initialize animations
    setTimeout(animateSteps, 500);
});