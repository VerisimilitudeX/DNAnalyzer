/**
 * DNAnalyzer Main JavaScript v3
 * Handles animations, interactivity, UI functionality, and enhanced effects.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Core UI Initializations
    initNotificationBanner();
    initNotificationScroll(); // Depends on banner height
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();

    // Content Initializations
    initDNAHelix(); // Initialize DNA Helix animation
    initStatsAnimation(); // Initialize stats counter animation
    initScrollAnimations(); // Initialize general scroll animations

    // Log initialization
    console.log("DNAnalyzer UI v3 Initialized");
});

// --- Shared State ---
let notificationClosed = false;
let notificationHeight = 0;

// --- UI Initializations ---

/**
 * Initializes the notification banner dismiss functionality and stores its height.
 */
function initNotificationBanner() {
    const banner = document.querySelector('.notification-banner');
    if (!banner) return;

    notificationHeight = banner.offsetHeight;
    document.documentElement.style.setProperty('--notification-height', `${notificationHeight}px`);
    console.log(`Notification banner height: ${notificationHeight}px`);

    const closeBtn = banner.querySelector('.notification-close');
    if (!closeBtn) return;

    closeBtn.addEventListener('click', function() {
        banner.classList.add('closed');
        notificationHeight = 0;
        document.documentElement.style.setProperty('--notification-height', '0px');
        notificationClosed = true;
        adjustNavbarPosition(); // Adjust navbar immediately
        console.log("Notification banner closed");
    });
}

/**
 * Adjusts the navbar's top position based on the notification banner's visibility and scroll.
 */
function adjustNavbarPosition() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const banner = document.querySelector('.notification-banner');
    const isHidden = notificationClosed || (banner && banner.classList.contains('hide-notification'));

    // If banner is hidden (closed or scrolled past), navbar top is 0
    if (isHidden || currentScroll > notificationHeight) {
         navbar.style.top = '0px';
    }
    // Otherwise, position navbar below the banner
    else if (banner) { // Check if banner exists
         navbar.style.top = `${notificationHeight}px`;
    }
    // Default fallback
    else {
        navbar.style.top = '0px';
    }
}

/**
 * Initializes notification banner scroll behavior (hide on scroll down, show on scroll up).
 */
function initNotificationScroll() {
    const banner = document.querySelector('.notification-banner');
    if (!banner) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixels to scroll before hiding/showing

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Basic check to prevent execution if banner doesn't exist
        if (!document.body.contains(banner)) return;

        // Ignore minor scroll fluctuations
        if (Math.abs(scrollTop - lastScrollTop) <= 5) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling Down
            if (!banner.classList.contains('hide-notification') && !notificationClosed) {
                banner.classList.add('hide-notification');
                adjustNavbarPosition();
                // console.log("Hiding notification on scroll down");
            }
        } else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
            // Scrolling Up or near top
            if (banner.classList.contains('hide-notification') && !notificationClosed) {
                 banner.classList.remove('hide-notification');
                 adjustNavbarPosition();
                 // console.log("Showing notification on scroll up");
            }
        }

        // Ensure correct navbar position regardless of banner state changes during scroll
        adjustNavbarPosition();

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true }); // Improve scroll performance
}


/**
 * Initializes the mobile menu toggle functionality.
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', function() {
        const isActive = navLinks.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isActive);
        const icon = mobileToggle.querySelector('i');
        icon.className = isActive ? 'fas fa-times' : 'fas fa-bars'; // Toggle icon class
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });
}

/**
 * Initializes the navbar scroll effect (adding 'scrolled' class).
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const scrollThreshold = 30;
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.pageYOffset > scrollThreshold);
    }, { passive: true });
}

/**
 * Initializes smooth scrolling for internal anchor links.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra offset

                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                } catch (error) {
                    console.warn(`Smooth scroll target not found or invalid selector: ${targetId}`, error);
                }
            }
        });
    });
}

// --- Content Initializations ---

/**
 * Initializes the enhanced DNA Helix animation.
 */
