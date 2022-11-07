let width = 960;
let height = 1120;

const projection = d3.geoMercator()
    .scale(400)
    .translate([200, 280])
    .center([0, 5]);

const geoGenerator = d3.geoPath().projection(projection);

// join the feature collection's features array to path elements
const svg = d3.select('#gujaratMap')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', '0 0'+ width + height);

const g = svg.append('g');

svg.call(d3.zoom()
    .on('zoom', (e) => {
        g.attr('transform', e.transform);
    }));

d3.json('gujarat_AC.json')
    .then(data => {
        console.log('geojson data: ', data);
        g.selectAll('path')
            .data(data.features)
            .join('path')
                .attr('class', 'ac')
                .attr('d', geoGenerator)
            .append('title')
                .text(d => d.properties.ac_name);
    });
