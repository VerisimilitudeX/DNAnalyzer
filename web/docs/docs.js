/**
 * DNAnalyzer - Documentation Page JavaScript
 * Handles navigation, search, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize tabs
    initTabs();
    
    // Initialize code copy buttons
    initCodeCopy();
    
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize active link tracking
    initActiveLinkTracking();
    
    // Initialize search functionality
    initSearch();
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const sidebar = document.getElementById('docsSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (sidebar && sidebarToggle) {
        // Toggle sidebar on mobile
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
        
        // Close sidebar on mobile
        if (closeSidebar) {
            closeSidebar.addEventListener('click', function() {
                sidebar.classList.remove('active');
            });
        }
        
        // Close sidebar when clicking on links (mobile)
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });
        
        // Close sidebar when clicking outside (mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(event.target) && 
                event.target !== sidebarToggle &&
                !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or not an ID selector
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = 70; // Height of the fixed navbar
                const docsHeaderHeight = 50; // Height of the docs header (mobile)
                const offset = window.innerWidth <= 768 ? navbarHeight + docsHeaderHeight : navbarHeight;
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            
            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to current button and content
            this.classList.add('active');
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

/**
 * Initialize code copy functionality
 */
function initCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code').textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code)
                .then(() => {
                    // Success feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = 'var(--success)';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = code;
                    textarea.style.position = 'fixed';
                    document.body.appendChild(textarea);
                    textarea.focus();
                    textarea.select();
                    
                    try {
                        document.execCommand('copy');
                        // Success feedback
                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        this.style.background = 'var(--success)';
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.style.background = '';
                        }, 2000);
                    } catch (err) {
                        console.error('Fallback copy failed: ', err);
                        this.textContent = 'Failed!';
                        this.style.background = 'var(--error)';
                        
                        setTimeout(() => {
                            this.textContent = 'Copy';
                            this.style.background = '';
                        }, 2000);
                    }
                    
                    document.body.removeChild(textarea);
                });
        });
    });
}

/**
 * Initialize FAQ accordions
 */
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle active class on the FAQ item
                item.classList.toggle('active');
                
                // If this item was activated, close others
                if (item.classList.contains('active')) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
}

/**
 * Initialize active link tracking based on scroll position
 */
function initActiveLinkTracking() {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Update active link on scroll
    function updateActiveLink() {
        let currentSection = '';
        const navbarHeight = 70;
        const docsHeaderHeight = 50;
        const totalOffset = window.innerWidth <= 768 ? navbarHeight + docsHeaderHeight + 20 : navbarHeight + 20;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - totalOffset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + sectionId;
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call to set active link on page load
    updateActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('docsSearch');
    const sections = document.querySelectorAll('.doc-section');
    
    if (!searchInput || sections.length === 0) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            // If query is too short, show all sections
            sections.forEach(section => {
                section.style.display = 'block';
                
                // Remove any highlights
                removeHighlights(section);
            });
            return;
        }
        
        // Search and filter sections
        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            const headings = Array.from(section.querySelectorAll('h1, h2, h3, h4')).map(h => h.textContent.toLowerCase());
            
            // Check if section contains the query in text or headings
            const containsQuery = sectionText.includes(query) || headings.some(h => h.includes(query));
            
            if (containsQuery) {
                section.style.display = 'block';
                
                // Highlight matches
                removeHighlights(section);
                highlightText(section, query);
            } else {
                section.style.display = 'none';
            }
        });
        
        // If search is cleared, reset highlights
        if (query.length === 0) {
            sections.forEach(section => {
                removeHighlights(section);
            });
        }
    });
}

/**
 * Highlight matching text in an element
 * @param {HTMLElement} element - The element to search in
 * @param {string} query - The text to highlight
 */
function highlightText(element, query) {
    // Only highlight text in paragraphs, list items, and code blocks
    const textNodes = element.querySelectorAll('p, li, code');
    
    textNodes.forEach(node => {
        const html = node.innerHTML;
        // Create regex with word boundary for whole words, or without for partial matches
        const regex = new RegExp(`(\\b${query}\\b|${query})`, 'gi');
        const newHtml = html.replace(regex, '<mark>$1</mark>');
        
        if (newHtml !== html) {
            node.innerHTML = newHtml;
        }
    });
}

/**
 * Remove highlights from an element
 * @param {HTMLElement} element - The element to remove highlights from
 */
function removeHighlights(element) {
    const marks = element.querySelectorAll('mark');
    
    marks.forEach(mark => {
        // Replace mark with its text content
        const textNode = document.createTextNode(mark.textContent);
        mark.parentNode.replaceChild(textNode, mark);
    });
}