function initDNAHelix() {
    const dnaHelixContainer = document.getElementById('dnaHelix');
    if (!dnaHelixContainer) return;

    dnaHelixContainer.innerHTML = ''; // Clear existing

    const basePairsConfig = [
        { pair: ['A', 'T'], leftColor: 'var(--magenta)', rightColor: 'var(--blue)' },
        { pair: ['T', 'A'], leftColor: 'var(--blue)', rightColor: 'var(--magenta)' },
        { pair: ['G', 'C'], leftColor: 'var(--orange)', rightColor: 'var(--success)' },
        { pair: ['C', 'G'], leftColor: 'var(--success)', rightColor: 'var(--orange)' }
    ];

    const numBasePairs = 30; // Increased number of pairs
    const verticalSpacing = 18; // Tighter spacing
    const helixRadius = 60; // Z-axis distance
    const rotationIncrement = 18; // Degrees twist per pair
    const animationDuration = 12; // Slower rotation

    for (let i = 0; i < numBasePairs; i++) {
        const config = basePairsConfig[i % basePairsConfig.length];
        const [leftBaseChar, rightBaseChar] = config.pair;

        const basePairElement = document.createElement('div');
        basePairElement.className = 'base-pair';

        const yPos = (i - numBasePairs / 2) * verticalSpacing;
        basePairElement.style.transform = `translateY(${yPos}px)`;

        const angle = (i * rotationIncrement) % 360;
        const xOffset = Math.sin(angle * Math.PI / 180) * 20; // Sideways curve offset

        basePairElement.style.setProperty('--start-angle', `${angle}deg`);
        basePairElement.style.setProperty('--x-offset', `${xOffset}px`);

        const delay = (i * 0.08) % animationDuration;
        basePairElement.style.animation = `rotate ${animationDuration}s linear infinite ${-delay}s`;

        const leftBase = document.createElement('div');
        leftBase.className = 'base left-base';
        leftBase.textContent = leftBaseChar;
        leftBase.style.background = config.leftColor;
        leftBase.style.animationDelay = `${(i * 0.1)}s`;

        const rightBase = document.createElement('div');
        rightBase.className = 'base right-base';
        rightBase.textContent = rightBaseChar;
        rightBase.style.background = config.rightColor;
        rightBase.style.animationDelay = `${(i * 0.1 + 0.07)}s`;

        const connector = document.createElement('div');
        connector.className = 'base-connector';

        basePairElement.appendChild(leftBase);
        basePairElement.appendChild(rightBase);
        basePairElement.appendChild(connector);
        dnaHelixContainer.appendChild(basePairElement);
    }
    // Adjust container height if needed (optional, depends on CSS)
    // dnaHelixContainer.parentElement.style.height = `${numBasePairs * verticalSpacing + 100}px`;
}

/**
 * Animates number counting from 0 to target with easing.
 */
function animateNumber(element, targetString, suffix = '', duration = 2000) {
    if (!element) return;
    const target = parseFloat(targetString.replace(/[^0-9.]/g, ''));
    if (isNaN(target)) { element.textContent = targetString + suffix; return; }

    let start = 0;
    let startTime = null;
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        let currentValue = Math.floor(easedProgress * target);
        let displaySuffix = suffix;

        if (targetString.includes('M+')) {
            currentValue = (easedProgress * target).toFixed(1);
            displaySuffix = 'M+';
            if (progress === 1) currentValue = target.toFixed(0); // Ensure final is integer
        } else if (targetString.includes('+') && suffix === '') {
            displaySuffix = '+';
        }

        element.textContent = `${currentValue}${displaySuffix}`;
        if (progress < 1) { requestAnimationFrame(animationStep); }
        else { element.textContent = targetString.replace(/([0-9.]+)/, target.toFixed(targetString.includes('M+') ? 0 : 0)) + displaySuffix; } // Ensure final exact value
    }
    requestAnimationFrame(animationStep);
}

/**
 * Initializes the stats counter animation with Intersection Observer.
 */
function initStatsAnimation() {
    // Re-select stats from the hero section if they exist there now
    const statsContainer = document.querySelector('.hero-stats'); // Or wherever stats are now
    if (!statsContainer) {
         console.warn("Stats container not found for animation.");
         return; // Exit if no stats container
    }

    // Example: If stats are now simple spans in hero-stats
    // This part needs adjustment based on the final HTML structure of the stats
    const statElements = [
        // These IDs might not exist anymore, adjust selectors as needed
        // { elem: document.getElementById('statAccuracy'), target: '141', suffix: '' },
        // { elem: document.getElementById('statSequences'), target: '7M+', suffix: '' },
        // { elem: document.getElementById('statUsers'), target: '46+', suffix: '' }
    ];

    // If stats are integrated differently (e.g., within .hero-stats spans),
    // you'll need to select those spans and potentially add data attributes
    // for the target values. For now, this function might be obsolete
    // if the stats section was removed or significantly changed.

    // Placeholder: Log that stats animation setup is skipped if elements aren't found
    if (statElements.every(stat => !stat.elem)) {
        console.log("Stats elements not found for number animation (likely integrated differently now).");
        return;
    }

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                console.log("Stats section intersecting, animating numbers.");
                statElements.forEach((stat, index) => {
                    if (stat.elem) {
                        setTimeout(() => {
                            animateNumber(stat.elem, stat.target, stat.suffix, 2000 + index * 100);
                        }, index * 200);
                    }
                });
                animated = true;
                observer.unobserve(entry.target.closest('.stats-section') || entry.target); // Observe the container
            }
        });
    }, { threshold: 0.3 });

    // Observe the container holding the stats
    const containerToObserve = statElements[0]?.elem?.closest('.stats-section') || statsContainer;
     if (containerToObserve) {
         observer.observe(containerToObserve);
     }
}


/**
 * Initializes Intersection Observer for general scroll-triggered animations.
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-up, .scroll-animate-scale, .scroll-animate-fade');
    if (!animatedElements.length) return;

    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
    console.log(`Observing ${animatedElements.length} elements for scroll animations.`);
}
