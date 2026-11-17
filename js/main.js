d3.json('data/measles_data.json').then(data => {
  const heatmap = new Heatmap({
    parentElement: '#heatmap-container',
    vaccineIntroduced: 1963
  }, data);
});
