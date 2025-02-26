/**
 * DNAnalyzer - Analyzer Page JavaScript
 * Handles all DNA analysis functionality, file handling, and result visualization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initializeUI();
    
    // Check API status
    checkAPIStatus();
    
    // Initialize genetic testing tab
    initGeneticTesting();
    
    // Initialize batch processing tab
    initBatchProcessing();
});

/**
 * Initialize all UI components and event listeners
 */
function initializeUI() {
    // Initialize file upload functionality
    initFileUpload();
    
    // Initialize tabs
    initTabs();
    
    // Initialize modals
    initModals();
    
    // Initialize analyze button
    document.getElementById('analyzeBtn').addEventListener('click', handleAnalysis);
    
    // Initialize quick action buttons
    document.getElementById('importSampleBtn').addEventListener('click', importSample);
    document.getElementById('clearOptionsBtn').addEventListener('click', clearOptions);
    document.getElementById('helpBtn').addEventListener('click', showHelpModal);
}

/**
 * Initialize file upload area with drag and drop functionality
 */
function initFileUpload() {
    const dropZone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('fileInput');
    
    // Handle click on drop zone
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection via input
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileSelection(e.target.files[0]);
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
            handleFileSelection(e.dataTransfer.files[0]);
        }
    });
}

/**
 * Handle the selected file and update UI
 * @param {File} file - The selected file
 */
function handleFileSelection(file) {
    // Check if file type is supported
    const validExtensions = ['.fa', '.fasta', '.fastq', '.txt'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!isValid) {
        showNotification('Unsupported file format. Please upload a FASTA, FASTQ, or TXT file.', 'error');
        return;
    }
    
    // Store file in global state for later use
    window.selectedFile = file;
    
    // Update UI with file info
    const dropZone = document.getElementById('fileDropZone');
    dropZone.innerHTML = `
        <div class="file-preview">
            <i class="fas fa-file-alt file-icon"></i>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${formatFileSize(file.size)}</div>
            </div>
            <button class="file-remove" id="removeFileBtn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add event listener to remove button
    document.getElementById('removeFileBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        resetFileUpload();
    });
    
    // Enable analyze button
    document.getElementById('analyzeBtn').disabled = false;
    
    showNotification(`File "${file.name}" ready for analysis.`, 'success');
}

/**
 * Reset the file upload area to its initial state
 */
function resetFileUpload() {
    const dropZone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('fileInput');
    
    // Clear the file input
    fileInput.value = '';
    
    // Reset global state
    window.selectedFile = null;
    
    // Reset UI
    dropZone.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <h3>Upload DNA Sequence</h3>
        <p>Drag and drop your sequence file here or click to browse</p>
        <span class="upload-formats">Supported formats: .fa, .fasta, .fastq, .txt</span>
    `;
    
    // Disable analyze button
    document.getElementById('analyzeBtn').disabled = true;
}

/**
 * Initialize tab functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Initialize drag and drop functionality for genetic testing and batch processing tabs
            if (tabId === 'genetic-testing') {
                initGeneticTestingDropzone();
            } else if (tabId === 'batch-processing') {
                initBatchProcessingDropzone();
            }
        });
    });
}

/**
 * Initialize modal functionality
 */
