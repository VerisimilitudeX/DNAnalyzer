/**
 * DNAnalyzer - Genetic Testing Module
 * Handles genetic testing functionality including file handling, analysis, and visualization
 */

// Initialize genetic testing functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('genetic-testing')) {
        initGeneticTesting();
    }
});

/**
 * Initialize genetic testing functionality
 */
function initGeneticTesting() {
    // Initialize file upload for genetic data
    initGeneticFileUpload();
    
    // Initialize test options selection
    initTestOptions();
    
    // Initialize consent checkbox
    initConsentCheckbox();
    
    // Initialize analyze button
    const geneticAnalyzeBtn = document.getElementById('geneticAnalyzeBtn');
    if (geneticAnalyzeBtn) {
        geneticAnalyzeBtn.addEventListener('click', handleGeneticAnalysis);
    }
    
    // Add sample data button
    addSampleDataButton();
}

/**
 * Initialize genetic file upload with drag and drop functionality
 */
function initGeneticFileUpload() {
    const dropZone = document.getElementById('geneticFileDropZone');
    const fileInput = document.getElementById('geneticFileInput');
    
    if (!dropZone || !fileInput) return;
    
    // Handle click on drop zone
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection via input
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleGeneticFileSelection(e.target.files[0]);
        }
    });
    
    // Handle drag and drop events
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handleGeneticFileSelection(e.dataTransfer.files[0]);
        }
    });
}

/**
 * Handle the selected genetic data file
 * @param {File} file - The selected file
 */
function handleGeneticFileSelection(file) {
    const dropZone = document.getElementById('geneticFileDropZone');
    const fileInput = document.getElementById('geneticFileInput');
    const geneticAnalyzeBtn = document.getElementById('geneticAnalyzeBtn');
    
    if (!dropZone || !fileInput || !geneticAnalyzeBtn) return;
    
    // Check file type
    const validExtensions = ['.txt', '.csv', '.vcf'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExt)) {
        showNotification('Invalid file format. Please upload a .txt, .csv, or .vcf file.', 'error');
        return;
    }
    
    // Update UI to show selected file
    dropZone.innerHTML = `
        <div class="selected-file">
            <i class="fas fa-dna"></i>
            <div class="file-info">
                <h4>${file.name}</h4>
                <span>${formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" aria-label="Remove file">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add remove button functionality
    const removeBtn = dropZone.querySelector('.file-remove');
    if (removeBtn) {
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            resetGeneticFileUpload();
        });
    }
    
    // Store file in global variable for later use
    window.selectedGeneticFile = file;
    
    // Enable analyze button if consent is checked
    const consentCheckbox = document.getElementById('consentCheckbox');
    if (consentCheckbox && consentCheckbox.checked) {
        geneticAnalyzeBtn.disabled = false;
    }
    
    // Show notification
    showNotification('Genetic data file selected. Complete the form and select testing options.', 'success');
}

/**
 * Reset the genetic file upload area to its initial state
 */
function resetGeneticFileUpload() {
    const dropZone = document.getElementById('geneticFileDropZone');
    const fileInput = document.getElementById('geneticFileInput');
    const geneticAnalyzeBtn = document.getElementById('geneticAnalyzeBtn');
    
    if (!dropZone || !fileInput || !geneticAnalyzeBtn) return;
    
    // Reset input value
    fileInput.value = '';
    
    // Reset drop zone content
    dropZone.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <h3>Upload Genetic Data</h3>
        <p>Drag and drop your genetic data file here or click to browse</p>
        <span class="upload-formats">Supported formats: .txt, .csv, .vcf (23andMe, AncestryDNA, etc.)</span>
    `;
    
    // Disable analyze button
    geneticAnalyzeBtn.disabled = true;
    
    // Clear stored file
    window.selectedGeneticFile = null;
}

/**
 * Initialize test options selection
 */
