/**
 * DNAnalyzer Web Interface
 * Connects the web UI with the DNAnalyzer API
 */

// Check if API is available on load
document.addEventListener('DOMContentLoaded', async function() {
    // Load the API client
    if (!window.DNAnalyzerAPI) {
        const script = document.createElement('script');
        script.src = '../assets/js/api-client.js';
        document.head.appendChild(script);
        
        // Wait for script to load
        await new Promise(resolve => {
            script.onload = resolve;
        });
    }

    // Initialize API status check
    initializeApiStatus();
    
    // Initialize the UI elements
    initializeUI();
});

/**
 * Check API connectivity and update UI accordingly
 */
async function initializeApiStatus() {
    const statusElement = document.createElement('div');
    statusElement.className = 'api-status';
    statusElement.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Connecting to API...';
    document.querySelector('.analysis-main').appendChild(statusElement);
    
    try {
        // Try to connect to the API
        const status = await DNAnalyzerAPI.checkStatus();
        console.log('API Status:', status);
        
        statusElement.className = 'api-status api-online';
        statusElement.innerHTML = `<i class="fas fa-check-circle"></i> API v${status.version} Connected`;
        
        // Enable analyze button
        document.querySelector('.analyze-btn').disabled = false;
    } catch (error) {
        console.error('API connection failed:', error);
        
        statusElement.className = 'api-status api-offline';
        statusElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> API Offline - Using Fallback Mode';
        
        // Add notice about limited functionality with more accurate server instructions
        const notice = document.createElement('div');
        notice.className = 'api-notice';
        notice.innerHTML = `
            <p><strong>Note:</strong> The DNAnalyzer API server is not running. Some features will be limited.</p>
            <p>Currently there are compiler errors in the server code. To run the web interface in fallback mode:</p>
            <ol>
                <li>Use the local file analysis options instead of API features</li>
                <li>For simple DNA analysis, the client-side fallback mode will work</li>
                <li>For advanced features, the server needs to be fixed</li>
            </ol>
            <p>For developers: Check the Java CI error log in the GitHub repository for compiler errors that need to be fixed.</p>
            <a href="../server/server.html" class="notice-link">View server documentation</a>
        `;
        document.querySelector('.analysis-main').appendChild(notice);
    }
}

/**
 * Initialize all UI elements and event handlers
 */
