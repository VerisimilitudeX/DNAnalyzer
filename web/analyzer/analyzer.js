document.addEventListener('DOMContentLoaded', () => {
    // Input type tabs
    const inputTabs = document.querySelectorAll('.input-tab');
    const inputContents = document.querySelectorAll('.input-content');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';

    inputTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const inputType = tab.dataset.input;
            
            // Update active states
            inputTabs.forEach(t => t.classList.remove('active'));
            inputContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected input content
            document.querySelector(`.input-content[data-input="${inputType}"]`).classList.add('active');
            
            // Clear other input
            if (inputType === 'file') {
                document.getElementById('dnaUrl').value = '';
            } else {
                document.getElementById('dnaFile').value = '';
            }
        });
    });

    // Tab handling
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';  // Explicitly hide content
            });
            button.classList.add('active');
            
            // Show selected tab content
            const selectedContent = document.querySelector(`.tab-content[data-tab="${tabName}"]`);
            selectedContent.classList.add('active');
            selectedContent.style.display = 'block';  // Explicitly show content
        });
    });

    // DNA Analysis Form
    const analyzerForm = document.getElementById('analyzerForm');
    const aminoSelect = document.getElementById('aminoAcid');
    const customAmino = document.getElementById('customAmino');
    const results = document.getElementById('results');
    const analysisOutput = document.getElementById('analysisOutput');

    // Analysis option dependencies
    const quickCheckbox = document.getElementById('quick');
    const detailedCheckbox = document.getElementById('detailed');
    const verboseCheckbox = document.getElementById('verbose');
    const gcCheckbox = document.getElementById('gc');
    const codonsCheckbox = document.getElementById('codons');
    const coverageCheckbox = document.getElementById('coverage');
    const longestCheckbox = document.getElementById('longest');
    const formatCheckbox = document.getElementById('format');
    const transcriptionCheckbox = document.getElementById('transcription');
    const promoterCheckbox = document.getElementById('promoter');

    // Show/hide custom amino acid input
    aminoSelect.addEventListener('change', (e) => {
        customAmino.style.display = e.target.value === 'custom' ? 'block' : 'none';
        if (e.target.value !== 'custom') {
            customAmino.value = '';
        }
    });

    // Handle quick analysis mode
    const toggleAnalysisOptions = (isQuick) => {
        const checkboxes = [
            detailedCheckbox, verboseCheckbox, gcCheckbox, 
            codonsCheckbox, coverageCheckbox, longestCheckbox,
            formatCheckbox, transcriptionCheckbox, promoterCheckbox
        ];
        checkboxes.forEach(checkbox => {
            checkbox.disabled = isQuick;
            if (isQuick) {
                checkbox.checked = false;
            }
        });
    };

    quickCheckbox.addEventListener('change', (e) => {
        toggleAnalysisOptions(e.target.checked);
    });

    // DNA Analysis form submission
    analyzerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (aminoSelect.value === 'custom' && !customAmino.value.trim()) {
            alert('Please enter a custom amino acid or select a predefined one.');
            return;
        }

        const formData = new FormData();

        // Handle DNA input (file or URL)
        const activeInput = document.querySelector('.input-content.active').dataset.input;
        if (activeInput === 'file') {
            const dnaFile = document.getElementById('dnaFile').files[0];
            if (!dnaFile) {
                alert('Please select a DNA file to analyze.');
                return;
            }
            formData.append('dnaFile', dnaFile);
        } else {
            const dnaUrl = document.getElementById('dnaUrl').value.trim();
            if (!dnaUrl) {
                alert('Please enter a valid DNA file URL.');
                return;
            }
            formData.append('dnaUrl', dnaUrl);
        }

        // Add all other form data
        formData.append('amino', aminoSelect.value === 'custom' ? customAmino.value : aminoSelect.value);
        formData.append('minCount', document.getElementById('minCount').value);
        formData.append('maxCount', document.getElementById('maxCount').value);
        
        // Add all analysis options
        const options = [
            'reverse', 'rcomplement', 'gc', 'codons', 'coverage', 'longest',
            'verbose', 'detailed', 'quick', 'format', 'transcription', 'promoter'
        ];
        
        options.forEach(option => {
            formData.append(option, document.getElementById(option).checked);
        });
        
        const proteinFile = document.getElementById('proteinFile').files[0];
        if (proteinFile) {
            formData.append('proteinFile', proteinFile);
        }

        await submitAnalysis(formData);
    });

    // Genetic Testing form submission
    const geneticForm = document.getElementById('geneticForm');
    geneticForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const geneticFile = document.getElementById('geneticFile').files[0];
        if (!geneticFile) {
            alert('Please select a genetic testing data file.');
            return;
        }

        const formData = new FormData();
        formData.append('geneticFile', geneticFile);
        formData.append('snpAnalysis', document.getElementById('snpAnalysis').checked);

        await submitAnalysis(formData, '/api/analyze-genetic');
    });

    // Common analysis submission function
    async function submitAnalysis(formData, endpoint = '/api/analyze') {
        const analyzeBtn = document.querySelector('form.tab-content.active .analyze-btn');
        const originalText = analyzeBtn.textContent;
        
        try {
            // Show loading state
            analyzeBtn.textContent = 'Analyzing...';
            analyzeBtn.disabled = true;
            results.style.display = 'block';
            
            // Show loading indicator
            analysisOutput.innerHTML = '';
            analysisOutput.appendChild(loadingIndicator);
            loadingIndicator.textContent = 'Processing... This may take a few moments.';

            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || `HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            results.style.display = 'block';
            analysisOutput.innerHTML = `<pre>${data}</pre>`;
            
            // Scroll to results
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error('Error:', error);
            results.style.display = 'block';
            analysisOutput.innerHTML = `
                <div class="error-container">
                    <h3>Analysis Error</h3>
                    <p>${error.message}</p>
                    <p>Please ensure the local server is running and try again.</p>
                </div>
            `;
        } finally {
            // Restore button state
            analyzeBtn.textContent = originalText;
            analyzeBtn.disabled = false;
        }
    }
});