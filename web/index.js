/**
 * DNAnalyzer Main JavaScript
 * Handles animations, interactivity and UI functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initNotificationBanner();
    initNotificationScroll(); // Must run after banner init to get height
    initDNAHelix();
    initMobileMenu();
    initNavbarScroll();
    initStatsAnimation();
    initSmoothScroll();
    initScrollAnimations(); // Initialize general scroll animations

    // Log initialization
    console.log("DNAnalyzer UI Initialized");
});

// Shared state for notification banner
let notificationClosed = false;
let notificationHeight = 0; // Store banner height globally

/**
 * Initialize the notification banner dismiss functionality and store its height
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
        banner.classList.add('closed'); // Hide immediately for visual feedback
        notificationHeight = 0; // Set height to 0
        document.documentElement.style.setProperty('--notification-height', '0px');
        notificationClosed = true;
        adjustNavbarPosition(); // Adjust navbar immediately
        console.log("Notification banner closed");
    });
}

/**
 * Adjusts the navbar's top position based on the notification banner's visibility.
 */
function adjustNavbarPosition() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const banner = document.querySelector('.notification-banner');

    // If banner is closed or hidden by scroll, navbar top is 0
    if (notificationClosed || (banner && banner.classList.contains('hide-notification')) || currentScroll > notificationHeight) {
         navbar.style.top = '0px';
    }
    // Otherwise, position navbar below the banner
    else if (!notificationClosed && banner && !banner.classList.contains('hide-notification')) {
         navbar.style.top = `${notificationHeight}px`;
    }
     // Default case if something goes wrong
    else {
        navbar.style.top = '0px';
    }
}


/**
 * Initialize notification banner scroll behavior (hide on scroll down, show on scroll up)
 */
function initNotificationScroll() {
    const banner = document.querySelector('.notification-banner');
    if (!banner) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixels to scroll before hiding/showing

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Ignore minor scroll fluctuations
        if (Math.abs(scrollTop - lastScrollTop) <= 5) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling Down
            if (!banner.classList.contains('hide-notification') && !notificationClosed) {
                banner.classList.add('hide-notification');
                adjustNavbarPosition(); // Adjust navbar when banner hides
                 console.log("Hiding notification on scroll down");
            }
        } else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
            // Scrolling Up or near top
            if (banner.classList.contains('hide-notification') && !notificationClosed) {
                 banner.classList.remove('hide-notification');
                 adjustNavbarPosition(); // Adjust navbar when banner shows
                 console.log("Showing notification on scroll up");
            }
        }

        // Ensure correct navbar position even if banner wasn't hidden/shown
         if (scrollTop <= scrollThreshold && !notificationClosed) {
              banner.classList.remove('hide-notification');
              adjustNavbarPosition();
         } else if (scrollTop > scrollThreshold && !notificationClosed && banner.classList.contains('hide-notification')) {
              adjustNavbarPosition(); // Keep navbar at top if banner is hidden
         } else if (notificationClosed) {
              adjustNavbarPosition(); // Keep navbar at top if banner is closed
         }


        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true }); // Improve scroll performance
}

/**
 * Initialize the DNA Helix animation on the homepage
 */
function initDNAHelix() {
    const dnaHelixContainer = document.getElementById('dnaHelix');
    if (!dnaHelixContainer) return;

    dnaHelixContainer.innerHTML = ''; // Clear existing

    const basePairsConfig = [
        { pair: ['A', 'T'], leftColor: 'var(--magenta)', rightColor: 'var(--blue)' },
        { pair: ['T', 'A'], leftColor: 'var(--blue)', rightColor: 'var(--magenta)' },
        { pair: ['G', 'C'], leftColor: 'var(--orange)', rightColor: '#34c759' }, // Added green
        { pair: ['C', 'G'], leftColor: '#34c759', rightColor: 'var(--orange)' }
    ];

    const numBasePairs = 25; // Total number of pairs
    const verticalSpacing = 20; // Space between pairs
    const helixRadius = 50; // How far out the bases extend (Z-axis)
    const rotationIncrement = 20; // Degrees twist per base pair
    const animationDuration = 10; // seconds for full rotation

    for (let i = 0; i < numBasePairs; i++) {
        const config = basePairsConfig[i % basePairsConfig.length]; // Cycle through colors/pairs
        const [leftBaseChar, rightBaseChar] = config.pair;

        const basePairElement = document.createElement('div');
        basePairElement.className = 'base-pair';

        // Vertical position
        const yPos = (i - numBasePairs / 2) * verticalSpacing; // Center the helix vertically
        basePairElement.style.transform = `translateY(${yPos}px)`; // Initial Y position

        // Calculate initial rotation angle and offsets for the helix shape
        const angle = (i * rotationIncrement) % 360;
        const xOffset = Math.sin(angle * Math.PI / 180) * 15; // Sideways curve

        // Store initial transform values in CSS variables for the animation
        basePairElement.style.setProperty('--start-angle', `${angle}deg`);
        basePairElement.style.setProperty('--x-offset', `${xOffset}px`);

        // Apply animation
        const delay = (i * 0.1) % animationDuration; // Staggered animation start
        basePairElement.style.animation = `rotate ${animationDuration}s linear infinite ${-delay}s`;

        // Create Left Base
        const leftBase = document.createElement('div');
        leftBase.className = 'base left-base';
        leftBase.textContent = leftBaseChar;
        leftBase.style.background = config.leftColor;
        leftBase.style.animationDelay = `${(i * 0.15)}s`; // Stagger pulse

        // Create Right Base
        const rightBase = document.createElement('div');
        rightBase.className = 'base right-base';
        rightBase.textContent = rightBaseChar;
        rightBase.style.background = config.rightColor;
        rightBase.style.animationDelay = `${(i * 0.15 + 0.1)}s`; // Stagger pulse slightly more

        // Create Connector
        const connector = document.createElement('div');
        connector.className = 'base-connector';
        // Optional: Style connector dynamically if needed

        // Append elements
        basePairElement.appendChild(leftBase);
        basePairElement.appendChild(rightBase);
        basePairElement.appendChild(connector); // Connector should be behind bases visually if needed
        dnaHelixContainer.appendChild(basePairElement);
    }

     // Adjust container height if needed (optional)
     // dnaHelixContainer.style.height = `${numBasePairs * verticalSpacing + 100}px`;
}


