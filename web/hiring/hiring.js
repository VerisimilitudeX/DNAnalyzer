document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effects for position cards
    document.querySelectorAll('.position-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'var(--gradient-end)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Add hover effects for benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'var(--gradient-end)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
});
