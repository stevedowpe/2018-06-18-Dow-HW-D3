// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// OK - Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// OK - Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// OK - Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// OK - Select svg_area (connection to html file), append SVG area to it, and set its dimensions
var svg = d3.select(".svg_area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// OK - Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// ----------------------------------
// ----------------------------------
// var state = []
// var poverty = []
// var obesity = []

// Load data from csv file
d3.csv("data.csv", function(error, data_items) {
    // Throw an error if one occurs
    if (error) throw error;
  
    // create lists
    // var obesity = data_items.map => data.obesity;


    // OK - Step 1 from Hair Example Format the state and cast the force value to a number
    data_items.forEach(function(data) {
      data.obesity = +data.obesity;
      data.poverty = +data.poverty;
      // data.state = +data.state;
    });

    // console.log(data_items);
  

    // OK - Step 2 from Hair Example - 
    // =============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(data_items, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data_items, d => d.obesity)])
      .range([height, 0]);

    // OK - Step 3 from Hair Example -  Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
  // OK - Step 4 from Hair Example - Append Axes to the chart
  // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

   // OK - Step 5 from Hair Example: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(data_items)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.obesity))
  .attr("r", "15")
  .attr("fill", "pink")
  .attr("opacity", ".5");
  
  // Steps 6, 7, and 8 from Hair Example not needed here

  // OK - Create axis labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesity");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty");  
});