/**
 * Initialize the mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', function() {
        const isActive = navLinks.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isActive);

        const icon = mobileToggle.querySelector('i');
        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/**
 * Initialize the navbar scroll effect (adding 'scrolled' class)
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const scrollThreshold = 30; // Pixels scrolled before adding class

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Animate number counting from 0 to target with easing
 */
function animateNumber(element, targetString, suffix = '', duration = 2000) {
    if (!element) return;

    const target = parseFloat(targetString.replace(/[^0-9.]/g, '')); // Extract number
    if (isNaN(target)) {
        element.textContent = targetString + suffix; // Fallback for non-numeric targets
        return;
    }

    let start = 0;
    let startTime = null;

    // Easing function (easeOutExpo)
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);

        let currentValue = Math.floor(easedProgress * target);

        // Handle M+ and + suffixes correctly
        let displaySuffix = suffix;
         if (targetString.includes('M+')) {
             currentValue = (easedProgress * target).toFixed(1); // Show decimal during animation
             displaySuffix = 'M+';
              if (progress === 1) currentValue = target; // Ensure final value is integer if needed
         } else if (targetString.includes('+') && suffix === '') { // Check if suffix wasn't passed but '+' exists
             displaySuffix = '+';
         }

         // Prevent displaying 0M+ or 0+ initially
         if (elapsed < 50 && currentValue === 0 && displaySuffix) {
             element.textContent = 0;
         } else {
             element.textContent = `${currentValue}${displaySuffix}`;
         }


        if (progress < 1) {
            requestAnimationFrame(animationStep);
        } else {
            // Ensure final display is exactly the target string
            element.textContent = targetString.replace(/([0-9.]+)/, target) + displaySuffix;

        }
    }

    requestAnimationFrame(animationStep);
}


/**
 * Initialize the stats counter animation with Intersection Observer
 */
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statElements = [ // Use array for easier iteration
        { elem: document.getElementById('statAccuracy'), target: '141', suffix: '' },
        { elem: document.getElementById('statSequences'), target: '7M+', suffix: '' }, // Suffix handled in animateNumber
        { elem: document.getElementById('statUsers'), target: '46+', suffix: '' }    // Suffix handled in animateNumber
    ];

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                console.log("Stats section intersecting, animating numbers.");
                statElements.forEach((stat, index) => {
                    setTimeout(() => {
                        if (stat.elem) {
                            // Pass target string directly, animateNumber handles extraction
                            animateNumber(stat.elem, stat.target, stat.suffix, 2000 + index * 100);
                        }
                    }, index * 200); // Stagger animation start
                });

                animated = true;
                observer.unobserve(statsSection); // Stop observing once animated
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% visible

    observer.observe(statsSection);
}

/**
 * Add smooth scrolling for anchor links within the page
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid internal link and not just "#"
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70; // Get current navbar height or default
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                } catch (error) {
                     console.warn(`Smooth scroll target not found or invalid selector: ${targetId}`, error);
                 }
            }
        });
    });
}

/**
 * Initialize Intersection Observer for general scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');

    if (!animatedElements.length) return;

    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fully enters viewport bottom
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    console.log(`Observing ${animatedElements.length} elements for scroll animations.`);
}