/**
 * DNAnalyzer Main JavaScript
 * Handles animations, interactivity and UI functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components after the DOM is fully loaded
    initNotificationBanner(); // Must run first to set initial offsets
    initDNAHelix();
    initMobileMenu();
    initNavbarScroll();
    initStatsAnimation();
    initSmoothScroll(); // Initialize smooth scrolling for anchor links
    initScrollAnimations(); // Initialize general scroll-triggered animations
    initNavbarPulse(); // Add subtle pulse effect to navbar
});

// --- Component Initializations ---

/**
 * Initialize the notification banner:
 * - Sets initial CSS variable for height offset.
 * - Handles the close button click.
 * - Manages scroll behavior (hiding/showing).
 */
function initNotificationBanner() {
    const banner = document.querySelector('.notification-banner');
    const navbar = document.getElementById('navbar');
    const body = document.body;
    if (!banner || !navbar || !body) return; // Ensure all elements exist

    const closeBtn = banner.querySelector('.notification-close');
    let notificationClosedManually = false; // Track if closed by user click

    // Function to update layout based on banner visibility
    const updateLayout = () => {
        // Ensure banner exists and is visible before getting height
        if (!banner || banner.offsetParent === null) {
             document.documentElement.style.setProperty('--notification-height', `0px`);
             if(navbar) navbar.style.top = `0px`;
             if(body) body.style.paddingTop = `0px`;
             return;
        }

        const bannerHeight = banner.offsetHeight;
        const isBannerVisible = !banner.classList.contains('closed') && !banner.classList.contains('hide-notification');

        if (isBannerVisible) {
            document.documentElement.style.setProperty('--notification-height', `${bannerHeight}px`);
            if(navbar) navbar.style.top = `${bannerHeight}px`;
            if(body) body.style.paddingTop = `${bannerHeight}px`;
        } else {
            document.documentElement.style.setProperty('--notification-height', '0px');
            if(navbar) navbar.style.top = '0px';
            if(body) body.style.paddingTop = '0px';
        }
    };

    // Initial layout calculation
    // Use setTimeout to ensure accurate height measurement after styles apply
    setTimeout(updateLayout, 0);


    // Handle close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            banner.classList.add('closed'); // Mark as closed
            notificationClosedManually = true; // User closed it
            updateLayout(); // Update layout immediately
        });
    }

    // Handle scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         // Ensure banner exists before proceeding
        if (!banner || banner.offsetParent === null) return;

        const bannerHeight = banner.offsetHeight; // Recalculate height in case it changes

        // Don't hide/show if manually closed
        if (notificationClosedManually) {
             if(navbar) navbar.style.top = '0px'; // Ensure navbar stays at top if banner closed
             if(body) body.style.paddingTop = '0px';
             return;
        }

        // Hide on scroll down past banner height, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > bannerHeight) {
            // Scrolling down
            banner.classList.add('hide-notification');
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
             banner.classList.remove('hide-notification');
        }

        updateLayout(); // Update layout based on scroll changes

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true }); // Use passive listener for performance

     // Update layout on resize as well
     window.addEventListener('resize', updateLayout);
}


/**
 * Initialize the DNA Helix animation on the homepage
 */
