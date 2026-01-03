// Check if running on a server
if (window.location.protocol === 'file:') {
    alert('UWAGA: Aplikacja musi być uruchomiona na serwerze HTTP!\n\nUżyj Live Server w VS Code');
}

d3.json('lab6_GDP-data.json').then(data => {
    const gdpData = data.data;

    createLineChart(gdpData);

    createPieChart(gdpData);

    createBarChart(gdpData);
}).catch(error => {
    console.error('Błąd ładowania danych:', error);
    alert('Nie można załadować danych JSON. Upewnij się, że plik lab6_GDP-data.json istnieje i aplikacja działa na serwerze HTTP.');
});

function createLineChart(data) {
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#lineChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const parseDate = d3.timeParse('%Y-%m-%d');
    const dataset = data.map(d => ({
        date: parseDate(d[0]),
        value: d[1]
    }));

    const x = d3.scaleTime()
        .domain(d3.extent(dataset, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.value)])
        .range([height, 0]);

    svg.append('g')
        .attr('class', 'grid')
        .attr('opacity', 0.3)
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat('')
        );

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));

    svg.append('path')
        .datum(dataset)
        .attr('class', 'line')
        .attr('d', line);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 40)
        .style('text-anchor', 'middle')
        .text('Rok');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -50)
        .style('text-anchor', 'middle')
        .text('GDP (Billions $)');
}

function createPieChart(data) {
    const width = 700;
    const height = 500;
    const radius = Math.min(height, height) / 2 - 40;

    const svg = d3.select('#pieChart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${height / 2},${height / 2})`);

    const decadeData = {};
    data.forEach(d => {
        const year = new Date(d[0]).getFullYear();
        const decade = Math.floor(year / 10) * 10;
        if (!decadeData[decade]) {
            decadeData[decade] = 0;
        }
        decadeData[decade] += d[1];
    });

    const pieData = Object.keys(decadeData).map(key => ({
        decade: key + 's',
        value: decadeData[key]
    }));

    const color = d3.scaleOrdinal()
        .domain(pieData.map(d => d.decade))
        .range(d3.schemeSet3);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const arcLabel = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.6);

    const arcs = svg.selectAll('arc')
        .data(pie(pieData))
        .enter()
        .append('g');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.decade))
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

    const legend = svg.selectAll('.legend')
        .data(pieData)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${radius + 30},${i * 25 - 100})`);

    legend.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => color(d.decade));

    legend.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('font-size', '12px')
        .text(d => `${d.decade}: $${(d.value / 1000).toFixed(0)}T`);
}

function createBarChart(data) {
    const margin = { top: 20, right: 30, bottom: 100, left: 70 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#barChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const recentData = data
        .filter(d => new Date(d[0]).getFullYear() >= 2010)
        .map(d => ({
            date: d[0],
            value: d[1]
        }));

    const x = d3.scaleBand()
        .domain(recentData.map(d => d.date))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(recentData, d => d.value)])
        .range([height, 0]);

    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    svg.selectAll('.bar')
        .data(recentData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.date))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.value));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 80)
        .style('text-anchor', 'middle')
        .text('Kwartał');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -50)
        .style('text-anchor', 'middle')
        .text('GDP (Billions $)');
}