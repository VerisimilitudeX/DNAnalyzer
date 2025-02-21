document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for feature sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate feature list items
                const listItems = entry.target.querySelectorAll('.feature-list li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });

                // Add animation class to feature visual
                const visual = entry.target.querySelector('.feature-visual');
                if (visual) {
                    visual.style.opacity = '0';
                    visual.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        visual.style.transition = 'all 0.8s ease';
                        visual.style.opacity = '1';
                        visual.style.transform = 'translateY(0)';
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all feature sections
    document.querySelectorAll('.feature-section').forEach(section => {
        observer.observe(section);
    });

    // Parallax effect for gradient spheres
    document.addEventListener('mousemove', (e) => {
        const spheres = document.querySelectorAll('.gradient-sphere');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        spheres.forEach((sphere, index) => {
            const depth = index === 0 ? 20 : 10;
            const translateX = (mouseX - 0.5) * depth;
            const translateY = (mouseY - 0.5) * depth;
            sphere.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial animation for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSection.style.transition = 'all 1s ease';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }

    // Hover effect for feature cards
    document.querySelectorAll('.feature-content').forEach(content => {
        content.addEventListener('mouseenter', () => {
            const visual = content.parentElement.querySelector('.feature-visual');
            if (visual) {
                visual.style.transform = 'scale(1.02)';
                visual.style.transition = 'transform 0.3s ease';
            }
        });

        content.addEventListener('mouseleave', () => {
            const visual = content.parentElement.querySelector('.feature-visual');
            if (visual) {
                visual.style.transform = 'scale(1)';
            }
        });
    });
});