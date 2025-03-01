/*
 * DNAnalyzer About Page JavaScript
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

    // Timeline animation - Adding view animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.classList.contains('timeline-item:nth-child(odd)') 
                    ? 'translateX(0)' 
                    : 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('timeline-item:nth-child(odd)') 
            ? 'translateX(-20px)' 
            : 'translateX(20px)';
        item.style.transition = 'all 0.7s ease-out';
        timelineObserver.observe(item);
    });

    // Handle Vision Hexagon Hover/Click Interaction
    const hexagons = document.querySelectorAll('.hexagon');
    const visionDetails = document.querySelectorAll('.vision-detail');
    
    // Set first vision detail as active by default
    if (visionDetails.length > 0) {
        visionDetails[0].classList.add('active');
    }
    
    hexagons.forEach((hexagon, index) => {
        hexagon.addEventListener('mouseenter', () => {
            // Remove active class from all vision details
            visionDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Add active class to corresponding vision detail
            if (visionDetails[index]) {
                visionDetails[index].classList.add('active');
            }
        });
        
        hexagon.addEventListener('click', () => {
            // Remove active class from all vision details
            visionDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Add active class to corresponding vision detail
            if (visionDetails[index]) {
                visionDetails[index].classList.add('active');
                
                // If on mobile, scroll to the detail
                if (window.innerWidth < 992) {
                    visionDetails[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    // Add some interactivity to stats
    animateStats();
});

/**
 * Animates the stat numbers with a counting effect
 */
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetNumber = parseInt(entry.target.getAttribute('data-count'), 10);
                const duration = 2000; // Animation duration in milliseconds
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easeProgress = easeOutQuad(progress);
                    const currentCount = Math.floor(easeProgress * targetNumber);
                    
                    entry.target.textContent = currentCount;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = targetNumber;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(statNumber => {
        statsObserver.observe(statNumber);
    });
}

/**
 * Easing function for smoother animation
 * @param {number} t - Progress value between 0 and 1
 * @return {number} Eased value
 */
function easeOutQuad(t) {
    return t * (2 - t);
}

// Add a subtle parallax effect to the background blobs
window.addEventListener('mousemove', function(e) {
    const blobs = document.querySelectorAll('.bg-blob');
    
    blobs.forEach(blob => {
        const speed = blob.classList.contains('bg-blob-1') ? 0.03 : 0.02;
        const x = (window.innerWidth / 2 - e.clientX) * speed;
        const y = (window.innerHeight / 2 - e.clientY) * speed;
        
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });
});