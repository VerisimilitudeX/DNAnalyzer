document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.addEventListener('click', handleAnalyze);
});

async function handleAnalyze() {
    const fileInput = document.getElementById('dnaFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a DNA file to analyze.');
        return;
    }
    try {
        const sequence = await DNAnalyzerAPI.parseFile(file).then(r => r.sequence);
        const baseData = await DNAnalyzerAPI.analyzeBasePairs(sequence);
        const frameData = await DNAnalyzerAPI.analyzeReadingFrames(sequence);
        renderBaseChart(baseData);
        renderGeneChart(frameData);
    } catch (err) {
        console.error(err);
        alert('Analysis failed: ' + err.message);
    }
}


let baseChart;
function renderBaseChart(data) {
    const ctx = document.getElementById('baseChart').getContext('2d');
    const labels = Object.keys(data.percentages);
    const values = labels.map(k => parseFloat(data.percentages[k]));
    if (baseChart) baseChart.destroy();
    baseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#4285F4','#EA4335','#FBBC05','#34A853','#9C27B0']
            }]
        },
        options: {
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

let geneChart;
function renderGeneChart(data) {
    const ctx = document.getElementById('geneChart').getContext('2d');
    const genes = data.frames.flatMap(f => f.genes);
    const labels = genes.map((g,i) => 'Gene ' + (i+1));
    const starts = genes.map(g => g.start);
    const lengths = genes.map(g => g.length);
    if (geneChart) geneChart.destroy();
    geneChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Start',
                data: starts,
                backgroundColor: '#03A9F4'
            },{
                label: 'Length',
                data: lengths,
                backgroundColor: '#8BC34A'
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}
