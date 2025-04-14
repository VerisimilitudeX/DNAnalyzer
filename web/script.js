/**
 * DNAnalyzer Revamped JavaScript
 * Handles interactivity, animations, and UI enhancements.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components after the DOM is fully loaded
    initNavbarScroll();
    initMobileMenu();
    initStatsCounterAnimation();
    initScrollAnimations();
    initHowItWorksAnimation(); // Specific animation for the steps section

    // Add smooth scrolling for internal links (optional, if needed)
    // initSmoothScroll();
});

/**
 * Adds a subtle background change and shadow to the navbar on scroll.
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const scrollThreshold = 50; // Pixels to scroll before changing navbar style

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true }); // Improve scroll performance
}

/**
 * Toggles the mobile navigation menu visibility.
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNavMenu = document.getElementById('navLinksMobile');
    const icon = mobileToggle?.querySelector('i'); // Use optional chaining

    if (!mobileToggle || !mobileNavMenu || !icon) {
        console.warn("Mobile menu elements not found.");
        return;
    }

    mobileToggle.addEventListener('click', () => {
        mobileNavMenu.classList.toggle('active');

        // Toggle icon class
        if (mobileNavMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileToggle.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a link is clicked (optional)
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });
}


/**
 * Animates number counters when they scroll into view.
 */
function initStatsCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.getAttribute('data-target'));
                const suffix = element.getAttribute('data-suffix') || '';
                animateNumber(element, target, suffix);
                observer.unobserve(element); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * Helper function to animate a number from 0 to target.
 * @param {HTMLElement} element - The element containing the number.
 * @param {number} target - The target number.
 * @param {string} suffix - Text to append after the number (e.g., M+, +).
 * @param {number} duration - Animation duration in milliseconds.
 */
function animateNumber(element, target, suffix = '', duration = 2000) {
    let start = 0;
    let startTime = null;

    // Easing function (easeOutQuad)
    const easeOutQuad = t => t * (2 - t);

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
        const easedProgress = easeOutQuad(progress);

        let currentValue;
        // Handle numbers with decimals (like 95.5%) if needed in the future
        // if (target % 1 !== 0) {
        //     currentValue = (easedProgress * target).toFixed(1);
        // } else {
            currentValue = Math.floor(easedProgress * target);
        // }

        element.textContent = currentValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(animationStep);
        } else {
            // Ensure final value is exact
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(animationStep);
}

/**
 * Adds fade-in animations to elements as they scroll into view.
 * Uses the '.animate-scroll' class on elements to be animated.
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-scroll');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it's fully in view
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animates the progress line in the "How It Works" section.
 */
function initHowItWorksAnimation() {
    const progressLine = document.querySelector('.step-progress-line');
    const stepsContainer = progressLine?.closest('section'); // Find parent section

    if (!progressLine || !stepsContainer) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate target width based on step completion (e.g., 100% for 3 steps)
                // This assumes 3 steps. Adjust if the number of steps changes.
                const targetWidth = '100%'; // Or calculate based on visible steps
                progressLine.style.width = targetWidth;
                observer.unobserve(stepsContainer); // Animate only once when section is visible
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

    observer.observe(stepsContainer);
}


/**
 * Optional: Smooth scrolling for anchor links (e.g., #section-id).
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid internal link and not just "#"
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Adjust offset (20px extra space)

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