function initializeUI() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate selected tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // File drag and drop functionality
    const dropZone = document.querySelector('.file-drop-zone');
    const fileInput = dropZone.querySelector('input[type="file"]');
    let uploadedFile = null;
    
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(e) {
        handleFileSelection(e.target.files);
    });
    
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
        handleFileSelection(e.dataTransfer.files);
    });
    
    function handleFileSelection(files) {
        if (files.length > 0) {
            uploadedFile = files[0];
            
            // Update drop zone to show selected file
            const fileIcon = getFileIcon(uploadedFile.name);
            dropZone.innerHTML = `
                <div class="file-preview">
                    <i class="${fileIcon}"></i>
                    <div class="file-info">
                        <div class="file-name">${uploadedFile.name}</div>
                        <div class="file-size">${formatFileSize(uploadedFile.size)}</div>
                    </div>
                    <button class="remove-file-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p>File ready for analysis</p>
            `;
            
            // Add event listener for remove button
            document.querySelector('.remove-file-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                resetFileUpload();
            });
        }
    }
    
    function resetFileUpload() {
        uploadedFile = null;
        fileInput.value = '';
        
        // Reset drop zone to original state
        dropZone.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Upload DNA Sequence</h3>
            <p>Drag and drop your sequence file here or click to browse</p>
            <input type="file" hidden accept=".fa,.fasta,.fastq">
            <p class="file-info">Supported formats: .fa, .fasta, .fastq</p>
        `;
    }
    
    // Analyze button functionality
    const analyzeBtn = document.querySelector('.analyze-btn');
    
    analyzeBtn.addEventListener('click', async function() {
        if (!uploadedFile) {
            showNotification('Please upload a file first', 'error');
            return;
        }
        
        // Show loading state
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analyzing...';
        
        try {
            // Collect analysis options
            const options = {
                amino: 'M', // Default amino acid
                format: 'json',
                codons: document.querySelector('input[type="checkbox"][value="Start Codons"]').checked || 
                        document.querySelector('input[type="checkbox"][value="Stop Codons"]').checked,
                coverage: document.querySelector('input[type="checkbox"][value="Coverage Analysis"]').checked,
                longest: document.querySelector('input[type="checkbox"][value="Protein Prediction"]').checked
            };
            
            // Read file contents using the API
            const parseResult = await DNAnalyzerAPI.parseFile(uploadedFile);
            
            // Update results section with basic info
            const resultsSection = document.querySelector('.results-section');
            resultsSection.style.display = 'block';
            
            // First, analyze basic info
            let resultsContent = document.querySelector('.results-content');
            resultsContent.innerHTML = '<div class="result-grid loading"><div class="loading-spinner"></div><p>Processing analysis...</p></div>';
            
            // Get base pair composition
            const basePairResult = await DNAnalyzerAPI.analyzeBasePairs(parseResult.sequence);
            
            // Get proteins if needed
            let proteins = [];
            if (options.longest) {
                const proteinResult = await DNAnalyzerAPI.findProteins(parseResult.sequence);
                proteins = proteinResult.proteins || [];
            }
            
            // Get reading frames if needed
            let readingFrames = null;
            if (document.querySelector('input[type="checkbox"][value="Reading Frames"]').checked) {
                const framesResult = await DNAnalyzerAPI.analyzeReadingFrames(parseResult.sequence);
                readingFrames = framesResult;
            }
            
            // Display results
            showAnalysisResults(parseResult, basePairResult, proteins, readingFrames);
            
            // Add to history
            addAnalysisToHistory(uploadedFile.name);
            
            // Show success notification
            showNotification('Analysis completed successfully', 'success');
            
        } catch (error) {
            console.error('Analysis failed:', error);
            showNotification('Analysis failed: ' + error.message, 'error');
        } finally {
            // Reset button state
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-play"></i> Start Analysis';
        }
    });
    
    // Initialize sample import functionality
    document.querySelector('.action-btn:nth-child(1)').addEventListener('click', function() {
        importSampleFile();
    });
}

/**
 * Display analysis results in the results section
 */
function showAnalysisResults(parseResult, basePairResult, proteins = [], readingFrames = null) {
    const resultsContent = document.querySelector('.results-content');
    
    // Build results grid
    let resultHTML = '<div class="result-grid">';
    
    // Basic sequence info
    resultHTML += `
        <div class="result-card">
            <div class="result-value">${parseResult.sequenceLength.toLocaleString()}</div>
            <div class="result-label">Sequence Length</div>
        </div>
        <div class="result-card">
            <div class="result-value">${basePairResult.gcContent}%</div>
            <div class="result-label">GC Content</div>
        </div>
    `;
    
    // Base composition
    if (document.querySelector('input[type="checkbox"][value="Base Composition"]').checked) {
        resultHTML += `
            <div class="result-card wide">
                <div class="result-chart">
                    <div class="base-bar">
                        <div class="base-segment a-base" style="width: ${basePairResult.percentages.A}%">A</div>
                        <div class="base-segment t-base" style="width: ${basePairResult.percentages.T}%">T</div>
                        <div class="base-segment g-base" style="width: ${basePairResult.percentages.G}%">G</div>
                        <div class="base-segment c-base" style="width: ${basePairResult.percentages.C}%">C</div>
                    </div>
                    <div class="base-legend">
                        <div class="legend-item"><span class="color-box a-base"></span>A: ${basePairResult.percentages.A}%</div>
                        <div class="legend-item"><span class="color-box t-base"></span>T: ${basePairResult.percentages.T}%</div>
                        <div class="legend-item"><span class="color-box g-base"></span>G: ${basePairResult.percentages.G}%</div>
                        <div class="legend-item"><span class="color-box c-base"></span>C: ${basePairResult.percentages.C}%</div>
                    </div>
                </div>
                <div class="result-label">Base Composition</div>
            </div>
        `;
    }
    
    // Codon info
    if (document.querySelector('input[type="checkbox"][value="Start Codons"]').checked) {
        // Count ATG codons from sequence
        const countATG = countCodon(parseResult.sequence, 'ATG');
        resultHTML += `
            <div class="result-card">
                <div class="result-value">${countATG}</div>
                <div class="result-label">Start Codons</div>
            </div>
        `;
    }
    
    if (document.querySelector('input[type="checkbox"][value="Stop Codons"]').checked) {
        // Count stop codons from sequence
        const stopCodons = countStopCodons(parseResult.sequence);
        resultHTML += `
            <div class="result-card">
                <div class="result-value">${stopCodons}</div>
                <div class="result-label">Stop Codons</div>
            </div>
        `;
    }
    
    // Protein prediction
    if (document.querySelector('input[type="checkbox"][value="Protein Prediction"]').checked && proteins.length > 0) {
        resultHTML += `
            <div class="result-card">
                <div class="result-value">${proteins.length}</div>
                <div class="result-label">Proteins Found</div>
            </div>
        `;
        
        // Add longest protein info
        if (proteins.length > 0) {
            const longestProtein = proteins.reduce((a, b) => a.length > b.length ? a : b);
            
            resultHTML += `
                <div class="result-card wide">
                    <div class="result-value-small">${longestProtein.length} amino acids</div>
                    <div class="result-label">Longest Protein</div>
                    <div class="sequence-preview">${longestProtein.substring(0, 20)}...</div>
                </div>
            `;
        }
    }
    
    // Reading frames
    if (document.querySelector('input[type="checkbox"][value="Reading Frames"]').checked && readingFrames) {
        // Count total genes found across all frames
        let totalGenes = 0;
        if (readingFrames.frames) {
            readingFrames.frames.forEach(frame => {
                if (frame.genes) {
                    totalGenes += frame.genes.length;
                }
            });
        }
        
        resultHTML += `
            <div class="result-card">
                <div class="result-value">${totalGenes}</div>
                <div class="result-label">Potential Genes</div>
            </div>
            <div class="result-card">
                <div class="result-value">${readingFrames.frameCount || 6}</div>
                <div class="result-label">Reading Frames</div>
            </div>
        `;
    }
    
    resultHTML += '</div>';
    
    // Add detailed section if applicable
    if ((proteins.length > 0 && proteins.length <= 10) || (readingFrames && readingFrames.frames)) {
        resultHTML += '<div class="detailed-results">';
        
        // Add proteins table
        if (proteins.length > 0 && proteins.length <= 10) {
            resultHTML += `
                <div class="result-table-container">
                    <h3>Proteins Found</h3>
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Length</th>
                                <th>Sequence</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            proteins.forEach((protein, index) => {
                resultHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${protein.length}</td>
                        <td class="sequence-cell">${protein.substring(0, 30)}${protein.length > 30 ? '...' : ''}</td>
                    </tr>
                `;
            });
            
            resultHTML += `
                        </tbody>
                    </table>
                </div>
            `;
        }
        
        // Add reading frames table
        if (readingFrames && readingFrames.frames) {
            resultHTML += `
                <div class="result-table-container">
                    <h3>Reading Frames</h3>
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>Frame</th>
                                <th>Direction</th>
                                <th>Genes Found</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            readingFrames.frames.forEach(frame => {
                resultHTML += `
                    <tr>
                        <td>${frame.frame}</td>
                        <td>${frame.direction}</td>
                        <td>${frame.genes ? frame.genes.length : 0}</td>
                    </tr>
                `;
            });
            
            resultHTML += `
                        </tbody>
                    </table>
                </div>
            `;
        }
        
        resultHTML += '</div>';
    }
    
    // Add download options
    resultHTML += `
        <div class="download-options">
            <h3>Download Results</h3>
            <div class="download-buttons">
                <button class="download-btn" data-format="json">
                    <i class="fas fa-file-code"></i>
                    JSON
                </button>
                <button class="download-btn" data-format="csv">
                    <i class="fas fa-file-csv"></i>
                    CSV
                </button>
                <button class="download-btn" data-format="txt">
                    <i class="fas fa-file-alt"></i>
                    Text
                </button>
            </div>
        </div>
    `;
    
    resultsContent.innerHTML = resultHTML;
    
    // Add event listeners for download buttons
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function() {
            const format = this.getAttribute('data-format');
            downloadResults(format, parseResult, basePairResult, proteins, readingFrames);
        });
    });
}

