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
    const outputControls = document.createElement('div');
    outputControls.className = 'output-controls';
    
    // Create format toggle buttons
    const formats = [
        { id: 'text', label: 'Plain Text' },
        { id: 'json', label: 'JSON' },
        { id: 'csv', label: 'CSV' }
    ];

    formats.forEach(format => {
        const btn = document.createElement('button');
        btn.className = 'output-format-btn' + (format.id === 'text' ? ' active' : '');
        btn.dataset.format = format.id;
        btn.textContent = format.label;
        outputControls.appendChild(btn);
    });

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
        
        if (!validateForm()) return;

        const formData = buildFormData();
        await submitAnalysis(formData);
    });

    function validateForm() {
        const activeInput = document.querySelector('.input-content.active').dataset.input;
        const aminoSelect = document.getElementById('aminoAcid');
        const customAmino = document.getElementById('customAmino');

        if (activeInput === 'file') {
            const dnaFile = document.getElementById('dnaFile').files[0];
            if (!dnaFile) {
                showError('Input Error', 'Please select a DNA file to analyze.');
                return false;
            }
            if (!validateFileType(dnaFile)) {
                showError('File Type Error', 'Please upload a valid FASTA or FASTQ file.');
                return false;
            }
        } else {
            const dnaUrl = document.getElementById('dnaUrl').value.trim();
            if (!dnaUrl) {
                showError('Input Error', 'Please enter a valid DNA file URL.');
                return false;
            }
            if (!validateUrl(dnaUrl)) {
                showError('URL Error', 'Please enter a valid FASTA or FASTQ file URL.');
                return false;
            }
        }

        if (aminoSelect.value === 'custom' && !customAmino.value.trim()) {
            showError('Input Error', 'Please enter a custom amino acid or select a predefined one.');
            return false;
        }

        return true;
    }

    function validateFileType(file) {
        const validTypes = ['.fa', '.fasta', '.fastq'];
        return validTypes.some(type => file.name.toLowerCase().endsWith(type));
    }

    function validateUrl(url) {
        try {
            const urlObj = new URL(url);
            const validExtensions = ['.fa', '.fasta', '.fastq'];
            return validExtensions.some(ext => urlObj.pathname.toLowerCase().endsWith(ext));
        } catch {
            return false;
        }
    }

    function buildFormData() {
        const formData = new FormData();
        const activeInput = document.querySelector('.input-content.active').dataset.input;
        const aminoSelect = document.getElementById('aminoAcid');
        const customAmino = document.getElementById('customAmino');

        // Add file or URL
        if (activeInput === 'file') {
            formData.append('dnaFile', document.getElementById('dnaFile').files[0]);
        } else {
            formData.append('dnaUrl', document.getElementById('dnaUrl').value.trim());
        }

        // Add amino acid selection
        formData.append('amino', aminoSelect.value === 'custom' ? customAmino.value : aminoSelect.value);
        formData.append('minCount', document.getElementById('minCount').value);
        formData.append('maxCount', document.getElementById('maxCount').value);

        // Add analysis options
        const options = [
            'reverse', 'rcomplement', 'gc', 'codons', 'coverage', 'longest',
            'verbose', 'detailed', 'quick', 'format', 'transcription', 'promoter'
        ];
        
        options.forEach(option => {
            formData.append(option, document.getElementById(option).checked);
        });

        // Add protein file if provided
        const proteinFile = document.getElementById('proteinFile').files[0];
        if (proteinFile) {
            formData.append('proteinFile', proteinFile);
        }

        return formData;
    }

    function showError(title, message, details = '') {
        results.style.display = 'block';
        results.classList.add('error');
        analysisOutput.innerHTML = `
            <div class="analysis-error">
                <h3>${title}</h3>
                <p>${message}</p>
                ${details ? `<pre class="error-details">${details}</pre>` : ''}
            </div>
        `;
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async function submitAnalysis(formData, endpoint = '/api/analyze') {
        const analyzeBtn = document.querySelector('form.tab-content.active .analyze-btn');
        const originalText = analyzeBtn.textContent;
        
        try {
            analyzeBtn.textContent = 'Analyzing...';
            analyzeBtn.disabled = true;
            results.style.display = 'block';
            results.classList.remove('error');
            
            analysisOutput.innerHTML = '<div class="processing-indicator">Processing data...</div>';

            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                body: formData
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Analysis failed');
            }

            const data = contentType?.includes('application/json') ? 
                await response.json() : 
                await response.text();

            results.style.display = 'block';
            
            if (endpoint === '/api/analyze-genetic') {
                analysisOutput.innerHTML = '';
                analysisOutput.appendChild(renderGeneticResults(data));
            } else {
                // Handle DNA analysis results as before
                analysisOutput.innerHTML = `
                    <div class="success-indicator">Analysis completed successfully</div>
                    ${outputControls.outerHTML}
                    <pre>${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}</pre>
                `;

                // Add format switching functionality
                const formatBtns = analysisOutput.querySelectorAll('.output-format-btn');
                formatBtns.forEach(btn => {
                    btn.addEventListener('click', () => switchFormat(btn.dataset.format));
                });
            }

        } catch (error) {
            console.error('Error:', error);
            showError('Analysis Error', error.message);
        } finally {
            analyzeBtn.textContent = originalText;
            analyzeBtn.disabled = false;
        }
    }

    function switchFormat(format) {
        // Reset active states
        outputControls.querySelectorAll('.output-format-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.format === format);
        });

        // Re-submit with new format
        const formData = buildFormData();
        formData.append('format', format);
        submitAnalysis(formData);
    }

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

    function renderGeneticResults(data) {
        const container = document.createElement('div');
        container.className = 'genetic-results';

        // Overview section
        const overview = document.createElement('div');
        overview.className = 'results-section';
        overview.innerHTML = `
            <h3>Analysis Overview</h3>
            <div class="stat-grid">
                <div class="stat-item">
                    <span class="stat-label">Total SNPs</span>
                    <span class="stat-value">${data.totalSnps.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Chromosomes</span>
                    <span class="stat-value">${Object.keys(data.chromosomeDistribution).length}</span>
                </div>
            </div>
        `;
        container.appendChild(overview);

        // Chromosome distribution chart
        const chartSection = document.createElement('div');
        chartSection.className = 'results-section';
        chartSection.innerHTML = `
            <h3>Chromosome Distribution</h3>
            <div class="chromosome-chart">
                ${Object.entries(data.chromosomeDistribution).map(([chr, count]) => `
                    <div class="chart-bar">
                        <div class="bar-fill" style="height: ${(count / data.totalSnps * 100)}%">
                            <span class="bar-value">${count}</span>
                        </div>
                        <span class="bar-label">${chr}</span>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(chartSection);

        // SNP details if available
        if (data.snps && data.snps.length > 0) {
            const snpSection = document.createElement('div');
            snpSection.className = 'results-section';
            snpSection.innerHTML = `
                <h3>SNP Analysis</h3>
                <div class="snp-table">
                    <table>
                        <thead>
                            <tr>
                                <th>RSID</th>
                                <th>Chromosome</th>
                                <th>Position</th>
                                <th>Genotype</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.snps.slice(0, 100).map(snp => `
                                <tr>
                                    <td>${snp.rsid}</td>
                                    <td>${snp.chromosome}</td>
                                    <td>${snp.position}</td>
                                    <td>${snp.genotype}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ${data.snps.length > 100 ? `
                        <div class="table-note">
                            Showing first 100 SNPs of ${data.snps.length} total
                        </div>
                    ` : ''}
                </div>
            `;
            container.appendChild(snpSection);
        }

        return container;
    }
});