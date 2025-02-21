document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats when they come into view
                if (entry.target.id === 'stats') {
                    animateStats();
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all scroll sections
    document.querySelectorAll('.scroll-section').forEach(section => {
        observer.observe(section);
    });

    // Stats animation
    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 100;
            const duration = 2000; // 2 seconds
            const steps = 100;
            const stepTime = duration / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                }
            }, stepTime);
        });
    }

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

    // DNA Helix Animation
    const dnaHelix = document.querySelector('.dna-helix');
    if (dnaHelix) {
        const numBases = 20;
        for (let i = 0; i < numBases; i++) {
            const base = document.createElement('div');
            base.className = 'dna-base';
            base.style.top = `${(i / numBases) * 100}%`;
            base.style.animationDelay = `${i * 0.1}s`;
            dnaHelix.appendChild(base);
        }
    }

    // Feature list animation
    document.querySelectorAll('.feature-list li').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });

    // Security features animation
    document.querySelectorAll('.security-features li').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(item);
                }
            });
        });
        observer.observe(item);
    });

    // Workflow steps animation
    document.querySelectorAll('.step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        step.style.transition = 'all 0.5s ease';
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(step);
                }
            });
        });
        observer.observe(step);
    });

    // Scroll indicator fade out
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Initial check for visible sections
    document.querySelectorAll('.scroll-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.classList.add('visible');
            if (section.id === 'stats') {
                animateStats();
            }
        }
    });
});