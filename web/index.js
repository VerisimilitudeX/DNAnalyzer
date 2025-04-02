/**
 * DNAnalyzer Main JavaScript
 * Handles animations, interactivity and UI functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize DNA Helix animation
    initDNAHelix();

    // Initialize mobile menu toggle
    initMobileMenu();

    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize stats counter animation
    initStatsAnimation();

    // Initialize notification banner dismiss functionality
    initNotificationBanner();

    // Initialize notification banner scroll behavior
    initNotificationScroll();

    // Initialize navbar pulse effect
    initNavbarPulse();

    // Initialize futuristic notification effects
    initFuturisticNotificationEffects();

    // Initialize scroll animations for sections
    initScrollAnimations();
});

// Shared state for notification banner
let notificationClosed = false;

/**
 * Initialize the notification banner dismiss functionality and adjust navbar positioning
 */
function initNotificationBanner() {
    const banner = document.querySelector('.notification-banner');
    const navbar = document.getElementById('navbar');
    if (!banner || !navbar) return;

    // Use ResizeObserver to handle dynamic banner height changes (e.g., text wrap)
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const bannerHeight = entry.target.offsetHeight;
            document.documentElement.style.setProperty('--notification-height', `${bannerHeight}px`);
            // Adjust navbar top only if notification isn't closed and banner is visible
            if (!notificationClosed && !banner.classList.contains('hide-notification')) {
                 navbar.style.top = `${bannerHeight}px`;
            }
        }
    });

    resizeObserver.observe(banner);


    const closeBtn = document.querySelector('.notification-banner .notification-close');
    if (!closeBtn) return;

    closeBtn.addEventListener('click', function() {
        banner.classList.add('closed'); // Hide banner immediately
        document.documentElement.style.setProperty('--notification-height', '0px');
        navbar.style.top = '0'; // Move navbar to top
        notificationClosed = true;
        resizeObserver.unobserve(banner); // Stop observing banner size changes
    });

    // Set initial navbar position based on initial banner height
    const initialBannerHeight = banner.offsetHeight;
    document.documentElement.style.setProperty('--notification-height', `${initialBannerHeight}px`);
    navbar.style.top = `${initialBannerHeight}px`;
}

/**
 * Initialize notification banner scroll behavior
 */
function initNotificationScroll() {
    const banner = document.querySelector('.notification-banner');
    const navbar = document.getElementById('navbar');
    if (!banner || !navbar) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const bannerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--notification-height')) || 0;

        if (scrollTop > lastScrollTop && scrollTop > bannerHeight) {
            // Scrolling down past banner height
             if (!notificationClosed) { // Only hide if not manually closed
                 banner.classList.add('hide-notification');
             }
             navbar.style.top = '0'; // Move navbar up regardless
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
            if (!notificationClosed) { // Only show if not manually closed
                banner.classList.remove('hide-notification');
                navbar.style.top = `${bannerHeight}px`; // Move navbar down
            } else {
                 navbar.style.top = '0'; // Keep navbar at top if banner closed
            }
        } else if (scrollTop <= bannerHeight && !notificationClosed) {
             // Near the top, ensure banner is visible and navbar positioned correctly
             banner.classList.remove('hide-notification');
             navbar.style.top = `${bannerHeight}px`;
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true }); // Improve scroll performance
}


/**
 * Initialize the DNA Helix animation on the homepage
 */
function initDNAHelix() {
    const dnaHelix = document.getElementById('dnaHelix');
    if (!dnaHelix) return;

    // Clear any existing content
    dnaHelix.innerHTML = '';

    const numBasesUp = 15; // Number of bases to extend upward
    const numBasesDown = 25; // Number of bases to extend downward
    const totalBases = numBasesUp + numBasesDown;
    const basePairs = [
        ['A', 'T'],
        ['T', 'A'],
        ['G', 'C'],
        ['C', 'G']
    ];

    // Create base pairs with a proper twisted helix structure
    // Start with negative indices for "upward" extension, then go to positive for "downward"
    for (let i = -numBasesUp; i < numBasesDown; i++) {
        const pairIndex = Math.floor(Math.random() * basePairs.length);
        const [leftBase, rightBase] = basePairs[pairIndex];

        const basePair = document.createElement('div');
        basePair.className = 'base-pair';

        // Position each base pair - adjust vertical position to account for bases extending upward
        basePair.style.top = `${(i + numBasesUp) * 25}px`;

        // Calculate initial rotation angle to create the helix twist
        // Each pair is rotated 25 degrees more than the previous one
        const angle = (i * 25) % 360;

        // --- FIX: Reduced the multiplier from 20 to 15 to decrease horizontal spread ---
        // Calculate X offset based on the angle to create the curve effect
        const xOffset = Math.sin(angle * Math.PI / 180) * 15; // Reduced from 20

        // Apply the 3D transformation to create the initial twisted shape
        // The CSS animation will handle the rotation, JS sets the initial position/shape
        basePair.style.transform = `translateX(${xOffset}px)`; // Only set translateX here

        // Add animation with staggered delays
        // The 'rotate' animation now only handles rotateY and translateZ (see CSS)
        basePair.style.animation = 'rotate 8s linear infinite';
        basePair.style.animationDelay = `${-i * 0.2}s`; // Stagger animation start

        const leftBaseElem = document.createElement('div');
        leftBaseElem.className = 'base left-base';
        leftBaseElem.textContent = leftBase;
        // Stagger pulse animation for bases
        leftBaseElem.style.animationDelay = `${i * 0.15}s`;

        const rightBaseElem = document.createElement('div');
        rightBaseElem.className = 'base right-base';
        rightBaseElem.textContent = rightBase;
         // Stagger pulse animation for bases
        rightBaseElem.style.animationDelay = `${i * 0.15 + 0.1}s`; // Slightly offset right base pulse

        const connector = document.createElement('div');
        connector.className = 'base-connector';

        basePair.appendChild(leftBaseElem);
        basePair.appendChild(connector);
        basePair.appendChild(rightBaseElem);

        dnaHelix.appendChild(basePair);
    }

    // Adjust the container height to accommodate the extended helix
    dnaHelix.style.height = `${totalBases * 25 + 50}px`; // Add some padding
}