function initTestOptions() {
    const testOptions = document.querySelectorAll('.test-option');
    
    testOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

/**
 * Initialize consent checkbox
 */
function initConsentCheckbox() {
    const consentCheckbox = document.getElementById('consentCheckbox');
    const geneticAnalyzeBtn = document.getElementById('geneticAnalyzeBtn');
    
    if (!consentCheckbox || !geneticAnalyzeBtn) return;
    
    consentCheckbox.addEventListener('change', function() {
        // Enable analyze button only if both file is selected and consent is checked
        geneticAnalyzeBtn.disabled = !(this.checked && window.selectedGeneticFile);
    });
}

/**
 * Add sample data button to the genetic testing tab
 */
function addSampleDataButton() {
    const uploadFormats = document.querySelector('#geneticFileDropZone .upload-formats');
    
    if (!uploadFormats) return;
    
    const sampleBtn = document.createElement('button');
    sampleBtn.className = 'btn btn-secondary btn-sm sample-data-btn';
    sampleBtn.innerHTML = '<i class="fas fa-vial"></i> Load Sample Data';
    sampleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        loadSampleGeneticData();
    });
    
    uploadFormats.insertAdjacentElement('afterend', sampleBtn);
}

/**
 * Load sample genetic data for demonstration
 */
function loadSampleGeneticData() {
    // Create a sample file
    const sampleData = createSampleGeneticData();
    const blob = new Blob([sampleData], { type: 'text/plain' });
    const file = new File([blob], 'sample-genetic-data.txt', { type: 'text/plain' });
    
    // Process the sample file
    handleGeneticFileSelection(file);
    
    // Pre-fill form with sample data
    document.getElementById('gender').value = 'male';
    document.getElementById('age').value = '35';
    document.getElementById('ethnicity').value = 'european';
    
    // Select all test options
    document.querySelectorAll('.test-option').forEach(option => {
        option.classList.add('selected');
    });
    
    // Check consent checkbox
    const consentCheckbox = document.getElementById('consentCheckbox');
    if (consentCheckbox) {
        consentCheckbox.checked = true;
        
        // Trigger change event
        const event = new Event('change');
        consentCheckbox.dispatchEvent(event);
    }
    
    // Show notification
    showNotification('Sample genetic data loaded successfully!', 'success');
}

/**
 * Create sample genetic data in 23andMe format
 * @returns {string} - Sample genetic data
 */
function createSampleGeneticData() {
    return `# This data is for demonstration purposes only
# Sample genetic data in 23andMe format
# This file contains a small subset of SNPs for educational purposes

# rsid\tchromosome\tposition\tgenotype
rs4477212\t1\t82154\tAA
rs3094315\t1\t752566\tAG
rs12562034\t1\t768448\tGG
rs3934834\t1\t1005806\tCC
rs3737728\t1\t1011278\tAG
rs11260588\t1\t1021454\tGG
rs2905036\t1\t1021915\tCC
rs2973725\t1\t1025314\tAG
rs2980300\t1\t1041900\tTT
rs4475691\t1\t1051029\tCC
rs11497407\t1\t1061166\tAA
rs11260603\t1\t1070488\tGG
rs2341354\t1\t1088657\tAG
rs2341355\t1\t1088761\tTT
rs1320571\t1\t1089876\tAG
rs11260614\t1\t1093709\tAA
rs2978398\t1\t1099810\tGG
rs2820323\t1\t1105366\tAG
rs2887286\t1\t1110240\tAA
rs1815606\t1\t1110294\tCC
rs2978381\t1\t1114147\tGG
rs7526076\t1\t1117281\tAA
rs2887286\t1\t1110240\tAA
rs1815606\t1\t1110294\tCC`;
}

/**
 * Handle genetic analysis process
 */
