document.addEventListener('DOMContentLoaded', function() {
    initGenomeMap();
});

function initGenomeMap() {
    const container = document.getElementById('genomeMap');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .call(d3.zoom().scaleExtent([1, 20]).on('zoom', function(event) {
            g.attr('transform', event.transform);
        }));

    const g = svg.append('g');

    const genomeLength = 10000;

    const genes = [
        { start: 500, end: 1500, name: 'GeneA' },
        { start: 2200, end: 3500, name: 'GeneB' },
        { start: 4000, end: 4700, name: 'GeneC' }
    ];

    const variants = [
        { pos: 1800 },
        { pos: 2500 },
        { pos: 4200 }
    ];

    const promoters = [
        { start: 480, end: 520 },
        { start: 2150, end: 2180 },
        { start: 3970, end: 3990 }
    ];

    const x = d3.scaleLinear()
        .domain([0, genomeLength])
        .range([0, width]);

    const centerY = height / 2;

    g.append('line')
        .attr('x1', x(0))
        .attr('x2', x(genomeLength))
        .attr('y1', centerY)
        .attr('y2', centerY)
        .attr('stroke', '#888')
        .attr('stroke-width', 2);

    g.selectAll('rect.gene')
        .data(genes)
        .enter()
        .append('rect')
        .attr('class', 'gene')
        .attr('x', d => x(d.start))
        .attr('y', centerY - 20)
        .attr('width', d => x(d.end) - x(d.start))
        .attr('height', 40);

    g.selectAll('text.gene-label')
        .data(genes)
        .enter()
        .append('text')
        .attr('class', 'gene-label')
        .attr('x', d => x(d.start) + 4)
        .attr('y', centerY - 25)
        .text(d => d.name);

    g.selectAll('polygon.variant')
        .data(variants)
        .enter()
        .append('polygon')
        .attr('class', 'variant')
        .attr('points', d => {
            const x0 = x(d.pos);
            return `${x0},${centerY + 25} ${x0 - 5},${centerY + 35} ${x0 + 5},${centerY + 35}`;
        });

    g.selectAll('rect.promoter')
        .data(promoters)
        .enter()
        .append('rect')
        .attr('class', 'promoter')
        .attr('x', d => x(d.start))
        .attr('y', centerY - 35)
        .attr('width', d => Math.max(x(d.end) - x(d.start), 2))
        .attr('height', 5);
}
