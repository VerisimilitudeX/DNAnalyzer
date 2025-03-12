/**
 * Initialize the DNA Helix animation with a proper twisted structure
 */
function initTwistedDNAHelix() {
    const dnaHelix = document.getElementById('dnaHelix');
    if (!dnaHelix) return;
    
    // Clear any existing content
    dnaHelix.innerHTML = '';
    
    const numBases = 15;
    const basePairs = [
        ['A', 'T'],
        ['T', 'A'],
        ['G', 'C'],
        ['C', 'G']
    ];
    
    // Create base pairs with a consistent twisted structure
    for (let i = 0; i < numBases; i++) {
        const pairIndex = Math.floor(Math.random() * basePairs.length);
        const [leftBase, rightBase] = basePairs[pairIndex];
        
        const basePair = document.createElement('div');
        basePair.className = 'base-pair';
        
        // Set the vertical position with appropriate spacing
        basePair.style.top = `${i * 26}px`;
        
        // Apply initial rotation to create the helix twist
        // Each base pair is offset by 25 degrees to create the helix pattern
        const initialRotation = i * 25;
        basePair.style.transform = `rotateY(${initialRotation}deg) translateZ(40px) translateX(${Math.sin(initialRotation * Math.PI / 180) * 20}px)`;
        
        // Apply the rotate animation with delay
        basePair.style.animation = `rotate 8s linear infinite`;
        basePair.style.animationDelay = `${-i * 0.5}s`;
        
        const leftBaseElem = document.createElement('div');
        leftBaseElem.className = 'base left-base';
        leftBaseElem.textContent = leftBase;
        leftBaseElem.style.animationDelay = `${i * 0.2}s`;
        
        const rightBaseElem = document.createElement('div');
        rightBaseElem.className = 'base right-base';
        rightBaseElem.textContent = rightBase;
        rightBaseElem.style.animationDelay = `${i * 0.2}s`;
        
        const connector = document.createElement('div');
        connector.className = 'base-connector';
        
        basePair.appendChild(leftBaseElem);
        basePair.appendChild(connector);
        basePair.appendChild(rightBaseElem);
        
        dnaHelix.appendChild(basePair);
    }
}

// Replace the existing initDNAHelix with the improved version when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with the DNA helix
    if (document.getElementById('dnaHelix')) {
        // Replace the standard initialization with our twisted version
        window.initDNAHelix = initTwistedDNAHelix;
    }
});