function initModals() {
    // Export modal
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    
    if (exportModal && closeExportModal) {
        document.getElementById('exportBtn').addEventListener('click', function() {
            exportModal.classList.add('active');
        });
        
        closeExportModal.addEventListener('click', function() {
            exportModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        exportModal.addEventListener('click', function(e) {
            if (e.target === exportModal) {
                exportModal.classList.remove('active');
            }
        });
        
        // Handle export format selection
        document.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', function() {
                const format = this.getAttribute('data-format');
                downloadResults(format);
                exportModal.classList.remove('active');
            });
        });
    }
    
    // Help modal
    const helpModal = document.getElementById('helpModal');
    const closeHelpModal = document.getElementById('closeHelpModal');
    
    if (helpModal && closeHelpModal) {
        closeHelpModal.addEventListener('click', function() {
            helpModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        helpModal.addEventListener('click', function(e) {
            if (e.target === helpModal) {
                helpModal.classList.remove('active');
            }
        });
    }
}

/**
 * Show the help modal
 */
function showHelpModal() {
    const helpModal = document.getElementById('helpModal');
    if (helpModal) {
        helpModal.classList.add('active');
    }
}

/**
 * Import a sample DNA file for demonstration
 */
function importSample() {
    // Create a mock file from a predefined DNA sequence
    const sampleDNA = '>Sample DNA Sequence\nATGGCCTAGCTAGCTGATCGATCGATCGATCGATCGATCGATCGATCGATCGACTGATCTAGCATCGATCGATCGAATCGCTAGCTAGCATCGATCGATCGATCGATCGACTAGCTAGCTATCAGCTAGCTAGCTAGCTAGCTCGATCGATCGATCGATCGATCGACTAGCTAGCAGACTAGCTAGCATCATCGACTAGCTGATGATGGATTAGCATCGATCGATAGCTACGAT';
    
    const blob = new Blob([sampleDNA], { type: 'text/plain' });
    const file = new File([blob], 'sample_dna.fa', { type: 'text/plain' });
    
    // Process the sample file
    handleFileSelection(file);
}

/**
 * Reset all analysis options to default
 */
function clearOptions() {
    document.querySelectorAll('input[name="analysis-option"]').forEach(checkbox => {
        // Set default checkboxes (first 5) to checked, others to unchecked
        const isDefault = ['sequence-length', 'gc-content', 'base-composition', 'start-codons', 'stop-codons'].includes(checkbox.value);
        checkbox.checked = isDefault;
    });
    
    showNotification('Analysis options reset to default.', 'success');
}

/**
 * Check API connectivity status
 */
function checkAPIStatus() {
    const apiStatus = document.getElementById('apiStatus');
    
    if (!apiStatus) return;
    
    // Check if API client is available
    if (typeof DNAnalyzerAPI === 'undefined') {
        apiStatus.innerHTML = `
            <div class="status-indicator">
                <div class="status-dot offline"></div>
                <span>API not available</span>
            </div>
        `;
        return;
    }
    
    // Try to connect to the API
    DNAnalyzerAPI.checkStatus()
        .then(status => {
            console.log('API Status:', status);
            apiStatus.innerHTML = `
                <div class="status-indicator">
                    <div class="status-dot online"></div>
                    <span>API Connected v${status.version || '1.0'}</span>
                </div>
            `;
        })
        .catch(error => {
            console.error('API Error:', error);
            apiStatus.innerHTML = `
                <div class="status-indicator">
                    <div class="status-dot offline"></div>
                    <span>API Offline - Using Fallback Mode</span>
                </div>
            `;
        });
}

/**
 * Handle the DNA analysis process
 */
function handleAnalysis() {
    if (!window.selectedFile) {
        showNotification('Please upload a DNA sequence file first.', 'error');
        return;
    }
    
    // Get selected analysis options
    const options = getSelectedOptions();
    
    // Show loading state
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analyzing...';
    
    // Show results section with loading state
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    
    const resultsContent = document.getElementById('resultsContent');
    resultsContent.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Analyzing DNA sequence...</p>
        </div>
    `;
    
    // Update file info in results header
    document.getElementById('resultsFileInfo').innerHTML = `
        <i class="fas fa-file-alt"></i>
        <span>${window.selectedFile.name}</span>
    `;
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Try using API if available, otherwise use fallback
    if (typeof DNAnalyzerAPI !== 'undefined') {
        try {
            performAPIAnalysis(window.selectedFile, options);
        } catch (error) {
            console.error('API Error:', error);
            performFallbackAnalysis(window.selectedFile, options);
        }
    } else {
        performFallbackAnalysis(window.selectedFile, options);
    }
}

/**
 * Perform analysis using the API
 * @param {File} file - The file to analyze
 * @param {Object} options - Analysis options
 */
function performAPIAnalysis(file, options) {
    // First try to analyze via API
    DNAnalyzerAPI.analyzeDNA(file, options)
        .then(results => {
            displayResults(results);
            
            // Add to history
            addToHistory(file.name);
            
            // Reset button
            const analyzeBtn = document.getElementById('analyzeBtn');
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-play"></i> Start Analysis';
            
            showNotification('Analysis completed successfully!', 'success');
        })
        .catch(error => {
            console.error('API Analysis Error:', error);
            // Fallback to local analysis
            performFallbackAnalysis(file, options);
        });
}

/**
 * Perform analysis using local fallback method
 * @param {File} file - The file to analyze
 * @param {Object} options - Analysis options
 */
function performFallbackAnalysis(file, options) {
    // Read the file content
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const sequence = parseFastaSequence(e.target.result);
        
        // Perform basic sequence analysis
        const results = analyzeSequence(sequence, options);
        
        // Display results
        displayResults(results);
        
        // Add to history
        addToHistory(file.name);
        
        // Reset button
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-play"></i> Start Analysis';
        
        showNotification('Analysis completed using fallback mode.', 'success');
    };
    
    reader.onerror = function() {
        showNotification('Failed to read file. Please try again.', 'error');
        
        // Reset button
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-play"></i> Start Analysis';
    };
    
    reader.readAsText(file);
}

/**
 * Parse FASTA format sequence
 * @param {string} fastaData - Raw FASTA file content
 * @returns {string} - Cleaned DNA sequence
 */
function parseFastaSequence(fastaData) {
    // Split by lines
    const lines = fastaData.split(/\r?\n/);
    
    // Skip header lines (starting with '>') and join the rest
    let sequence = '';
    let foundHeader = false;
    
    for (let line of lines) {
        line = line.trim();
        
        if (line.startsWith('>')) {
            foundHeader = true;
            continue;
        }
        
        if (line.length > 0) {
            sequence += line;
        }
    }
    
    // If no header was found, assume the entire content is the sequence
    if (!foundHeader && sequence === '') {
        sequence = fastaData.replace(/\s+/g, '');
    }
    
    return sequence.toUpperCase();
}

/**
 * Analyze DNA sequence
 * @param {string} sequence - DNA sequence
 * @param {Object} options - Analysis options
 * @returns {Object} - Analysis results
 */
function analyzeSequence(sequence, options) {
    const results = {
        sequence: {
            length: sequence.length,
            sample: sequence.substring(0, 100) + (sequence.length > 100 ? '...' : '')
        },
        basePairs: analyzeBasePairs(sequence),
        options: options
    };
    
    // Codon analysis if selected
    if (options.includes('start-codons') || options.includes('stop-codons')) {
        results.codons = analyzeCodonFrequency(sequence);
    }
    
    // Reading frames if selected
    if (options.includes('reading-frames')) {
        results.readingFrames = analyzeReadingFrames(sequence);
    }
    
    // Protein prediction if selected
    if (options.includes('protein-prediction')) {
        results.proteins = findPotentialProteins(sequence);
    }
    
    return results;
}

/**
 * Analyze base pair composition
 * @param {string} sequence - DNA sequence
 * @returns {Object} - Base pair analysis results
 */
function analyzeBasePairs(sequence) {
    const counts = {
        A: 0,
        T: 0,
        G: 0,
        C: 0,
        other: 0
    };
    
    // Count occurrences of each base
    for (let i = 0; i < sequence.length; i++) {
        const base = sequence[i];
        if (counts.hasOwnProperty(base)) {
            counts[base]++;
        } else {
            counts.other++;
        }
    }
    
    // Calculate percentages
    const total = sequence.length;
    const percentages = {};
    
    for (const base in counts) {
        percentages[base] = parseFloat(((counts[base] / total) * 100).toFixed(1));
    }
    
    // Calculate GC content
    const gcContent = parseFloat(((counts.G + counts.C) / total * 100).toFixed(1));
    
    return {
        counts,
        percentages,
        gcContent
    };
}

/**
 * Analyze codon frequency
 * @param {string} sequence - DNA sequence
 * @returns {Object} - Codon analysis results
 */
function analyzeCodonFrequency(sequence) {
    const startCodon = 'ATG';
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    
    let startCount = 0;
    let stopCount = 0;
    
    // Analyze each possible codon position
    for (let i = 0; i < sequence.length - 2; i++) {
        const codon = sequence.substring(i, i + 3);
        
        if (codon === startCodon) {
            startCount++;
        }
        
        if (stopCodons.includes(codon)) {
            stopCount++;
        }
    }
    
    return {
        startCodons: startCount,
        stopCodons: stopCount
    };
}

/**
 * Analyze reading frames
 * @param {string} sequence - DNA sequence
 * @returns {Object} - Reading frames analysis
 */
function analyzeReadingFrames(sequence) {
    const frames = [];
    const startCodon = 'ATG';
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    
    // Analyze each of the three forward reading frames
    for (let offset = 0; offset < 3; offset++) {
        const frame = {
            frame: offset + 1,
            direction: 'forward',
            genes: []
        };
        
        let inGene = false;
        let geneStart = 0;
        
        for (let i = offset; i < sequence.length - 2; i += 3) {
            const codon = sequence.substring(i, i + 3);
            
            if (codon === startCodon && !inGene) {
                inGene = true;
                geneStart = i;
            } else if (stopCodons.includes(codon) && inGene) {
                inGene = false;
                const gene = {
                    start: geneStart,
                    end: i + 2,
                    length: i + 3 - geneStart
                };
                frame.genes.push(gene);
            }
        }
        
        frames.push(frame);
    }
    
    // Get the reverse complement sequence
    const reverseComplement = getReverseComplement(sequence);
    
    // Analyze each of the three reverse reading frames
    for (let offset = 0; offset < 3; offset++) {
        const frame = {
            frame: offset + 4,
            direction: 'reverse',
            genes: []
        };
        
        let inGene = false;
        let geneStart = 0;
        
        for (let i = offset; i < reverseComplement.length - 2; i += 3) {
            const codon = reverseComplement.substring(i, i + 3);
            
            if (codon === startCodon && !inGene) {
                inGene = true;
                geneStart = i;
            } else if (stopCodons.includes(codon) && inGene) {
                inGene = false;
                const gene = {
                    start: i + 2,
                    end: geneStart,
                    length: i + 3 - geneStart
                };
                frame.genes.push(gene);
            }
        }
        
        frames.push(frame);
    }
    
    return {
        frames: frames,
        totalGenes: frames.reduce((total, frame) => total + frame.genes.length, 0)
    };
}

/**
 * Get reverse complement of DNA sequence
 * @param {string} sequence - DNA sequence
 * @returns {string} - Reverse complement
 */
function getReverseComplement(sequence) {
    const complementMap = {
        'A': 'T',
        'T': 'A',
        'G': 'C',
        'C': 'G',
        'N': 'N'
    };
    
    let reverseComplement = '';
    
    for (let i = sequence.length - 1; i >= 0; i--) {
        const base = sequence[i];
        reverseComplement += complementMap[base] || base;
    }
    
    return reverseComplement;
}

/**
 * Find potential proteins in DNA sequence
 * @param {string} sequence - DNA sequence
 * @returns {Array} - List of potential proteins
 */
function findPotentialProteins(sequence) {
    const startCodon = 'ATG';
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    const proteins = [];
    
    // Genetic code for translation
    const geneticCode = {
        'TTT': 'F', 'TTC': 'F', 'TTA': 'L', 'TTG': 'L',
        'CTT': 'L', 'CTC': 'L', 'CTA': 'L', 'CTG': 'L',
        'ATT': 'I', 'ATC': 'I', 'ATA': 'I', 'ATG': 'M',
        'GTT': 'V', 'GTC': 'V', 'GTA': 'V', 'GTG': 'V',
        'TCT': 'S', 'TCC': 'S', 'TCA': 'S', 'TCG': 'S',
        'CCT': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
        'ACT': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
        'GCT': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
        'TAT': 'Y', 'TAC': 'Y', 'TAA': '*', 'TAG': '*',
        'CAT': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
        'AAT': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
        'GAT': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
        'TGT': 'C', 'TGC': 'C', 'TGA': '*', 'TGG': 'W',
        'CGT': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
        'AGT': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
        'GGT': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
    };
    
    // Search for proteins in all three reading frames
    for (let offset = 0; offset < 3; offset++) {
        let i = offset;
        
        while (i < sequence.length - 2) {
            const codon = sequence.substring(i, i + 3);
            
            // If we find a start codon, begin translating
            if (codon === startCodon) {
                let proteinStart = i;
                let protein = 'M'; // Start with methionine
                let j = i + 3;
                
                // Continue until stop codon or end of sequence
                while (j < sequence.length - 2) {
                    const nextCodon = sequence.substring(j, j + 3);
                    
                    // Check if it's a stop codon
                    if (stopCodons.includes(nextCodon)) {
                        // We found a complete protein
                        if (protein.length >= 10) { // Only include proteins of significant length
                            proteins.push({
                                start: proteinStart,
                                end: j + 2,
                                length: protein.length,
                                sequence: protein
                            });
                        }
                        
                        // Move past this protein
                        i = j + 3;
                        break;
                    }
                    
                    // Add amino acid to protein
                    const aa = geneticCode[nextCodon] || 'X'; // X for unknown
                    protein += aa;
                    
                    j += 3;
                }
                
                // If we reached the end without finding a stop codon
                if (j >= sequence.length - 2) {
                    i = j;
                }
            } else {
                i += 3;
            }
        }
    }
    
    // Sort by length (longest first)
    proteins.sort((a, b) => b.length - a.length);
    
    // Limit to top 10
    return proteins.slice(0, 10);
}

/**
 * Display analysis results
 * @param {Object} results - Analysis results
 */
function displayResults(results) {
    const resultsContent = document.getElementById('resultsContent');
    const options = results.options;
    
    // Basic results grid
    let html = '<div class="results-grid">';
    
    // Sequence length
    if (options.includes('sequence-length')) {
        html += `
            <div class="result-card">
                <div class="result-value">${results.sequence.length.toLocaleString()}</div>
                <div class="result-label">Sequence Length</div>
            </div>
        `;
    }
    
    // GC content
    if (options.includes('gc-content')) {
        html += `
            <div class="result-card">
                <div class="result-value">${results.basePairs.gcContent}%</div>
                <div class="result-label">GC Content</div>
            </div>
        `;
    }
    
    // Start and stop codons
    if (options.includes('start-codons') && results.codons) {
        html += `
            <div class="result-card">
                <div class="result-value">${results.codons.startCodons}</div>
                <div class="result-label">Start Codons</div>
            </div>
        `;
    }
    
    if (options.includes('stop-codons') && results.codons) {
        html += `
            <div class="result-card">
                <div class="result-value">${results.codons.stopCodons}</div>
                <div class="result-label">Stop Codons</div>
            </div>
        `;
    }
    
    // Reading frames
    if (options.includes('reading-frames') && results.readingFrames) {
        html += `
            <div class="result-card">
                <div class="result-value">${results.readingFrames.totalGenes}</div>
                <div class="result-label">Potential Genes</div>
            </div>
        `;
    }
    
    // Protein prediction
    if (options.includes('protein-prediction') && results.proteins) {
        html += `
            <div class="result-card">
                <div class="result-value">${results.proteins.length}</div>
                <div class="result-label">Proteins Found</div>
            </div>
        `;
        
        // Add longest protein info if available
        if (results.proteins.length > 0) {
            html += `
                <div class="result-card">
                    <div class="result-value">${results.proteins[0].length}</div>
                    <div class="result-label">Longest Protein (aa)</div>
                </div>
            `;
        }
    }
    
    html += '</div>'; // End of results grid
    
    // Base composition chart
    if (options.includes('base-composition')) {
        const basePercentages = results.basePairs.percentages;
        
        html += `
            <div class="chart-container">
                <h3>Base Composition</h3>
                <div class="base-composition">
                    <div class="base-bar">
                        <div class="base-segment base-a" style="width: ${basePercentages.A}%">A</div>
                        <div class="base-segment base-t" style="width: ${basePercentages.T}%">T</div>
                        <div class="base-segment base-g" style="width: ${basePercentages.G}%">G</div>
                        <div class="base-segment base-c" style="width: ${basePercentages.C}%">C</div>
                        ${basePercentages.other > 0 ? `<div class="base-segment" style="width: ${basePercentages.other}%">N</div>` : ''}
                    </div>
                </div>
                <div class="base-legend">
                    <div class="legend-item">
                        <div class="color-box base-a"></div>
                        <span>Adenine (A): ${basePercentages.A}%</span>
                    </div>
                    <div class="legend-item">
                        <div class="color-box base-t"></div>
                        <span>Thymine (T): ${basePercentages.T}%</span>
                    </div>
                    <div class="legend-item">
                        <div class="color-box base-g"></div>
                        <span>Guanine (G): ${basePercentages.G}%</span>
                    </div>
                    <div class="legend-item">
                        <div class="color-box base-c"></div>
                        <span>Cytosine (C): ${basePercentages.C}%</span>
                    </div>
                    ${basePercentages.other > 0 ? `
                        <div class="legend-item">
                            <div class="color-box" style="background: #888;"></div>
                            <span>Other (N): ${basePercentages.other}%</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Reading frames table
    if (options.includes('reading-frames') && results.readingFrames && results.readingFrames.frames) {
        html += `
            <div class="results-table-container">
                <h3>Reading Frames</h3>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Frame</th>
                            <th>Direction</th>
                            <th>Genes Found</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        results.readingFrames.frames.forEach(frame => {
            html += `
                <tr>
                    <td>${frame.frame}</td>
                    <td>${frame.direction}</td>
                    <td>${frame.genes.length}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Proteins table
    if (options.includes('protein-prediction') && results.proteins && results.proteins.length > 0) {
        html += `
            <div class="results-table-container">
                <h3>Predicted Proteins</h3>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Length</th>
                            <th>Sequence (First 30 aa)</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        results.proteins.forEach((protein, index) => {
            const proteinSeq = protein.sequence || protein;
            const displaySeq = proteinSeq.substring(0, 30) + (proteinSeq.length > 30 ? '...' : '');
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${protein.length || proteinSeq.length}</td>
                    <td class="sequence-cell">${displaySeq}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Download options
    html += `
        <div class="download-options">
            <h3>Download Results</h3>
            <div class="download-formats">
                <button class="download-format" data-format="json">
                    <i class="fas fa-file-code"></i>
                    JSON
                </button>
                <button class="download-format" data-format="csv">
                    <i class="fas fa-file-csv"></i>
                    CSV
                </button>
                <button class="download-format" data-format="txt">
                    <i class="fas fa-file-alt"></i>
                    Text
                </button>
            </div>
        </div>
    `;
    
    // Update the results content
    resultsContent.innerHTML = html;
    
    // Add event listeners to download buttons
    document.querySelectorAll('.download-format').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.getAttribute('data-format');
            downloadResults(format, results);
        });
    });
    
    // Store results for later use
    window.analysisResults = results;
}

/**
 * Download analysis results
 * @param {string} format - File format (json, csv, txt)
 * @param {Object} results - Analysis results
 */
function downloadResults(format, results = window.analysisResults) {
    if (!results) {
        showNotification('No analysis results to download.', 'error');
        return;
    }
    
    let content = '';
    let fileName = `dna_analysis_${new Date().toISOString().slice(0, 10)}`;
    let mimeType = 'text/plain';
    
    if (format === 'json') {
        content = JSON.stringify(results, null, 2);
        fileName += '.json';
        mimeType = 'application/json';
    } else if (format === 'csv') {
        // Basic info
        content = 'Property,Value\n';
        content += `Sequence Length,${results.sequence.length}\n`;
        content += `GC Content,${results.basePairs.gcContent}%\n\n`;
        
        // Base pairs
        content += 'Base,Count,Percentage\n';
        for (const base in results.basePairs.counts) {
            content += `${base},${results.basePairs.counts[base]},${results.basePairs.percentages[base]}%\n`;
        }
        content += '\n';
        
        // Add codon info if available
        if (results.codons) {
            content += 'Codon Type,Count\n';
            content += `Start Codons,${results.codons.startCodons}\n`;
            content += `Stop Codons,${results.codons.stopCodons}\n\n`;
        }
        
        // Add reading frames if available
        if (results.readingFrames && results.readingFrames.frames) {
            content += 'Frame,Direction,Genes Found\n';
            results.readingFrames.frames.forEach(frame => {
                content += `${frame.frame},${frame.direction},${frame.genes.length}\n`;
            });
            content += '\n';
        }
        
        // Add proteins if available
        if (results.proteins && results.proteins.length > 0) {
            content += 'Protein,Length,Sequence\n';
            results.proteins.forEach((protein, index) => {
                const proteinSeq = protein.sequence || protein;
                content += `${index + 1},${protein.length || proteinSeq.length},"${proteinSeq}"\n`;
            });
        }
        
        fileName += '.csv';
        mimeType = 'text/csv';
    } else { // txt format
        content = 'DNA Sequence Analysis Results\n';
        content += '============================\n\n';
        
        // Basic info
        content += `Sequence Length: ${results.sequence.length}\n`;
        content += `GC Content: ${results.basePairs.gcContent}%\n\n`;
        
        // Base composition
        content += 'Base Composition:\n';
        for (const base in results.basePairs.counts) {
            content += `${base}: ${results.basePairs.counts[base]} (${results.basePairs.percentages[base]}%)\n`;
        }
        content += '\n';
        
        // Add codon info if available
        if (results.codons) {
            content += 'Codon Analysis:\n';
            content += `Start Codons (ATG): ${results.codons.startCodons}\n`;
            content += `Stop Codons (TAA, TAG, TGA): ${results.codons.stopCodons}\n\n`;
        }
        
        // Add reading frames if available
        if (results.readingFrames && results.readingFrames.frames) {
            content += 'Reading Frames:\n';
            results.readingFrames.frames.forEach(frame => {
                content += `Frame ${frame.frame} (${frame.direction}): ${frame.genes.length} genes found\n`;
            });
            content += '\n';
        }
        
        // Add proteins if available
        if (results.proteins && results.proteins.length > 0) {
            content += 'Predicted Proteins:\n';
            results.proteins.forEach((protein, index) => {
                const proteinSeq = protein.sequence || protein;
                content += `Protein ${index + 1} (${protein.length || proteinSeq.length} aa): ${proteinSeq}\n`;
            });
        }
        
        content += '\nAnalysis Date: ' + new Date().toLocaleString();
        fileName += '.txt';
    }
    
    // Create download link
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    
    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    showNotification(`Results saved as ${fileName}`, 'success');
}

/**
 * Add an analysis to the history
 * @param {string} fileName - Name of the analyzed file
 */
function addToHistory(fileName) {
    const historyList = document.getElementById('historyList');
    
    // Remove empty state if present
    const emptyState = historyList.querySelector('.history-empty');
    if (emptyState) {
        historyList.removeChild(emptyState);
    }
    
    // Create new history item
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    historyItem.innerHTML = `
        <i class="fas fa-file-alt"></i>
        <div class="history-details">
            <div class="history-name">${fileName}</div>
            <div class="history-time">${timeString}</div>
        </div>
    `;
    
    // Add to history (prepend)
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    // Limit to 5 items
    const items = historyList.querySelectorAll('.history-item');
    if (items.length > 5) {
        historyList.removeChild(items[items.length - 1]);
    }
}

/**
 * Get selected analysis options
 * @returns {Array} - List of selected option values
 */
function getSelectedOptions() {
    const checkboxes = document.querySelectorAll('input[name="analysis-option"]:checked');
    const options = [];
    
    checkboxes.forEach(checkbox => {
        options.push(checkbox.value);
    });
    
    return options;
}

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
function formatFileSize(bytes) {
    if (bytes < 1024) {
        return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' KB';
    } else {
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
}

/**
 * Show a notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notificationContainer');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'times-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon} notification-icon"></i>
        <div class="notification-message">${message}</div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

/**
 * Initialize Genetic Testing Tab
 */
function initGeneticTesting() {
    const geneticFileInput = document.getElementById('geneticFileInput');
    const geneticAnalyzeBtn = document.getElementById('geneticAnalyzeBtn');
    const import23andmeBtn = document.getElementById('import23andme');
    const importAncestryBtn = document.getElementById('importAncestryDNA');
    const geneticTestingUpload = document.querySelector('.genetic-testing-upload');
    
    // File input change event
    if (geneticFileInput) {
        geneticFileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleGeneticFileSelection(e.target.files[0]);
            }
        });
    }
    
    // Analyze button click event
    if (geneticAnalyzeBtn) {
        geneticAnalyzeBtn.addEventListener('click', handleGeneticAnalysis);
    }
    
    // Sample data import
    if (import23andmeBtn) {
        import23andmeBtn.addEventListener('click', () => importSampleData('23andme'));
    }
    
    if (importAncestryBtn) {
        importAncestryBtn.addEventListener('click', () => importSampleData('ancestrydna'));
    }
    
    // Initialize dropzone
    initGeneticTestingDropzone();
}

