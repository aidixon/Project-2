var appToken = app_token;

/** Function setup to grab values
* @param {array} rows
* @param {integer} index
* index 1 - Date
* index 7 - Poudre_raw_turbidity
* index 11 - Horsetooth_raw_turbidity
* index 15 - Finished_water_turbidity
*/

function unpack(rows, index){
    return rows.map(function(row) {
        return row[index];
    });
}

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
var queryUrl = `https://opendata.fcgov.com/resource/8n27-taq6.json?$where=datenum%3E=20190101&$$app_token=${appToken}`;
// console.log(queryUrl)

// Function to extract data and put into a visible table
function getWaterData() {

    d3.json(queryUrl).then(function(data) {
        var dates = unpack(data.dataset.data, 1);
        var poudreturb = unpack(data.dataset.data, 7);
        var horsetoothturb = unpack(data.dataset.data, 11);
        var finishedturb = unpack(data.dataset.data, 15);
        buildTable(dates, poudreturb, horsetoothturb, finishedturb);
    })
}
