// Update button click handlers if needed
document.addEventListener('DOMContentLoaded', () => {
    // Add any necessary event listeners for the homepage
    const getStartedBtn = document.getElementById('try-dna');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'docs/docs.html';
        });
    }

    const viewGithubBtn = document.getElementById('view-github');
    if (viewGithubBtn) {
        viewGithubBtn.addEventListener('click', () => {
            window.open('https://github.com/yourusername/DNAnalyzer', '_blank');
        });
    }
});