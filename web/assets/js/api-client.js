/**
 * DNAnalyzer API Client
 * 
 * This module provides functions to interact with the DNAnalyzer API endpoints.
 * It enables the website to access the core DNAnalyzer features through a unified interface.
 * 
 * @version 1.0.0
 */

const DNAnalyzerAPI = {
    // Base URL for API requests - configurable for different environments
    baseUrl: '/api/v1',

    /**
     * Set the base URL for the API
     * @param {string} url - The base URL for the API
     */
    setBaseUrl(url) {
        this.baseUrl = url;
    },

    /**
     * Check if the API is online
     * @returns {Promise<Object>} - API status information
     */
    async checkStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/status`);
            if (!response.ok) {
                throw new Error('API status check failed');
            }
            return await response.json();
        } catch (error) {
            console.error('API status check error:', error);
            throw error;
        }
    },

    /**
     * Analyze a DNA file with various options
     * @param {File} dnaFile - The DNA file to analyze
     * @param {Object} options - Analysis options
     * @returns {Promise<Object>} - Analysis results
     */
    async analyzeDNA(dnaFile, options = {}) {
        try {
            const formData = new FormData();
            formData.append('dnaFile', dnaFile);
            
            // Add options to form data
            if (options.amino) formData.append('amino', options.amino);
            if (options.minCount) formData.append('minCount', options.minCount);
            if (options.maxCount) formData.append('maxCount', options.maxCount);
            if (options.reverse) formData.append('reverse', options.reverse);
            if (options.rcomplement) formData.append('rcomplement', options.rcomplement);
            if (options.codons) formData.append('codons', options.codons);
            if (options.coverage) formData.append('coverage', options.coverage);
            if (options.longest) formData.append('longest', options.longest);
            if (options.format) formData.append('format', options.format);
            
            const response = await fetch(`${this.baseUrl}/analyze`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'DNA analysis failed');
            }
            
            // Handle different response formats
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('DNA analysis error:', error);
            throw error;
        }
    },

    /**
     * Analyze base pair composition of a DNA sequence
     * @param {string} sequence - The DNA sequence
     * @returns {Promise<Object>} - Base pair analysis results
     */
    async analyzeBasePairs(sequence) {
        try {
            const response = await fetch(`${this.baseUrl}/base-pairs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sequence })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Base pair analysis failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Base pair analysis error:', error);
            throw error;
        }
    },

    /**
     * Find proteins in a DNA sequence
     * @param {string} sequence - The DNA sequence
     * @param {string} aminoAcid - The amino acid to start proteins with
     * @returns {Promise<Object>} - Protein analysis results
     */
    async findProteins(sequence, aminoAcid = 'M') {
        try {
            const response = await fetch(`${this.baseUrl}/find-proteins`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sequence,
                    aminoAcid
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Protein finding failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Protein finding error:', error);
            throw error;
        }
    },

    /**
     * Analyze reading frames in a DNA sequence
     * @param {string} sequence - The DNA sequence
     * @param {number} minLength - Minimum length for potential genes
     * @returns {Promise<Object>} - Reading frame analysis results
     */
    async analyzeReadingFrames(sequence, minLength = 300) {
        try {
            const response = await fetch(`${this.baseUrl}/reading-frames`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sequence,
                    minLength
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Reading frame analysis failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Reading frame analysis error:', error);
            throw error;
        }
    },

    /**
     * Analyze genetic testing data (23andMe, AncestryDNA, etc.)
     * @param {File} geneticFile - The genetic data file
     * @param {boolean} snpAnalysis - Whether to include detailed SNP analysis
     * @returns {Promise<Object>} - Genetic analysis results
     */
    async analyzeGeneticData(geneticFile, snpAnalysis = false) {
        try {
            const formData = new FormData();
            formData.append('geneticFile', geneticFile);
            formData.append('snpAnalysis', snpAnalysis);
            
            const response = await fetch(`${this.baseUrl}/analyze-genetic`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Genetic data analysis failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Genetic data analysis error:', error);
            throw error;
        }
    },

    /**
     * Manipulate a DNA sequence (reverse, complement)
     * @param {string} sequence - The DNA sequence
     * @param {boolean} reverse - Whether to reverse the sequence
     * @param {boolean} complement - Whether to get the complement
     * @returns {Promise<Object>} - Manipulated sequence results
     */
    async manipulateDNA(sequence, reverse = false, complement = false) {
        try {
            const response = await fetch(`${this.baseUrl}/manipulate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sequence,
                    reverse,
                    complement
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'DNA manipulation failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('DNA manipulation error:', error);
            throw error;
        }
    },

    /**
     * Parse a DNA file (FASTA, FASTQ)
     * @param {File} file - The file to parse
     * @returns {Promise<Object>} - Parsed DNA sequence
     */
    async parseFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch(`${this.baseUrl}/parse`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'File parsing failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('File parsing error:', error);
            throw error;
        }
    }
};

// Export the API client for use in other modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = DNAnalyzerAPI;
} else {
    window.DNAnalyzerAPI = DNAnalyzerAPI;
}