document.addEventListener('DOMContentLoaded', function() {
    // DNA Helix Animation
    const dnaHelix = document.querySelector('.dna-helix');
    const numBases = 20;
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
        basePair.style.top = `${i * 30}px`;
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

    if (statsSection) {
        observer.observe(statsSection);
    }

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