function handleGeneticAnalysis() {
    // Get selected file
    const file = window.selectedGeneticFile;
    if (!file) {
        showNotification('Please upload a genetic data file first.', 'warning');
        return;
    }
    
    // Get selected tests
    const selectedTests = [];
    document.querySelectorAll('.test-option.selected').forEach(option => {
        selectedTests.push(option.dataset.test);
    });
    
    if (selectedTests.length === 0) {
        showNotification('Please select at least one test to perform.', 'warning');
        return;
    }
    
    // Get form data
    const formData = {
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        ethnicity: document.getElementById('ethnicity').value
    };
    
    // Start analysis
    showNotification('Starting genetic analysis...', 'info');
    
    // Show loading state
    const analyzeBtn = document.getElementById('geneticAnalyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    }
    
    // Simulate processing delay
    setTimeout(() => {
        // Perform analysis
        const results = performGeneticAnalysis(file, selectedTests, formData);
        
        // Display results
        displayGeneticResults(results);
        
        // Reset button
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-vial"></i> Run Genetic Tests';
        }
    }, 2000);
}

/**
 * Perform genetic analysis on the provided file
 * @param {File} file - Genetic data file
 * @param {Array} selectedTests - Array of selected test types
 * @param {Object} formData - Personal information form data
 * @returns {Object} - Analysis results
 */
function performGeneticAnalysis(file, selectedTests, formData) {
    // This is a simplified demonstration that returns pre-defined results
    // In a real implementation, this would parse the file and analyze the data
    
    // Sample results for demonstration
    return {
        summary: {
            totalSnps: 24,
            analyzedSnps: 24,
            coverage: "0.001%",
            quality: "High"
        },
        health: {
            risks: [
                { condition: "Type 2 Diabetes", risk: "Slightly Elevated", snps: ["rs4477212", "rs3094315"], confidence: "Medium" },
                { condition: "Coronary Heart Disease", risk: "Average", snps: ["rs12562034", "rs3934834"], confidence: "High" },
                { condition: "Age-related Macular Degeneration", risk: "Lower", snps: ["rs3737728"], confidence: "Medium" },
                { condition: "Alzheimer's Disease", risk: "Average", snps: ["rs11260588", "rs2905036"], confidence: "Low" }
            ]
        },
        traits: {
            physical: [
                { trait: "Eye Color", prediction: "Brown", snps: ["rs2973725", "rs2980300"], confidence: "High" },
                { trait: "Hair Type", prediction: "Straight", snps: ["rs4475691"], confidence: "Medium" },
                { trait: "Earwax Type", prediction: "Wet", snps: ["rs11497407"], confidence: "High" },
                { trait: "Lactose Intolerance", prediction: "Likely Tolerant", snps: ["rs11260603"], confidence: "Medium" }
            ],
            behavioral: [
                { trait: "Caffeine Metabolism", prediction: "Fast Metabolizer", snps: ["rs2341354"], confidence: "Medium" },
                { trait: "Alcohol Flush Reaction", prediction: "No Reaction", snps: ["rs2341355"], confidence: "High" }
            ]
        },
        ancestry: {
            composition: [
                { population: "Northern European", percentage: 68 },
                { population: "Southern European", percentage: 12 },
                { population: "Eastern European", percentage: 8 },
                { population: "Northwest Asian", percentage: 6 },
                { population: "Other", percentage: 6 }
            ],
            haplogroups: {
                maternal: "H1c",
                paternal: "R1b1b2a1a"
            }
        },
        carrier: {
            conditions: [
                { condition: "Cystic Fibrosis", status: "Not a Carrier", snps: ["rs1320571"], confidence: "High" },
                { condition: "Sickle Cell Anemia", status: "Not a Carrier", snps: ["rs11260614"], confidence: "High" },
                { condition: "Tay-Sachs Disease", status: "Not a Carrier", snps: ["rs2978398"], confidence: "Medium" },
                { condition: "Phenylketonuria", status: "Not a Carrier", snps: ["rs2820323"], confidence: "High" }
            ]
        }
    };
}

