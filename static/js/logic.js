var apiKey = API_KEY;
var appToken = app_token;

// Set up first chart
var svgWidth = 950;
var svgHeight = 500;

var margin = {
    top: 20,
    bottom: 50,
    left: 40,
    right: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper to append the chart
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Transform the chart so the axis appear on the left(y-axis)/bottom(x-axis)
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Query URL for the data 
var queryUrl2019 = `https://opendata.fcgov.com/resource/8n27-taq6.json?$where=datenum%3E=20190101&$$app_token=${appToken}`;
// console.log(queryUrl2019)