/**
 * Initialize the mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', function() {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');

        // Change the icon based on the state
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close the mobile menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

     // Close menu if clicking outside the navbar when it's open
     document.addEventListener('click', function(event) {
        const isClickInsideNav = mobileToggle.contains(event.target) || navLinks.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
             mobileToggle.click(); // Simulate a click on the toggle button to close
        }
     });
}

/**
 * Initialize the navbar scroll effect
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        // Add scrolled class if scrolled more than 10px, otherwise remove
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Animate number counting from 0 to target
 * @param {HTMLElement} element - The element containing the number
 * @param {string} targetStr - The target number as a string (e.g., "141", "7M+", "46+")
 * @param {number} duration - Animation duration in milliseconds
 */
function animateNumber(element, targetStr, duration = 2000) {
    if (!element) return;

    const match = targetStr.match(/([\d.]+)([M+]?)/); // Extract number and suffix
    if (!match) {
        element.textContent = targetStr; // Fallback if no number found
        return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || '';
    let start = 0;
    let startTime = null;

    function easeOutQuart(t) {
        return 1 - (--t * t * t * t);
    }

    function formatNumber(num) {
        // Simple formatting for millions, adjust if needed for K, etc.
        if (suffix === 'M+' && targetNum >= 1) {
             // Show decimal place during animation for smoother transition for millions
             return (num).toFixed(1) + suffix;
        }
        return Math.floor(num) + suffix; // Default: integer + suffix
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
        const easedProgress = easeOutQuart(progress);

        let currentValue = easedProgress * targetNum;

        element.textContent = formatNumber(currentValue);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Ensure final value is exactly the target string
            element.textContent = targetStr;
        }
    }

    requestAnimationFrame(animate);
}


/**
 * Initialize the stats counter animation with Intersection Observer
 */
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statElements = [ // Use array for easier iteration
        { elem: document.getElementById('statAccuracy'), target: '141' },
        { elem: document.getElementById('statSequences'), target: '7M+' },
        { elem: document.getElementById('statUsers'), target: '46+' },
        // Assuming the 4th stat item also needs animation
        { elem: statsSection.querySelector('.stats-grid .stat-item:nth-child(4) .stat-number'), target: '86'}
    ];

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Start animation when the section is at least 50% visible
            if (entry.isIntersecting && !animated) {
                // Animate each stat with staggered delays
                statElements.forEach((stat, index) => {
                    if (stat.elem && stat.target) { // Check if element and target exist
                         setTimeout(() => {
                            animateNumber(stat.elem, stat.target, 2000 + index * 100); // Slightly increase duration for later items
                         }, index * 200); // Stagger start time
                    }
                });

                animated = true; // Ensure animation runs only once
                observer.unobserve(statsSection); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    observer.observe(statsSection);
}


/**
 * Add smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        // Ensure it's a valid internal link and not just "#"
        if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault(); // Prevent default jump

                // Calculate offset considering the fixed navbar height
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const bannerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--notification-height')) || 0;
                const offsetTop = targetElement.offsetTop - navbarHeight - bannerHeight - 20; // Add extra 20px padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/**
 * Initialize navbar pulse effect for futuristic look
 */
function initNavbarPulse() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    // Add a subtle pulse animation class via CSS instead of toggling
    // Ensure .navbar-pulse class is defined in CSS
    // Example: .navbar.navbar-pulse { animation: pulseBorder 3s infinite alternate; }
    // @keyframes pulseBorder { 0% { border-color: rgba(255,255,255,0.1); } 100% { border-color: rgba(var(--blue-rgb), 0.5); } }
    // This approach is generally better for performance than JS interval toggling.
    // If you prefer JS toggling:
    /*
    setInterval(() => {
        navbar.classList.toggle('navbar-pulse-active'); // Use a dedicated class
    }, 2000);
    */
}

/**
 * Initialize futuristic notification effects on the notification banner
 */
function initFuturisticNotificationEffects() {
    const banner = document.querySelector('.notification-banner');
    if (!banner) return;
    // Effects are handled by CSS (:hover, animation: notifPulse)
    // JS function kept for structure, but no JS logic needed here for the effect itself.
}

/**
 * Add intersection observer for animating sections as they come into view
 */
function initScrollAnimations() {
    // Select all elements intended for scroll animation
    const elementsToAnimate = document.querySelectorAll('.section, .feature-card, .card, .step-item, .stat-item');

    if (!elementsToAnimate.length) return; // Exit if no elements found

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fully enters viewport
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in'); // Add class to trigger animation
                observerInstance.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        // Add base animation class (e.g., 'scroll-animate')
        // You might want different base classes for different animation types
        // Example: Add 'scroll-animate-fade-up' by default
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}
