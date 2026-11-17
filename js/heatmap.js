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
  	// ...
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
