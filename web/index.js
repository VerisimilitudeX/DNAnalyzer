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

    const bannerHeight = banner.offsetHeight;
    document.documentElement.style.setProperty('--notification-height', `${bannerHeight}px`);

    const closeBtn = document.querySelector('.notification-banner .notification-close');
    if (!closeBtn) return;

    closeBtn.addEventListener('click', function() {
        banner.classList.add('closed');
        document.documentElement.style.setProperty('--notification-height', '0px');
        navbar.style.top = '0';
        notificationClosed = true;
    });

    // Initial positioning
    navbar.style.top = `${bannerHeight}px`;
}

/**
 * Initialize notification banner scroll behavior
 */
function initNotificationScroll() {
    const banner = document.querySelector('.notification-banner');
    const navbar = document.getElementById('navbar');
    if (!banner || !navbar) return;

    let lastScrollTop = 0;
    const bannerHeight = banner.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > bannerHeight) {
            // Scrolling down
            banner.classList.add('hide-notification');
            navbar.style.top = '0';
        } else if (!notificationClosed) {
            // Scrolling up and notification was not manually closed
            banner.classList.remove('hide-notification');
            navbar.style.top = `${bannerHeight}px`;
        } else {
            // Scrolling up but notification was manually closed
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });
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
    
    // Create all base pair elements first but don't append to DOM yet
    const fragments = document.createDocumentFragment();
    const allBasePairs = [];
    
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
        // Each pair is rotated an incremental amount for the helix effect
        const angle = (i * 25) % 360;
        
        // Calculate X offset based on the angle to create the curve effect
        const xOffset = Math.sin(angle * Math.PI / 180) * 20;
        
        // Start at the target position directly instead of animating to it
        basePair.style.transform = `rotateY(${angle}deg) translateZ(40px) translateX(${xOffset}px)`;
        
        // Set initial opacity to 0 to avoid flash of content
        basePair.style.opacity = '0';
        
        // Create elements
        const leftBaseElem = document.createElement('div');
        leftBaseElem.className = 'base left-base';
        leftBaseElem.textContent = leftBase;
        
        const rightBaseElem = document.createElement('div');
        rightBaseElem.className = 'base right-base';
        rightBaseElem.textContent = rightBase;
        
        const connector = document.createElement('div');
        connector.className = 'base-connector';
        
        basePair.appendChild(leftBaseElem);
        basePair.appendChild(connector);
        basePair.appendChild(rightBaseElem);
        
        fragments.appendChild(basePair);
        allBasePairs.push(basePair);
    }
    
    // Add all elements to the DOM at once to minimize reflow
    dnaHelix.appendChild(fragments);
    
    // Adjust the container height to accommodate the extended helix
    dnaHelix.style.height = `${totalBases * 25 + 50}px`;
    
    // Add animations with staggered delays after elements are in the DOM
    // This ensures smooth animation start
    requestAnimationFrame(() => {
        allBasePairs.forEach((basePair, index) => {
            // Stagger animation delays for a smooth wave effect
            const delay = (index * -0.1).toFixed(2);
            
            // Apply animation now that the element is in the DOM
            basePair.style.animation = `rotate 8s linear infinite ${delay}s`;
            
            // Fade in elements smoothly over time
            setTimeout(() => {
                basePair.style.opacity = '1';
                basePair.style.transition = 'opacity 0.5s ease-in-out';
            }, 50 * index);
        });
    });
}

/**
 * Initialize the mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileToggle || !navLinks) return;
    
    mobileToggle.addEventListener('click', function() {
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
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

/**
 * Initialize the navbar scroll effect
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Animate number counting from 0 to target
 * @param {HTMLElement} element - The element containing the number
 * @param {number} target - The target number to count to
 * @param {string} suffix - Optional suffix like '%' or 'M'
 * @param {number} duration - Animation duration in milliseconds
 */
function animateNumber(element, target, suffix = '', duration = 2000) {
    if (!element) return;
    
    let start = 0;
    let startTime = null;
    const targetNum = parseFloat(target);
    
    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        let currentValue = Math.floor(easedProgress * targetNum);
        
        // Handle special cases
        if (suffix === '%') {
            const decimal = (easedProgress * targetNum) % 1;
            if (decimal > 0) {
                currentValue = (easedProgress * targetNum).toFixed(1);
            }
        }
        
        element.textContent = `${currentValue}${suffix}`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = `${target}${suffix}`;
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
    
    const statElements = {
        accuracy: { elem: document.getElementById('statAccuracy'), target: '141', suffix: '' },
        sequences: { elem: document.getElementById('statSequences'), target: '7', suffix: 'M+' },
        users: { elem: document.getElementById('statUsers'), target: '46', suffix: '+' }
    };
    
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                // Animate each stat with staggered delays
                Object.values(statElements).forEach((stat, index) => {
                    setTimeout(() => {
                        if (stat.elem) {
                            animateNumber(stat.elem, stat.target, stat.suffix, 2000);
                        }
                    }, index * 200);
                });
                
                animated = true;
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

/**
 * Add smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if it's just "#"
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Initialize navbar pulse effect for futuristic look
 */
function initNavbarPulse() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    setInterval(() => {
        navbar.classList.toggle('navbar-pulse');
    }, 2000);
}

/**
 * Initialize futuristic notification effects on the notification banner
 */
function initFuturisticNotificationEffects() {
    const banner = document.querySelector('.notification-banner');
    if (!banner) return;
    banner.addEventListener('mouseenter', () => {
        banner.style.transition = 'filter 0.3s ease';
        banner.style.filter = 'brightness(1.2) contrast(1.1)';
    });
    banner.addEventListener('mouseleave', () => {
        banner.style.filter = 'none';
    });
}

/**
 * Add intersection observer for animating sections as they come into view
 */
const animateSections = document.querySelectorAll('.section, .feature-card, .card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

animateSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});