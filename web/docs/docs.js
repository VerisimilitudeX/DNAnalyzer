document.addEventListener('DOMContentLoaded', () => {
    // Map of documentation sections to their markdown file paths
    const docPaths = {
        'getting-started': '../docs/getting-started.md',
        'local-setup': '../docs/Local_Analyzer_Setup.md',
        'cli': '../docs/usage/MetCLI.md',
        'samples': '../docs/samples/cli-arguments-examples.md',
        'parameters': '../docs/research/analysis-parameters.md',
        'genes': '../docs/research/genes.md'
    };

    // Function to fetch and render markdown content
    async function loadDocContent(docId) {
        const docContent = document.querySelector('.doc-content');
        if (!docContent) {
            console.error('Documentation content container not found');
            return;
        }

        try {
            const response = await fetch(docPaths[docId]);
            if (!response.ok) {
                throw new Error(`Failed to load documentation: ${response.statusText}`);
            }
            
            const markdown = await response.text();
            
            // Basic markdown to HTML conversion
            const html = markdown
                .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
                .replace(/^- (.*$)/gm, '<li>$1</li>')
                .split('\n\n')
                .map(block => {
                    if (block.startsWith('<li>')) {
                        return `<ul>${block}</ul>`;
                    }
                    if (!block.startsWith('<')) {
                        return `<p>${block}</p>`;
                    }
                    return block;
                })
                .join('\n');

            docContent.innerHTML = html;

            // Update URL hash without scrolling
            const currentURL = new URL(window.location);
            currentURL.hash = docId;
            window.history.pushState({}, '', currentURL);

        } catch (error) {
            console.error('Error loading documentation:', error);
            docContent.innerHTML = `
                <div class="error">
                    <h2>Error Loading Documentation</h2>
                    <p>Sorry, we couldn't load the requested documentation. Please try again later.</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
        }
    }

    // Add click handlers to documentation links
    const links = document.querySelectorAll('.doc-section a');
    if (links.length > 0) {
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const docId = link.getAttribute('href').substring(1);
                
                // Update active state
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                loadDocContent(docId);
                
                // Smooth scroll to content on mobile
                if (window.innerWidth < 768) {
                    document.querySelector('.doc-content')?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Load initial documentation based on URL hash or default to getting-started
        const initialDoc = window.location.hash.substring(1) || 'getting-started';
        loadDocContent(initialDoc);
        
        // Highlight the active link
        const activeLink = document.querySelector(`.doc-section a[href="#${initialDoc}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        console.error('No documentation links found');
        document.querySelector('.doc-content').innerHTML = `
            <div class="error">
                <h2>Documentation Navigation Error</h2>
                <p>The documentation navigation links could not be found. Please try refreshing the page.</p>
            </div>
        `;
    }
});