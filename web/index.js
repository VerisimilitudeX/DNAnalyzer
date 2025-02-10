document.addEventListener('DOMContentLoaded', () => {
    const analyzerForm = document.getElementById('analyzerForm');
    const resultsDiv = document.getElementById('analysis-results');
    const API_URL = 'http://localhost:8080/api/analyze';

    analyzerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = analyzerForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Analyzing...';
        
        try {
            // Get form data
            const filePath = document.getElementById('filePath').value;
            const selectedFeatures = Array.from(
                document.querySelectorAll('input[name="feature"]:checked')
            ).map(checkbox => checkbox.value);

            // Prepare request payload
            const payload = {
                filePath: filePath,
                features: selectedFeatures
            };

            // Send request to local API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display results
            resultsDiv.innerHTML = `
                <h3>Analysis Results</h3>
                <pre>${JSON.stringify(result, null, 2)}</pre>
            `;
            
            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Error:', error);
            resultsDiv.innerHTML = `
                <h3>Error</h3>
                <pre class="error">
                    ${error.message}
                    
                    Please ensure:
                    1. The local DNAnalyzer service is running
                    2. The file path is correct and accessible
                    3. You have necessary permissions to read the file
                </pre>
            `;
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Run Analysis';
        }
    });

    const cursor = document.querySelector('.custom-cursor');
    
    if (!cursor) return; // Skip if cursor element doesn't exist
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Scale effect near clickable elements
            const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
            if (hoveredElement && (
                hoveredElement.closest('a') || 
                hoveredElement.closest('button') || 
                hoveredElement.closest('input[type="checkbox"]') ||
                hoveredElement.closest('.drop-zone') ||
                hoveredElement.closest('textarea') ||
                hoveredElement.closest('input[type="text"]')
            )) {
                cursor.style.transform = 'scale(1.5)';
            } else {
                cursor.style.transform = 'scale(1)';
            }
        });
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
});