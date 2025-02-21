document.addEventListener('DOMContentLoaded', function() {
    // DNA Helix Animation
    const dnaHelix = document.querySelector('.dna-helix');
    const numBases = 20;
    const baseTypes = ['A', 'T', 'C', 'G'];
    
    // Create base pairs
    for (let i = 0; i < numBases; i++) {
        const baseIndex = Math.floor(Math.random() * baseTypes.length);
        const complementaryIndex = baseIndex % 2 === 0 ? baseIndex + 1 : baseIndex - 1;
        
        const leftBase = document.createElement('div');
        leftBase.className = 'base left-base';
        leftBase.textContent = baseTypes[baseIndex];
        leftBase.style.animationDelay = `${i * 0.2}s`;
        
        const rightBase = document.createElement('div');
        rightBase.className = 'base right-base';
        rightBase.textContent = baseTypes[complementaryIndex];
        rightBase.style.animationDelay = `${i * 0.2}s`;
        
        const connector = document.createElement('div');
        connector.className = 'base-connector';
        connector.style.animationDelay = `${i * 0.2}s`;
        
        const basePair = document.createElement('div');
        basePair.className = 'base-pair';
        basePair.style.top = `${i * 30}px`;
        
        basePair.appendChild(leftBase);
        basePair.appendChild(connector);
        basePair.appendChild(rightBase);
        dnaHelix.appendChild(basePair);
    }

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > lastScrollTop) {
            // Scrolling down
            scrollIndicator.style.opacity = '0';
        } else if (st === 0) {
            // At top
            scrollIndicator.style.opacity = '1';
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    });

    // Stats Animation
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('#stats');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const value = stat.textContent;
            const isPercentage = value.includes('%');
            const number = parseFloat(value);
            let start = 0;
            
            const increment = number / 50; // Animate over 50 steps
            const interval = setInterval(() => {
                start += increment;
                if (start >= number) {
                    start = number;
                    clearInterval(interval);
                }
                stat.textContent = isPercentage ? 
                    start.toFixed(1) + '%' : 
                    Math.round(start).toLocaleString();
            }, 30);
        });
        
        animated = true;
    }

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});