document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons && tabContents) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Update active states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(tabId)?.classList.add('active');
            });
        });
    }

    // File Drop Zone
    const dropZone = document.querySelector('.file-drop-zone');
    if (dropZone) {
        const fileInput = dropZone.querySelector('input[type="file"]');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            dropZone.classList.add('drag-active');
        }

        function unhighlight() {
            dropZone.classList.remove('drag-active');
        }

        dropZone.addEventListener('drop', handleDrop, false);
        dropZone.addEventListener('click', () => fileInput?.click());

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }

        function handleFiles(files) {
            if (files && files.length > 0) {
                const file = files[0];
                if (file.name.match(/\.(fa|fasta|fastq)$/)) {
                    const fileInfo = dropZone.querySelector('.file-info');
                    if (fileInfo) {
                        fileInfo.textContent = `Selected file: ${file.name}`;
                        fileInfo.style.color = 'var(--gradient-end)';
                    }
                    dropZone.style.borderColor = 'var(--gradient-end)';
                } else {
                    alert('Please upload a valid DNA sequence file (.fa, .fasta, .fastq)');
                }
            }
        }
    }

    // Analyze Button
    const analyzeButton = document.querySelector('.analyze-btn');
    const resultsSection = document.querySelector('.results-section');

    if (analyzeButton && resultsSection) {
        analyzeButton.addEventListener('click', () => {
            // Show loading state
            analyzeButton.disabled = true;
            analyzeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

            // Simulate analysis (replace with actual analysis logic)
            setTimeout(() => {
                resultsSection.style.display = 'block';
                analyzeButton.disabled = false;
                analyzeButton.innerHTML = '<i class="fas fa-play"></i> Start Analysis';
                
                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });
    }

    // Checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const container = checkbox.closest('.checkbox-container');
            if (container) {
                if (checkbox.checked) {
                    container.style.background = 'rgba(255, 255, 255, 0.05)';
                } else {
                    container.style.background = 'transparent';
                }
            }
        });
    });

    // Action Buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Smooth scrolling for hero section
    document.querySelectorAll('.hero a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effects for analysis options
    document.querySelectorAll('.option-card').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 20px rgba(0, 122, 255, 0.2)';
            this.style.borderColor = 'var(--gradient-end)';
        });

        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Add hover effects for results section
    document.querySelectorAll('.result-card').forEach(result => {
        result.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 20px rgba(0, 122, 255, 0.2)';
            this.style.borderColor = 'var(--gradient-end)';
        });

        result.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
});
