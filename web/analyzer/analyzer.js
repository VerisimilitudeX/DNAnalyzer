document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Input method switching
    const methodButtons = document.querySelectorAll('.method-button');
    const inputAreas = document.querySelectorAll('.input-area');
    
    methodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const methodId = button.getAttribute('data-method');
            
            // Update active states
            methodButtons.forEach(btn => btn.classList.remove('active'));
            inputAreas.forEach(area => area.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${methodId}-input`).classList.add('active');
        });
    });

    // File drag and drop
    const dropZone = document.querySelector('.file-drop-zone');
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

    function highlight(e) {
        dropZone.classList.add('drag-active');
    }

    function unhighlight(e) {
        dropZone.classList.remove('drag-active');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.name.match(/\.(fa|fasta|fastq)$/)) {
                dropZone.querySelector('.file-info').textContent = `Selected file: ${file.name}`;
            } else {
                alert('Please upload a valid DNA sequence file (.fa, .fasta, .fastq)');
            }
        }
    }

    // Advanced settings toggle
    const settingsToggle = document.querySelector('.toggle-settings');
    const settingsContent = document.querySelector('.settings-content');

    settingsToggle.addEventListener('click', () => {
        settingsContent.classList.toggle('show');
        settingsToggle.classList.toggle('active');
    });

    // Analysis button
    const analyzeButton = document.querySelector('.analyze-btn');
    const resultsSection = document.querySelector('.results-section');

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

    // Results tab switching
    const resultTabs = document.querySelectorAll('.result-tab');
    
    resultTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            resultTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update result content (to be implemented)
            const resultType = tab.getAttribute('data-result');
            updateResultContent(resultType);
        });
    });

    function updateResultContent(type) {
        const resultContent = document.querySelector('.result-content');
        
        // Example content (replace with actual analysis results)
        switch(type) {
            case 'summary':
                resultContent.innerHTML = `
                    <div class="result-summary">
                        <div class="metric">
                            <h3>Sequence Length</h3>
                            <p>1,234 bp</p>
                        </div>
                        <div class="metric">
                            <h3>GC Content</h3>
                            <p>45.6%</p>
                        </div>
                        <div class="metric">
                            <h3>Start Codons</h3>
                            <p>8 found</p>
                        </div>
                    </div>
                `;
                break;
            case 'details':
                resultContent.innerHTML = `
                    <div class="result-details">
                        <pre class="sequence-view">ATCGATCG...</pre>
                        <div class="analysis-details">
                            <h3>Detailed Findings</h3>
                            <ul>
                                <li>Start codons at positions: 1, 45, 102...</li>
                                <li>Stop codons at positions: 43, 156, 234...</li>
                                <li>High coverage regions: 100-200, 300-450...</li>
                            </ul>
                        </div>
                    </div>
                `;
                break;
            case 'visualization':
                resultContent.innerHTML = `
                    <div class="result-visualization">
                        <div class="visualization-placeholder">
                            <i class="fas fa-chart-bar"></i>
                            <p>Sequence visualization coming soon!</p>
                        </div>
                    </div>
                `;
                break;
        }
    }
});