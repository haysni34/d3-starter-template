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
  	vis.updateVis();
  }
  
  // Prepare the data and scales before we render it
  updateVis() {
  	const vis = this;
  	// ...
  	vis.renderVis();
  	vis.renderLegend();
  }
  
  // Bind data to visual elements
  renderVis() {
  	// ...
  }
  
  // Update colour legend
  renderLegend() {
  	// ...
  }
  
}
