document.addEventListener('DOMContentLoaded', function() {
    // DNA Helix Animation
    const dnaHelix = document.querySelector('.dna-helix');
    const numBases = 15;
    const basePairs = [
        ['A', 'T'],
        ['T', 'A'],
        ['G', 'C'],
        ['C', 'G']
    ];
    
    // Create base pairs
    for (let i = 0; i < numBases; i++) {
        const pairIndex = Math.floor(Math.random() * basePairs.length);
        const [leftBase, rightBase] = basePairs[pairIndex];
        
        const basePair = document.createElement('div');
        basePair.className = 'base-pair';
        basePair.style.top = `${i * 40}px`;
        basePair.style.animationDelay = `${i * 0.3}s`;
        
        const leftBaseElem = document.createElement('div');
        leftBaseElem.className = 'base left-base';
        leftBaseElem.textContent = leftBase;
        leftBaseElem.style.animationDelay = `${i * 0.3}s`;
        
        const rightBaseElem = document.createElement('div');
        rightBaseElem.className = 'base right-base';
        rightBaseElem.textContent = rightBase;
        rightBaseElem.style.animationDelay = `${i * 0.3}s`;
        
        const connector = document.createElement('div');
        connector.className = 'base-connector';
        connector.style.animationDelay = `${i * 0.3}s`;
        
        basePair.appendChild(leftBaseElem);
        basePair.appendChild(connector);
        basePair.appendChild(rightBaseElem);
        dnaHelix.appendChild(basePair);
    }

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > lastScrollTop) {
            // Scrolling down
            scrollIndicator.style.opacity = '0';
        } else if (st === 0) {
            // At top
            scrollIndicator.style.opacity = '1';
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    });

    // Stats Animation
    const statsSection = document.querySelector('#stats');
    let animated = false;

    function parseStatValue(text) {
        text = text.trim();
        if (text.endsWith('%')) {
            return {
                value: parseFloat(text.replace('%', '')),
                suffix: '%',
                decimals: 1
            };
        } else if (text.endsWith('M+')) {
            return {
                value: parseInt(text.replace('M+', '')),
                suffix: 'M+',
                decimals: 0
            };
        } else if (text.endsWith('K+')) {
            return {
                value: parseInt(text.replace('K+', '')),
                suffix: 'K+',
                decimals: 0
            };
        } else if (text.endsWith('/7')) {
            return {
                value: parseInt(text.replace('/7', '')),
                suffix: '/7',
                decimals: 0
            };
        }
        return null;
    }

    function formatValue(value, data) {
        if (data.decimals > 0) {
            return value.toFixed(data.decimals) + data.suffix;
        }
        return Math.round(value) + data.suffix;
    }

    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function animateValue(element, targetData, duration = 2000) {
        const startTime = performance.now();
        const startValue = 0;
        const endValue = targetData.value;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easeOutExpo for smooth animation
            const easedProgress = easeOutExpo(progress);
            let currentValue = startValue + (endValue - startValue) * easedProgress;
            
            // Ensure we hit the exact target value at the end
            if (progress === 1) {
                currentValue = endValue;
            }

            element.textContent = formatValue(currentValue, targetData);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function animateStats() {
        if (animated) return;

        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach((element, index) => {
            // Parse the original value from the HTML
            const originalText = element.textContent;
            const targetData = parseStatValue(originalText);
            
            if (targetData) {
                // Start from 0
                element.textContent = formatValue(0, targetData);
                
                // Animate to target value with staggered delay
                setTimeout(() => {
                    animateValue(element, targetData, 2000);
                }, index * 200); // Increased delay between stats
            }
        });
        
        animated = true;
    }

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    animateStats();
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.floating-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('responsive');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && nav.classList.contains('responsive')) {
            nav.classList.remove('responsive');
        }
    });

    // Dark and Light Mode Detection
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    function detectTheme() {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            applyTheme(storedTheme);
        } else if (prefersDarkScheme) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }

    detectTheme();

    // Theme Toggle Button
    const themeToggleButton = document.querySelector('.theme-toggle-button');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
