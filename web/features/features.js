/**
 * DNAnalyzer - Features Page JavaScript
 * Handles animations, scroll events and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar
    initializeNavbar();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
});

/**
 * Initialize navbar functionality
 */
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Handle scroll event to change navbar style
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Handle mobile menu toggle
    if (mobileToggle && navLinks) {
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
        
        // Close mobile menu when clicking a link
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
}

/**
 * Initialize animations for elements
 */
function initializeAnimations() {
    // Get all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Create Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add parallax effect to feature images
    const featureImages = document.querySelectorAll('.feature-image-wrapper');
    
    window.addEventListener('scroll', () => {
        featureImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const isVisible = (
                rect.top <= window.innerHeight &&
                rect.bottom >= 0
            );
            
            if (isVisible) {
                const scrollPos = window.scrollY;
                const imgOffset = rect.top + scrollPos;
                const parallaxOffset = (scrollPos - imgOffset) * 0.1;
                
                // Apply parallax effect
                image.querySelector('img').style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or not an ID selector
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add hover effects for feature cards
 */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

/**
 * Add hover effects for comparison table rows
 */
document.querySelectorAll('.comparison-table tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        const cells = this.querySelectorAll('td');
        cells.forEach(cell => {
            cell.style.transition = 'background-color 0.3s ease';
        });
    });
});

/**
 * Add animation for CTA buttons
 */
document.querySelectorAll('.cta-buttons .btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add scale effect for feature images on hover
document.querySelectorAll('.feature-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.03)';
        }
    });
    
    image.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});