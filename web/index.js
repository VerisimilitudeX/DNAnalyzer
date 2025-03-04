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
});

/**
 * Initialize the notification banner dismiss functionality and adjust navbar positioning
 */
function initNotificationBanner() {
    const banner = document.querySelector('.notification-banner');
    const navbar = document.getElementById('navbar');
    if (banner && navbar) {
         // Position navbar below the notification banner
         navbar.style.top = banner.offsetHeight + "px";
    }
    const closeBtn = document.querySelector('.notification-banner .notification-close');
    if (!closeBtn) return;
    closeBtn.addEventListener('click', function() {
        const banner = this.closest('.notification-banner');
        if (banner) {
            banner.style.display = 'none';
            if (navbar) {
                // Reset navbar position when banner is dismissed
                navbar.style.top = "0px";
            }
        }
    });
}

/**
 * Initialize the DNA Helix animation on the homepage
 */
function initDNAHelix() {
    const dnaHelix = document.getElementById('dnaHelix');
    if (!dnaHelix) return;
    
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
        basePair.style.animationDelay = `${i * 0.2}s`;
        
        const leftBaseElem = document.createElement('div');
        leftBaseElem.className = 'base left-base';
        leftBaseElem.textContent = leftBase;
        leftBaseElem.style.animationDelay = `${i * 0.2}s`;
        
        const rightBaseElem = document.createElement('div');
        rightBaseElem.className = 'base right-base';
        rightBaseElem.textContent = rightBase;
        rightBaseElem.style.animationDelay = `${i * 0.2}s`;
        
        const connector = document.createElement('div');
        connector.className = 'base-connector';
        connector.style.animationDelay = `${i * 0.2}s`;
        
        basePair.appendChild(leftBaseElem);
        basePair.appendChild(connector);
        basePair.appendChild(rightBaseElem);
        
        dnaHelix.appendChild(basePair);
    }
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