/**
 * Import a sample DNA file for demonstration
 */
function importSampleFile() {
    // Create a mock file object from the sample data
    fetch('../assets/dna/sample/sample.fa')
        .then(response => response.text())
        .then(data => {
            const blob = new Blob([data], { type: 'text/plain' });
            const file = new File([blob], 'sample.fa', { type: 'text/plain' });
            
            // Manually trigger the file selection handler
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            const event = { target: { files: dataTransfer.files } };
            
            // Find the file input and set its files
            const fileInput = document.querySelector('.file-drop-zone input[type="file"]');
            fileInput.files = dataTransfer.files;
            
            // Trigger the change event
            const changeEvent = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(changeEvent);
            
            showNotification('Sample file loaded', 'success');
        })
        .catch(error => {
            console.error('Failed to load sample file:', error);
            showNotification('Failed to load sample file', 'error');
        });
}

/**
 * Add an analysis to the history sidebar
 */
function addAnalysisToHistory(fileName) {
    const historyList = document.querySelector('.history-list');
    
    // Remove "No recent analyses" message if present
    const emptyHistory = historyList.querySelector('.history-item');
    if (emptyHistory && emptyHistory.textContent.includes('No recent analyses')) {
        historyList.innerHTML = '';
    }
    
    // Add the new analysis to history
    const timestamp = new Date().toLocaleTimeString();
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <i class="fas fa-file-alt"></i>
        <div class="history-details">
            <span class="history-name">${fileName}</span>
            <span class="history-time">${timestamp}</span>
        </div>
    `;
    
    // Prepend to put newest at the top
    historyList.prepend(historyItem);
    
    // Limit history to 5 items
    const historyItems = historyList.querySelectorAll('.history-item');
    if (historyItems.length > 5) {
        historyList.removeChild(historyItems[historyItems.length - 1]);
    }
}

/**
 * Show a notification to the user
 */
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Create the notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="close-notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.classList.add('closing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-remove after some time
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('closing');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Format file size in readable units
 */
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}

/**
 * Get appropriate icon for file type
 */
function getFileIcon(fileName) {
    if (fileName.endsWith('.fa') || fileName.endsWith('.fasta')) {
        return 'fas fa-dna';
    } else if (fileName.endsWith('.fastq')) {
        return 'fas fa-file-medical-alt';
    } else {
        return 'fas fa-file-alt';
    }
}

/**
 * Count occurrences of a specific codon in a DNA sequence
 */
function countCodon(sequence, codon) {
    const upperSeq = sequence.toUpperCase();
    const upperCodon = codon.toUpperCase();
    
    let count = 0;
    for (let i = 0; i < upperSeq.length - 2; i += 3) {
        if (upperSeq.substr(i, 3) === upperCodon) {
            count++;
        }
    }
    
    return count;
}

/**
 * Count all stop codons in a DNA sequence
 */
function countStopCodons(sequence) {
    const upperSeq = sequence.toUpperCase();
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    
    let count = 0;
    for (let i = 0; i < upperSeq.length - 2; i += 3) {
        const codon = upperSeq.substr(i, 3);
        if (stopCodons.includes(codon)) {
            count++;
        }
    }
    
    return count;
}

/**
 * Download analysis results in the selected format
 */
function downloadResults(format, parseResult, basePairResult, proteins, readingFrames) {
    let content = '';
    let fileName = `dna-analysis-${new Date().toISOString().split('T')[0]}`;
    let mimeType = 'text/plain';
    
    // Generate content based on format
    if (format === 'json') {
        const results = {
            sequence: {
                fileName: parseResult.fileName,
                length: parseResult.sequenceLength,
                truncated: parseResult.truncated || false
            },
            basePairs: {
                counts: basePairResult.counts,
                percentages: basePairResult.percentages,
                gcContent: basePairResult.gcContent
            }
        };
        
        if (proteins.length > 0) {
            results.proteins = {
                count: proteins.length,
                proteins: proteins
            };
        }
        
        if (readingFrames) {
            results.readingFrames = readingFrames;
        }
        
        content = JSON.stringify(results, null, 2);
        fileName += '.json';
        mimeType = 'application/json';
    } else if (format === 'csv') {
        // Basic info
        content += `Sequence File,${parseResult.fileName}\n`;
        content += `Sequence Length,${parseResult.sequenceLength}\n\n`;
        
        // Base pairs
        content += 'Base Pair Counts\n';
        content += `A,${basePairResult.counts.A}\n`;
        content += `T,${basePairResult.counts.T}\n`;
        content += `G,${basePairResult.counts.G}\n`;
        content += `C,${basePairResult.counts.C}\n`;
        content += `GC Content,${basePairResult.gcContent}%\n\n`;
        
        // Proteins
        if (proteins.length > 0) {
            content += `Protein Count,${proteins.length}\n\n`;
            content += 'Protein Index,Length,Sequence\n';
            
            proteins.forEach((protein, index) => {
                content += `${index + 1},${protein.length},"${protein}"\n`;
            });
            content += '\n';
        }
        
        // Reading frames
        if (readingFrames && readingFrames.frames) {
            content += `Reading Frame Count,${readingFrames.frameCount}\n\n`;
            content += 'Frame,Direction,Gene Count\n';
            
            readingFrames.frames.forEach(frame => {
                content += `${frame.frame},${frame.direction},${frame.genes ? frame.genes.length : 0}\n`;
            });
        }
        
        fileName += '.csv';
        mimeType = 'text/csv';
    } else {
        // Plain text format
        content += `DNA Sequence Analysis\n`;
        content += `===================\n\n`;
        content += `File: ${parseResult.fileName}\n`;
        content += `Length: ${parseResult.sequenceLength} base pairs\n\n`;
        
        // Base pairs
        content += `Base Composition:\n`;
        content += `- Adenine (A): ${basePairResult.counts.A} (${basePairResult.percentages.A}%)\n`;
        content += `- Thymine (T): ${basePairResult.counts.T} (${basePairResult.percentages.T}%)\n`;
        content += `- Guanine (G): ${basePairResult.counts.G} (${basePairResult.percentages.G}%)\n`;
        content += `- Cytosine (C): ${basePairResult.counts.C} (${basePairResult.percentages.C}%)\n\n`;
        content += `GC Content: ${basePairResult.gcContent}%\n\n`;
        
        // Proteins
        if (proteins.length > 0) {
            content += `Proteins Found: ${proteins.length}\n\n`;
            if (proteins.length <= 10) {
                content += `Protein Details:\n`;
                proteins.forEach((protein, index) => {
                    content += `${index + 1}. Length: ${protein.length}\n   ${protein}\n\n`;
                });
            } else {
                content += `First 5 Proteins:\n`;
                for (let i = 0; i < 5; i++) {
                    content += `${i + 1}. Length: ${proteins[i].length}\n   ${proteins[i].substring(0, 50)}...\n\n`;
                }
            }
        }
        
        // Reading frames
        if (readingFrames && readingFrames.frames) {
            content += `Reading Frames: ${readingFrames.frameCount}\n\n`;
            content += `Frame Details:\n`;
            
            readingFrames.frames.forEach(frame => {
                content += `Frame ${frame.frame} (${frame.direction}): ${frame.genes ? frame.genes.length : 0} potential genes\n`;
            });
        }
        
        content += `\nAnalysis completed at: ${new Date().toLocaleString()}`;
        fileName += '.txt';
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(link.href);
    
    showNotification(`Results downloaded as ${fileName}`, 'success');
}