function initDNAHelix() {
    const dnaHelixContainer = document.getElementById('dnaHelix');
    if (!dnaHelixContainer) return; // Exit if container not found

    // Clear any existing content (e.g., if re-initializing)
    dnaHelixContainer.innerHTML = '';

    // Configuration for the helix
    const numBasePairs = 20; // Total number of base pairs to generate
    const verticalSpacing = 20; // Pixels between each base pair vertically
    const rotationPerPair = 18; // Degrees of Y-rotation per base pair to create the twist
    const horizontalAmplitude = 20; // Max horizontal displacement for the curve
    const animationDuration = 8; // Seconds for one full rotation
    const basePairTypes = [
        ['A', 'T'], ['T', 'A'], ['G', 'C'], ['C', 'G']
    ];

    // Create and append each base pair
    for (let i = 0; i < numBasePairs; i++) {
        const pairIndex = Math.floor(Math.random() * basePairTypes.length);
        const [leftBaseChar, rightBaseChar] = basePairTypes[pairIndex];

        // Create the main div for the base pair
        const basePairElement = document.createElement('div');
        basePairElement.className = 'base-pair';

        // --- Positioning and Initial Transform ---
        // Calculate vertical position
        const topPosition = i * verticalSpacing;
        basePairElement.style.top = `${topPosition}px`;

        // Calculate initial rotation angle for the helix twist
        const initialAngle = (i * rotationPerPair) % 360;

        // Calculate initial horizontal offset for the curve effect using sine wave
        const initialXOffset = Math.sin(initialAngle * Math.PI / 180) * horizontalAmplitude;

        // Apply the initial 3D transform (rotation, depth, horizontal offset)
        basePairElement.style.transform = `rotateY(${initialAngle}deg) translateZ(40px) translateX(${initialXOffset}px)`;

        // --- Animation ---
        // Apply the rotation animation with a staggered delay for a wave effect
        // Negative delay makes the animation appear to start partway through its cycle
        const animationDelay = (i * -animationDuration / numBasePairs).toFixed(2);
        basePairElement.style.animation = `rotate ${animationDuration}s linear infinite`;
        basePairElement.style.animationDelay = `${animationDelay}s`;

        // --- Create Bases and Connector ---
        const leftBaseElem = document.createElement('div');
        leftBaseElem.className = 'base left-base';
        leftBaseElem.textContent = leftBaseChar;
        // Stagger pulse animation delay for bases
        leftBaseElem.style.animationDelay = `${(i * 0.1).toFixed(2)}s`;

        const rightBaseElem = document.createElement('div');
        rightBaseElem.className = 'base right-base';
        rightBaseElem.textContent = rightBaseChar;
        // Stagger pulse animation delay (offset from left base)
        rightBaseElem.style.animationDelay = `${(i * 0.1 + 0.5).toFixed(2)}s`; // 0.5s offset

        const connector = document.createElement('div');
        connector.className = 'base-connector';

        // Append bases and connector to the base pair element
        basePairElement.appendChild(leftBaseElem);
        basePairElement.appendChild(connector);
        basePairElement.appendChild(rightBaseElem);

        // Append the complete base pair to the main helix container
        dnaHelixContainer.appendChild(basePairElement);
    }

    // Optional: Adjust container height dynamically if needed, though fixed height in CSS is often better
    // dnaHelixContainer.style.height = `${numBasePairs * verticalSpacing + 50}px`; // +50 for buffer
}


/**
 * Initialize the mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!mobileToggle || !navLinks) return; // Exit if elements not found

    mobileToggle.addEventListener('click', function() {
        const isActive = navLinks.classList.toggle('active'); // Toggle the 'active' class

        // Change the icon based on the menu state (bars or times)
        const icon = mobileToggle.querySelector('i');
        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileToggle.setAttribute('aria-expanded', 'true'); // ARIA for accessibility
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileToggle.setAttribute('aria-expanded', 'false'); // ARIA for accessibility
        }
    });

    // Close the mobile menu when a link inside it is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Only close if the link is navigating within the page (hash link)
            // or if it's navigating away (check this condition if needed)
            if (navLinks.classList.contains('active')) {
                 // Check if the link is a hash link for the current page
                if (link.pathname === window.location.pathname && link.hash) {
                     navLinks.classList.remove('active');
                     const icon = mobileToggle.querySelector('i');
                     icon.classList.remove('fa-times');
                     icon.classList.add('fa-bars');
                     mobileToggle.setAttribute('aria-expanded', 'false');
                } else if (link.pathname !== window.location.pathname) {
                    // If navigating to a different page, still close the menu
                     navLinks.classList.remove('active');
                     const icon = mobileToggle.querySelector('i');
                     icon.classList.remove('fa-times');
                     icon.classList.add('fa-bars');
                     mobileToggle.setAttribute('aria-expanded', 'false');
                }
                // If it's just a link without hash or different pathname,
                // default browser navigation will happen, menu state might persist briefly.
            }
        });
    });
}

/**
 * Initialize the navbar scroll effect (changing background/padding)
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return; // Exit if navbar not found

    const scrollThreshold = 50; // Pixels to scroll before effect triggers

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true }); // Use passive listener for performance
}

/**
 * Animate number counting from 0 to target value.
 * @param {HTMLElement} element - The DOM element displaying the number.
 * @param {string} targetStr - The target value (as a string, e.g., "141", "7M+").
 * @param {number} duration - Animation duration in milliseconds.
 */