/**
 * Initialize drag and drop functionality for genetic testing
 */
function initGeneticTestingDropzone() {
    const geneticTestingUpload = document.querySelector('.genetic-testing-upload');
    const geneticFileInput = document.getElementById('geneticFileInput');
    
    if (!geneticTestingUpload || !geneticFileInput) return;
    
    // Handle click on upload area
    geneticTestingUpload.addEventListener('click', function() {
        geneticFileInput.click();
    });
    
    // Handle drag and drop events
    geneticTestingUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        geneticTestingUpload.classList.add('drag-over');
    });
    
    geneticTestingUpload.addEventListener('dragleave', function() {
        geneticTestingUpload.classList.remove('drag-over');
    });
    
    geneticTestingUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        geneticTestingUpload.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handleGeneticFileSelection(e.dataTransfer.files[0]);
        }
    });
}

/**
 * Initialize Batch Processing Tab
 */
function initBatchProcessing() {
    const batchFileInput = document.getElementById('batchFileInput');
    const batchProcessBtn = document.getElementById('batchProcessBtn');
    
    // File input change event
    if (batchFileInput) {
        batchFileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleBatchFileSelection(e.target.files);
            }
        });
    }
    
    // Analyze button click event
    if (batchProcessBtn) {
        batchProcessBtn.addEventListener('click', handleBatchProcessing);
    }
    
    // Initialize dropzone
    initBatchProcessingDropzone();
}

