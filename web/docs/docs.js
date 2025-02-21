document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const sections = document.querySelectorAll('.content-section');

    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle search functionality
    const searchInput = document.querySelector('.search-input');
    const contentSections = document.querySelectorAll('.content-section');
    let searchTimeout;

    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                contentSections.forEach(section => {
                    const text = section.textContent.toLowerCase();
                    const match = text.includes(searchTerm);
                    
                    if (match) {
                        section.style.display = 'block';
                        // Highlight matches
                        const regex = new RegExp(searchTerm, 'gi');
                        section.innerHTML = section.innerHTML.replace(regex, match => `<mark>${match}</mark>`);
                    } else {
                        section.style.display = 'none';
                    }
                });
            } else {
                // Show all sections if search term is too short
                contentSections.forEach(section => {
                    section.style.display = 'block';
                    // Remove highlights
                    section.innerHTML = section.innerHTML.replace(/<mark>(.*?)<\/mark>/g, '$1');
                });
            }
        }, 300);
    });

    // Handle code copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block').querySelector('code');
            const text = codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = 'var(--gradient-end)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            });
        });
    });

    // Handle table of contents highlighting
    const tocLinks = document.querySelectorAll('.nav-links .nav-link');
    const observerOptions = {
        rootMargin: '-100px 0px -50%',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});