/**
 * Display genetic analysis results
 * @param {Object} results - Analysis results
 */
function displayGeneticResults(results) {
    // Get results section and make it visible
    const resultsSection = document.getElementById('resultsSection');
    if (!resultsSection) return;
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Update summary section
    const summaryElement = document.querySelector('.results-summary');
    if (summaryElement) {
        summaryElement.innerHTML = `
            <h2>Genetic Analysis Results</h2>
            <div class="summary-stats">
                <div class="summary-stat">
                    <span class="stat-value">${results.summary.totalSnps}</span>
                    <span class="stat-label">SNPs Analyzed</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${results.summary.coverage}</span>
                    <span class="stat-label">Genome Coverage</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${results.summary.quality}</span>
                    <span class="stat-label">Data Quality</span>
                </div>
            </div>
        `;
    }
    
    // Update content section with tabs for each test type
    const contentElement = document.querySelector('.results-content');
    if (!contentElement) return;
    
    // Create tabs
    let tabsHtml = '<div class="results-tabs">';
    
    if (results.health) {
        tabsHtml += `<button class="tab-btn active" data-result-tab="health">
            <i class="fas fa-heartbeat"></i> Health Risks
        </button>`;
    }
    
    if (results.traits) {
        tabsHtml += `<button class="tab-btn" data-result-tab="traits">
            <i class="fas fa-user"></i> Traits
        </button>`;
    }
    
    if (results.ancestry) {
        tabsHtml += `<button class="tab-btn" data-result-tab="ancestry">
            <i class="fas fa-globe"></i> Ancestry
        </button>`;
    }
    
    if (results.carrier) {
        tabsHtml += `<button class="tab-btn" data-result-tab="carrier">
            <i class="fas fa-baby"></i> Carrier Status
        </button>`;
    }
    
    tabsHtml += '</div>';
    
    // Create tab content
    let contentHtml = tabsHtml + '<div class="results-tab-content">';
    
    // Health risks tab
    if (results.health) {
        contentHtml += `
            <div class="result-tab-panel active" id="health-panel">
                <h3>Health Risk Assessment</h3>
                <p class="disclaimer">Note: These results are for educational purposes only and should not be used for medical decisions.</p>
                
                <div class="risk-cards">
                    ${results.health.risks.map(risk => `
                        <div class="risk-card risk-${risk.risk.toLowerCase().replace(/\s+/g, '-')}">
                            <div class="risk-header">
                                <h4>${risk.condition}</h4>
                                <span class="risk-level">${risk.risk}</span>
                            </div>
                            <div class="risk-details">
                                <div class="snp-list">
                                    <strong>Relevant SNPs:</strong> ${risk.snps.join(', ')}
                                </div>
                                <div class="confidence">
                                    <strong>Confidence:</strong> 
                                    <span class="confidence-${risk.confidence.toLowerCase()}">${risk.confidence}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Traits tab
    if (results.traits) {
        contentHtml += `
            <div class="result-tab-panel" id="traits-panel">
                <h3>Genetic Traits</h3>
                
                <div class="traits-section">
                    <h4>Physical Traits</h4>
                    <div class="trait-cards">
                        ${results.traits.physical.map(trait => `
                            <div class="trait-card">
                                <div class="trait-header">
                                    <h5>${trait.trait}</h5>
                                </div>
                                <div class="trait-prediction">
                                    <strong>${trait.prediction}</strong>
                                    <span class="confidence-${trait.confidence.toLowerCase()}">${trait.confidence} confidence</span>
                                </div>
                                <div class="trait-snps">
                                    <small>SNPs: ${trait.snps.join(', ')}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="traits-section">
                    <h4>Behavioral Traits</h4>
                    <div class="trait-cards">
                        ${results.traits.behavioral.map(trait => `
                            <div class="trait-card">
                                <div class="trait-header">
                                    <h5>${trait.trait}</h5>
                                </div>
                                <div class="trait-prediction">
                                    <strong>${trait.prediction}</strong>
                                    <span class="confidence-${trait.confidence.toLowerCase()}">${trait.confidence} confidence</span>
                                </div>
                                <div class="trait-snps">
                                    <small>SNPs: ${trait.snps.join(', ')}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Ancestry tab
    if (results.ancestry) {
        contentHtml += `
            <div class="result-tab-panel" id="ancestry-panel">
                <h3>Ancestry Composition</h3>
                
                <div class="ancestry-composition">
                    <div class="ancestry-chart">
                        <canvas id="ancestryChart"></canvas>
                    </div>
                    <div class="ancestry-breakdown">
                        ${results.ancestry.composition.map(pop => `
                            <div class="ancestry-item">
                                <div class="ancestry-name">${pop.population}</div>
                                <div class="ancestry-bar">
                                    <div class="ancestry-progress" style="width: ${pop.percentage}%"></div>
                                </div>
                                <div class="ancestry-percentage">${pop.percentage}%</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="haplogroups-section">
                    <h4>Haplogroups</h4>
                    <div class="haplogroups-info">
                        <div class="haplogroup-item">
                            <strong>Maternal Haplogroup:</strong> ${results.ancestry.haplogroups.maternal}
                        </div>
                        <div class="haplogroup-item">
                            <strong>Paternal Haplogroup:</strong> ${results.ancestry.haplogroups.paternal}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Carrier status tab
    if (results.carrier) {
        contentHtml += `
            <div class="result-tab-panel" id="carrier-panel">
                <h3>Carrier Status</h3>
                <p class="disclaimer">Note: These results are for educational purposes only and should not be used for family planning decisions.</p>
                
                <div class="carrier-cards">
                    ${results.carrier.conditions.map(condition => `
                        <div class="carrier-card">
                            <div class="carrier-header">
                                <h4>${condition.condition}</h4>
                                <span class="carrier-status status-${condition.status.toLowerCase().replace(/\s+/g, '-')}">${condition.status}</span>
                            </div>
                            <div class="carrier-details">
                                <div class="snp-list">
                                    <strong>Relevant SNPs:</strong> ${condition.snps.join(', ')}
                                </div>
                                <div class="confidence">
                                    <strong>Confidence:</strong> 
                                    <span class="confidence-${condition.confidence.toLowerCase()}">${condition.confidence}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    contentHtml += '</div>';
    
    // Update content
    contentElement.innerHTML = contentHtml;
    
    // Initialize results tabs
    initResultsTabs();
    
    // Initialize charts if ancestry results are present
    if (results.ancestry) {
        initAncestryChart(results.ancestry.composition);
    }
    
    // Show notification
    showNotification('Genetic analysis completed successfully!', 'success');
}

/**
 * Initialize tabs in the results section
 */
function initResultsTabs() {
    const tabButtons = document.querySelectorAll('.results-tabs .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            document.querySelectorAll('.results-tabs .tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.result-tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabName = this.dataset.resultTab;
            const panel = document.getElementById(tabName + '-panel');
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

/**
 * Initialize ancestry composition chart
 * @param {Array} composition - Ancestry composition data
 */
function initAncestryChart(composition) {
    const canvas = document.getElementById('ancestryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Extract data for chart
    const labels = composition.map(item => item.population);
    const data = composition.map(item => item.percentage);
    const colors = [
        '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6D01',
        '#46BDC6', '#9C27B0', '#3F51B5', '#03A9F4', '#00BCD4'
    ];
    
    // Create chart
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, composition.length),
                borderColor: '#001427',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 20, 39, 0.8)',
                    titleFont: {
                        family: 'Inter, sans-serif',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter, sans-serif',
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Utility function for formatting file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Utility function for showing notifications
function showNotification(message, type = 'info', duration = 5000) {
    // Use the existing notification function from analyzer.js if available
    if (window.showNotification) {
        window.showNotification(message, type, duration);
        return;
    }
    
    // Fallback implementation
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    switch (type) {
        case 'success':
            icon.className = 'fas fa-check-circle';
            break;
        case 'error':
            icon.className = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            icon.className = 'fas fa-exclamation-triangle';
            break;
        default:
            icon.className = 'fas fa-info-circle';
    }
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    content.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(content);
    container.appendChild(notification);
    
    // Show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Genetic Testing Implementation
const geneticTestingModule = {
    // Supported file formats
    supportedFormats: ['.fastq', '.fasta', '.sam', '.bam', '.vcf'],
    
    // Sample DNA sequences for testing
    sampleSequences: {
        'sample1.fastq': 'ATCGATCGATCGATCG...',
        'sample2.fasta': '>Sample2\nGATTACAGATTACA...',
        'sample3.vcf': '##fileformat=VCFv4.2\n#CHROM\tPOS\tID...'
    },

    init() {
        this.setupEventListeners();
        this.initializeUI();
    },

    setupEventListeners() {
        // File upload handling
        const fileInput = document.getElementById('dnaFileInput');
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Sample file selection
        const sampleSelect = document.getElementById('sampleFileSelect');
        sampleSelect.addEventListener('change', (e) => this.loadSampleFile(e));

        // Analysis button
        const analyzeBtn = document.getElementById('analyzeButton');
        analyzeBtn.addEventListener('click', () => this.startAnalysis());
    },

    initializeUI() {
        // Initialize dropzone
        const dropZone = document.getElementById('dropZone');
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFileUpload({ target: { files } });
        });

        // Add sample files to select
        const sampleSelect = document.getElementById('sampleFileSelect');
        Object.keys(this.sampleSequences).forEach(sample => {
            const option = document.createElement('option');
            option.value = sample;
            option.textContent = sample;
            sampleSelect.appendChild(option);
        });
    },

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!this.validateFileFormat(file)) {
            this.showError(`Unsupported file format. Please use: ${this.supportedFormats.join(', ')}`);
            return;
        }

        try {
            const sequence = await this.readFile(file);
            this.updateUI('fileLoaded', { fileName: file.name, sequence });
        } catch (error) {
            this.showError('Error reading file: ' + error.message);
        }
    },

    loadSampleFile(event) {
        const sampleName = event.target.value;
        const sequence = this.sampleSequences[sampleName];
        if (sequence) {
            this.updateUI('fileLoaded', { fileName: sampleName, sequence });
        }
    },

    async startAnalysis() {
        const sequence = this.getCurrentSequence();
        if (!sequence) {
            this.showError('Please upload a DNA sequence file or select a sample first.');
            return;
        }

        this.updateUI('analysisStarted');
        
        try {
            // Perform various analyses
            const results = await Promise.all([
                this.analyzeMutations(sequence),
                this.predictTraits(sequence),
                this.findAncestry(sequence),
                this.assessHealthRisks(sequence)
            ]);

            this.updateUI('analysisComplete', { results });
        } catch (error) {
            this.showError('Analysis failed: ' + error.message);
        }
    },

    // Analysis Methods
    async analyzeMutations(sequence) {
        // Implementation of mutation analysis
        return {
            type: 'mutations',
            findings: [
                { position: 1234, mutation: 'SNP', reference: 'A', variant: 'G' },
                { position: 5678, mutation: 'Deletion', reference: 'CTG', variant: '-' }
            ]
        };
    },

    async predictTraits(sequence) {
        // Implementation of trait prediction
        return {
            type: 'traits',
            predictions: [
                { trait: 'Eye Color', prediction: 'Brown', confidence: 0.89 },
                { trait: 'Height', prediction: 'Above Average', confidence: 0.75 }
            ]
        };
    },

    async findAncestry(sequence) {
        // Implementation of ancestry analysis
        return {
            type: 'ancestry',
            composition: [
                { region: 'European', percentage: 45 },
                { region: 'East Asian', percentage: 30 },
                { region: 'African', percentage: 25 }
            ]
        };
    },

    async assessHealthRisks(sequence) {
        // Implementation of health risk assessment
        return {
            type: 'health',
            risks: [
                { condition: 'Type 2 Diabetes', risk: 'Low', score: 0.2 },
                { condition: 'Heart Disease', risk: 'Moderate', score: 0.4 }
            ]
        };
    },

    // Utility Methods
    validateFileFormat(file) {
        return this.supportedFormats.some(format => 
            file.name.toLowerCase().endsWith(format)
        );
    },

    async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('File reading failed'));
            reader.readAsText(file);
        });
    },

    getCurrentSequence() {
        const sequenceDisplay = document.getElementById('sequenceDisplay');
        return sequenceDisplay?.dataset.sequence;
    },

    showError(message) {
        const errorDisplay = document.getElementById('errorDisplay');
        errorDisplay.textContent = message;
        errorDisplay.style.display = 'block';
        setTimeout(() => {
            errorDisplay.style.display = 'none';
        }, 5000);
    },

    updateUI(state, data = {}) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const resultsContainer = document.getElementById('resultsContainer');
        const sequenceDisplay = document.getElementById('sequenceDisplay');

        switch (state) {
            case 'fileLoaded':
                sequenceDisplay.textContent = `File loaded: ${data.fileName}`;
                sequenceDisplay.dataset.sequence = data.sequence;
                break;

            case 'analysisStarted':
                loadingSpinner.style.display = 'block';
                resultsContainer.innerHTML = '';
                break;

            case 'analysisComplete':
                loadingSpinner.style.display = 'none';
                this.displayResults(data.results);
                break;
        }
    },

    displayResults(results) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';

        results.forEach(result => {
            const section = document.createElement('div');
            section.className = 'result-section';

            switch (result.type) {
                case 'mutations':
                    section.innerHTML = this.createMutationsHTML(result);
                    break;
                case 'traits':
                    section.innerHTML = this.createTraitsHTML(result);
                    break;
                case 'ancestry':
                    section.innerHTML = this.createAncestryHTML(result);
                    break;
                case 'health':
                    section.innerHTML = this.createHealthHTML(result);
                    break;
            }

            resultsContainer.appendChild(section);
        });
    },

    createMutationsHTML(result) {
        return `
            <h3>Genetic Mutations</h3>
            <div class="mutations-list">
                ${result.findings.map(mutation => `
                    <div class="mutation-item">
                        <span>Position: ${mutation.position}</span>
                        <span>Type: ${mutation.mutation}</span>
                        <span>Change: ${mutation.reference} → ${mutation.variant}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    createTraitsHTML(result) {
        return `
            <h3>Predicted Traits</h3>
            <div class="traits-list">
                ${result.predictions.map(trait => `
                    <div class="trait-item">
                        <span>${trait.trait}</span>
                        <span>${trait.prediction}</span>
                        <div class="confidence-bar" style="width: ${trait.confidence * 100}%"></div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    createAncestryHTML(result) {
        return `
            <h3>Ancestry Composition</h3>
            <div class="ancestry-chart">
                ${result.composition.map(region => `
                    <div class="ancestry-bar">
                        <div class="ancestry-fill" style="width: ${region.percentage}%"></div>
                        <span>${region.region}: ${region.percentage}%</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    createHealthHTML(result) {
        return `
            <h3>Health Risk Assessment</h3>
            <div class="health-risks">
                ${result.risks.map(risk => `
                    <div class="risk-item ${risk.risk.toLowerCase()}">
                        <span>${risk.condition}</span>
                        <span class="risk-level">${risk.risk}</span>
                        <div class="risk-bar" style="width: ${risk.score * 100}%"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// Initialize the module when the page loads
document.addEventListener('DOMContentLoaded', () => geneticTestingModule.init());