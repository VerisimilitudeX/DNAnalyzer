// Constants
const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const fileInput = document.getElementById('dna-file');
const startCodonSelect = document.getElementById('start-codon');
const analysisForm = document.getElementById('analysis-form');
const resultsDiv = document.getElementById('results');
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.innerHTML = 'Analyzing DNA sequence...';

// Event Listeners
analysisForm.addEventListener('submit', handleAnalysis);
fileInput.addEventListener('change', handleFileSelect);

async function handleAnalysis(event) {
    event.preventDefault();
    
    if (!fileInput.files[0]) {
        displayError('Please select a DNA sequence file');
        return;
    }

    // Show loading indicator
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(loadingIndicator);

    const formData = new FormData();
    formData.append('dnaFile', fileInput.files[0]);
    
    // Add all parameters
    const parameters = getAnalysisParameters();
    Object.entries(parameters).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        displayResults(result);
    } catch (error) {
        console.error('Error:', error);
        displayError(`Error analyzing DNA: ${error.message}`);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.name.match(/\.(fa|fasta|fastq)$/i)) {
            displayError('Please select a valid FASTA or FASTQ file');
            fileInput.value = '';
            return;
        }

        // Update file name display
        document.getElementById('file-name').textContent = file.name;
    }
}

function getAnalysisParameters() {
    return {
        amino: startCodonSelect.value,
        minCount: document.getElementById('min-count').value,
        maxCount: document.getElementById('max-count').value,
        reverse: document.getElementById('reverse').checked,
        rcomplement: document.getElementById('rcomplement').checked,
        codons: document.getElementById('codons').checked,
        coverage: document.getElementById('coverage').checked,
        longest: document.getElementById('longest').checked,
        format: document.getElementById('format').value
    };
}

function displayResults(result) {
    // Remove loading indicator
    loadingIndicator.remove();

    // Format the result based on the selected output format
    const format = document.getElementById('format').value;
    let formattedResult = result;

    if (format === 'json') {
        try {
            const jsonObj = JSON.parse(result);
            formattedResult = JSON.stringify(jsonObj, null, 2);
        } catch (e) {
            console.warn('Failed to parse JSON result:', e);
        }
    }

    resultsDiv.innerHTML = `
        <div class="results-container">
            <h3>Analysis Results</h3>
            <pre>${formattedResult}</pre>
            <div class="results-actions">
                <button onclick="downloadResults('analysis_results.${format}', '${format}')">
                    Download Results
                </button>
            </div>
        </div>
    `;
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function displayError(message) {
    resultsDiv.innerHTML = `
        <div class="error-container">
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function downloadResults(filename, format) {
    const resultText = document.querySelector('.results-container pre').textContent;
    const blob = new Blob([resultText], { type: getContentType(format) });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function getContentType(format) {
    switch (format) {
        case 'json':
            return 'application/json';
        case 'csv':
            return 'text/csv';
        default:
            return 'text/plain';
    }
}