document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search through all content sections
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const matches = text.includes(searchTerm);
            section.style.display = matches || searchTerm === '' ? 'block' : 'none';
            
            // If section is visible, also highlight the corresponding nav link
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (navLink) {
                navLink.style.display = matches || searchTerm === '' ? 'block' : 'none';
            }
        });

        // If search is empty, show all sections
        if (searchTerm === '') {
            contentSections.forEach(section => section.style.display = 'block');
            navLinks.forEach(link => link.style.display = 'block');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight current section in navigation based on scroll position
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Initial highlight of the first nav link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});