/**
 * Initialize drag and drop functionality for batch processing
 */
function initBatchProcessingDropzone() {
    const batchUpload = document.querySelector('.batch-upload');
    const batchFileInput = document.getElementById('batchFileInput');
    
    if (!batchUpload || !batchFileInput) return;
    
    // Handle click on upload area
    batchUpload.addEventListener('click', function() {
        batchFileInput.click();
    });
    
    // Handle drag and drop events
    batchUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        batchUpload.classList.add('drag-over');
    });
    
    batchUpload.addEventListener('dragleave', function() {
        batchUpload.classList.remove('drag-over');
    });
    
    batchUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        batchUpload.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handleBatchFileSelection(e.dataTransfer.files);
        }
    });
}

/**
 * Handle genetic file selection
 * @param {File} file - The selected file
 */
function handleGeneticFileSelection(file) {
    // Check if file type is supported
    const validExtensions = ['.txt', '.csv'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!isValid) {
        showNotification('Unsupported file format. Please upload a TXT or CSV file.', 'error');
        return;
    }
    
    // Store file in global state
    window.selectedGeneticFile = file;
    
    // Update UI
    const uploadArea = document.querySelector('.genetic-testing-upload');
    uploadArea.innerHTML = `
        <div class="file-preview">
            <i class="fas fa-file-alt file-icon"></i>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${formatFileSize(file.size)}</div>
            </div>
            <button class="file-remove" id="removeGeneticFileBtn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add event listener to remove button
    document.getElementById('removeGeneticFileBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        resetGeneticFileUpload();
    });
    
    // Enable analyze button
    document.getElementById('geneticAnalyzeBtn').disabled = false;
    
    showNotification(`File "${file.name}" ready for genetic analysis.`, 'success');
}

/**
 * Reset genetic file upload area
 */
function resetGeneticFileUpload() {
    const uploadArea = document.querySelector('.genetic-testing-upload');
    const fileInput = document.getElementById('geneticFileInput');
    
    // Clear the file input
    fileInput.value = '';
    
    // Reset global state
    window.selectedGeneticFile = null;
    
    // Reset UI
    uploadArea.innerHTML = `
        <i class="fas fa-dna"></i>
        <h3>Upload Genetic Testing Data</h3>
        <p>Upload your genetic testing data file (e.g., from 23andMe, AncestryDNA)</p>
        <span class="upload-formats">Supported formats: .txt, .csv</span>
        <div class="sample-data-options">
            <button id="import23andme" class="sample-btn">Import 23andMe Sample</button>
            <button id="importAncestryDNA" class="sample-btn">Import AncestryDNA Sample</button>
        </div>
    `;
    
    // Re-add event listeners to sample buttons
    document.getElementById('import23andme').addEventListener('click', () => importSampleData('23andme'));
    document.getElementById('importAncestryDNA').addEventListener('click', () => importSampleData('ancestrydna'));
    
    // Disable analyze button
    document.getElementById('geneticAnalyzeBtn').disabled = true;
}

/**
 * Handle batch file selection
 * @param {FileList} files - The selected files
 */
function handleBatchFileSelection(files) {
    // Store files in global state
    window.selectedBatchFiles = files;
    
    // Update UI
    const uploadArea = document.querySelector('.batch-upload');
    
    let fileList = '';
    for (let i = 0; i < Math.min(files.length, 5); i++) {
        fileList += `<div class="file-name">${files[i].name} (${formatFileSize(files[i].size)})</div>`;
    }
    
    if (files.length > 5) {
        fileList += `<div class="file-name">...and ${files.length - 5} more files</div>`;
    }
    
    uploadArea.innerHTML = `
        <div class="file-preview">
            <i class="fas fa-file-alt file-icon"></i>
            <div class="file-info">
                <div class="file-count">${files.length} files selected</div>
                ${fileList}
            </div>
            <button class="file-remove" id="removeBatchFilesBtn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add event listener to remove button
    document.getElementById('removeBatchFilesBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        resetBatchFileUpload();
    });
    
    // Enable process button
    document.getElementById('batchProcessBtn').disabled = false;
    
    showNotification(`${files.length} files selected for batch processing.`, 'success');
}

/**
 * Reset batch file upload area
 */
function resetBatchFileUpload() {
    const uploadArea = document.querySelector('.batch-upload');
    const fileInput = document.getElementById('batchFileInput');
    
    // Clear the file input
    fileInput.value = '';
    
    // Reset global state
    window.selectedBatchFiles = null;
    
    // Reset UI
    uploadArea.innerHTML = `
        <i class="fas fa-file-upload"></i>
        <h3>Upload Multiple DNA Sequence Files</h3>
        <p>Drag and drop multiple sequence files here or click to browse</p>
        <span class="upload-formats">Supported formats: .fa, .fasta, .fastq, .txt</span>
    `;
    
    // Disable process button
    document.getElementById('batchProcessBtn').disabled = true;
}

/**
 * Handle genetic analysis
 */
function handleGeneticAnalysis() {
    if (!window.selectedGeneticFile) {
        showNotification('Please upload a genetic data file first.', 'error');
        return;
    }
    
    const options = getSelectedGeneticOptions();
    
    // Show loading state