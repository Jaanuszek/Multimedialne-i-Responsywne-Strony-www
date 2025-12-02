var data = [];

function generateRandomData(numPoints = 20) {
    data = [];
    for (let i = 0; i < numPoints; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
}

generateRandomData();

var margin = { top: 20, right: 30, bottom: 40, left: 40 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function renderDataList() {
    const container = document.getElementById('dataList');
    container.innerHTML = '';
    data.forEach((val, idx) => {
        const item = document.createElement('div');
        item.className = 'data-item';
        item.innerHTML = `
            <span>${idx + 1}:</span>
            <input type="number" value="${val}", id="${idx}" data-index="${idx}" />
            <button class="remove-btn" data-index="${idx}">Remove</button>
        `;
        container.appendChild(item);
    });

    container.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const idx = parseInt(e.target.dataset.index);
            const newVal = parseFloat(e.target.value) || 0;
            data[idx] = newVal;
            updateChart();
        });
    });

    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.index);
            data.splice(idx, 1);
            renderDataList();
            updateChart();
        });
    });
}

document.getElementById('addBtn').addEventListener('click', () => {
    const newVal = Math.floor(Math.random() * 100);
    data.push(newVal);
    renderDataList();
    updateChart();
});

function updateChart() {
    svg.selectAll('*').remove();

    if (data.length === 0) {
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle')
            .text('No data to display');
        return;
    }

    var x = d3.scaleLinear()
        .domain([0, (d3.max(data) || 100) * 1.015])
        .range([0, width ]);

    var histogram = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(15));

    var bins = histogram(data);

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("y", d => y(d.length))
        .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
        .attr("height", d => height - y(d.length))
        .style("fill", "#69b3a2");
}

renderDataList();
updateChart();