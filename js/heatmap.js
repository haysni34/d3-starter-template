class Heatmap {

  // Class constructor with initial configuration
  constructor(_config, _data) {
    this.config = {
    	// ...
    }
    // ...
    this.initVis();
  }
  
  // Create SVG area, initialize scales/axes, append static elements
  initVis() {
  	const vis = this;
  	vis.svg = d3.select(vis.config.parentElement).append('svg')
	          .attr('width', vis.config.containerWidth)
	          .attr('height', vis.config.containerHeight);

	vis.config.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
	vis.config.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

	vis.chartArea = vis.svg.append('g')
			.attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

	vis.colorScale = d3.scaleSequential()
    		.interpolator(d3.interpolateReds);

	vis.xScale = d3.scaleLinear()
   			.range([0, vis.config.width]);
	vis.yScale = d3.scaleBand()
    		.range([0, vis.config.height])
   			.paddingInner(0.2);
	vis.xAxis = d3.axisBottom(vis.xScale)
    		.ticks(6)
    		.tickSize(0)
    		.tickFormat(d3.format('d')) // Remove comma delimiter for thousands
    		.tickPadding(10);

	vis.xAxisG = vis.chartArea.append('g')
    	.attr('class', 'axis x-axis')
    	.attr('transform', `translate(0,${vis.config.height})`);
	  vis.vaccineLine = vis.chartArea.append('line')
    .attr('class', 'vaccine-line');

	vis.vaccineLabel = vis.chartArea.append('text')
    	.attr('class', 'vaccine-label')
    	.attr('text-anchor', 'middle')
    	.attr('y', -20)
    	.attr('dy', '0.85em')
    	.text('Vaccine introduced');
  	vis.updateVis();
  }
  
  // Prepare the data and scales before we render it
  updateVis() {
  	const vis = this;
  	vis.groupedData = d3.groups(vis.data, d => d.state);

	vis.yValue = d => d[0];
	vis.colorValue = d => d.value;
	vis.xValue = d => d.year; 

	vis.colorScale.domain(d3.extent(vis.data, vis.colorValue));
	vis.xScale.domain(d3.extent(vis.data, vis.xValue));
	vis.yScale.domain(vis.groupedData.map(vis.yValue));

	    // Convert year (1963) to pixel coordinate
	const xVaccineIntroduced = vis.xScale(vis.config.vaccineIntroduced);

	// Set positions
	vis.vaccineLine
    	.attr('x1', xVaccineIntroduced)
    	.attr('x2', xVaccineIntroduced)
    	.attr('y1', -5)
    	.attr('y2', vis.config.height);

	vis.vaccineLabel.attr('x', xVaccineIntroduced);
	  
  	vis.renderVis();
  	vis.renderLegend();

	
  }
  
  // Bind data to visual elements
  renderVis() {
  	// Bind data to selection and use the name of each state (d[0]) as a key
	const row = vis.chart.selectAll('.h-row')
    	.data(vis.groupedData, d=> d[0]);

	// Enter
	const rowEnter = row.enter().append('g')
    	.attr('class', 'h-row');

	// Enter + update
	rowEnter.merge(row)
   	 .attr('transform', d => `translate(0,${vis.yScale(vis.yValue(d))})`);

	// Exit
	row.exit().remove();

	// Append row label (y-axis)
	rowEnter.append('text')
    	.attr('class', 'h-label')
    	.attr('text-anchor', 'end')
    	.attr('dy', '0.85em')
    	.attr('x', -8)
    	.text(vis.yValue);

	const cellWidth = (vis.config.width / (vis.xScale.domain()[1] - vis.xScale.domain()[0])) - 2;

	// Bind data to selection
	const cell = row.merge(rowEnter).selectAll('.h-cell')
   		.data(d => d[1]);

	// Enter
	const cellEnter = cell.enter().append('rect')
    	.attr('class', 'h-cell');

	// Enter + update
	cellEnter.merge(cell)
    	.attr('height', vis.yScale.bandwidth())
    	.attr('width', cellWidth)
    	.attr('x', d => vis.xScale(vis.xValue(d)))
    	.attr('fill', d => {
     		if (d.value === 0 || d.value === null) {
        	return '#fff';
      	} else {
        	return vis.colorScale(vis.colorValue(d));
      	}
    	});
	  const cellNa = row.merge(rowEnter).selectAll('.h-cell-na')
    	.data(d => d[1].filter(k => k.value === null));

	const cellNaEnter = cellNa.enter().append('line')
    	.attr('class', 'h-cell-na');

	cellNaEnter.merge(cellNa)
    	.attr('x1', d => vis.xScale(vis.xValue(d)))
    	.attr('x2', d => vis.xScale(vis.xValue(d)) + cellWidth)
    	.attr('y1', vis.yScale.bandwidth())
    	.attr('y2', 0);
	  
	  vis.xAxisG.call(vis.xAxis);
  }
  
  // Update colour legend
  renderLegend() {
  	// ...
  }
  
}