function animateNumber(element, targetStr, duration = 2000) {
    if (!element) return;

    const targetNum = parseFloat(targetStr); // Get the numerical part
    const suffix = targetStr.replace(/[0-9.,]/g, ''); // Extract suffix like M, +, %

    if (isNaN(targetNum)) { // Handle cases where target is not a number (e.g., just "M+")
        element.textContent = targetStr;
        return;
    }

    let start = 0;
    let startTime = null;

    // Easing function (easeOutQuart)
    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
        const easedProgress = easeOutQuart(progress);

        let currentValue = Math.floor(easedProgress * targetNum);

        // Format the number (e.g., add commas if needed, handle decimals)
        // For simplicity, we'll just use floor here. Add formatting if required.
        element.textContent = `${currentValue}${suffix}`; // Combine number and suffix

        if (progress < 1) {
            requestAnimationFrame(animationStep); // Continue animation
        } else {
            // Ensure final value is exact, handling potential floating point inaccuracies
            const finalTargetNum = parseFloat(targetStr); // Re-parse to be sure
             if (!isNaN(finalTargetNum)) {
                 element.textContent = `${finalTargetNum}${suffix}`;
             } else {
                 element.textContent = targetStr; // Fallback if parsing fails again
             }
        }
    }

    requestAnimationFrame(animationStep); // Start the animation
}


/**
 * Initialize the stats counter animation using Intersection Observer.
 * Animates numbers when the stats section becomes visible.
 */
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return; // Exit if section not found

    // Define the stats elements and their target values
    const statElements = [
        { elem: document.getElementById('statAccuracy'), target: '141' },
        { elem: document.getElementById('statSequences'), target: '7M+' },
        { elem: document.getElementById('statUsers'), target: '46+' },
        // Add the Discord Members stat if its element exists
        { elem: statsSection.querySelector('.stat-item:nth-child(4) .stat-number'), target: '86' }
    ];

    let animated = false; // Flag to ensure animation runs only once

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the section is intersecting and not yet animated
            if (entry.isIntersecting && !animated) {
                // Animate each stat element
                statElements.forEach((stat, index) => {
                    if (stat.elem && stat.target) { // Check if element and target exist
                        // Use setTimeout for a staggered start effect
                        setTimeout(() => {
                            animateNumber(stat.elem, stat.target, 2000); // 2-second duration
                        }, index * 200); // 200ms delay between each stat
                    }
                });

                animated = true; // Mark as animated
                observer.unobserve(statsSection); // Stop observing once animated
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

    observer.observe(statsSection); // Start observing the stats section
}


/**
 * Add smooth scrolling behavior for anchor links (href="#...")
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (targetId.length > 1 && targetId.startsWith('#')) {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault(); // Prevent default jump

                        // Calculate offset (consider fixed navbar height)
                        const navbar = document.getElementById('navbar');
                        // Check if navbar exists and is visible before getting height
                        const navbarHeight = (navbar && navbar.offsetParent !== null) ? navbar.offsetHeight : 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px buffer

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth' // Enable smooth scrolling
                        });
                    }
                } catch (error) {
                    console.warn(`Smooth scroll target not found or invalid selector: ${targetId}`);
                }
            }
        });
    });
}


/**
 * Initialize scroll-triggered animations for elements with 'scroll-animate' class.
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    if (!elementsToAnimate.length) return; // Exit if no elements found

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fully enters viewport bottom
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in'); // Add class to trigger animation
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        elementsToAnimate.forEach(element => {
            observer.observe(element); // Observe each element
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Simply make elements visible immediately
        elementsToAnimate.forEach(element => {
            element.classList.add('animate-in');
        });
        console.warn("IntersectionObserver not supported, scroll animations applied directly.");
    }
}


/**
 * Add a subtle pulse effect to the navbar for a futuristic look.
 */
function initNavbarPulse() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Toggle a class periodically to trigger the pulse animation defined in CSS
    setInterval(() => {
        navbar.classList.toggle('navbar-pulse');
    }, 3000); // Pulse every 3 seconds
}
