var appToken = app_token;

// Query URL for the data 
var queryUrl = `https://opendata.fcgov.com/resource/8n27-taq6.json?$where=datenum%3E=20190101&$$app_token=${appToken}`;
console.log(queryUrl)

// Function to extract data and put into a visible table
function getWaterData() {
    queryUrl;
    d3.json(queryUrl, function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
        var water_dates = data[i].date; 
            // console.log(water_dates);
        var poudreturb = data[i].poudre_turb_ntu;
            // console.log(poudreturb);
        var horsetoothturb = data[i].horsetooth_turb_ntu;
            // console.log(horsetoothturb);
        var finishedturb = data[i].finished_water_turb_ntu;
            // console.log(finishedturb);
        // buildTable(water_dates, poudreturb, horsetoothturb, finishedturb);
    }});

}

// Use the data to put into a table
function buildTable(water_dates, poudreturb, horsetoothturb, finishedturb) {
    var table = d3.select("#data-table");
    var tbody = table.select("tbody");
    var trow;
    for (var i = 0; i < 12; i++) {
        trow = tbody.append("tr");
        trow.append("td").text(water_dates[i]);
        trow.append("td").text(poudreturb[i]);
        trow.append("td").text(horsetoothturb[i]);
        trow.append("td").text(finishedturb[i]);

    }
}

// Plotly chart
function buildPlot() {
    queryUrl;
    d3.json(queryUrl, function(data) {

        // Data for the plot via the json response
        var dates = data.date;
        var poudreturb = data.poudre_turb_ntu;
        var horsetoothturb = data.horsetooth_turb_ntu;
        var finishedturb = data.finished_water_turb_ntu;

        getWaterData();

        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: dates,
            y: finishedturb,
            line: {
                color: "#17BECF"
            }
        };

        // Candlestick Trace
        var trace2 = {
            type: "candlestick",
            x: dates,
            poudre: poudreturb,
            horsetooth: horsetoothturb
        };

        var data = [trace1, trace2];

        var layout = {
            title: 'Water Analysis',
            xaxis: {
                autorange: true,
                type: "date",
                title: "Dates"
            },
            yaxis: {
                autorange: true,
                type: "linear",
                title: "Turbidity Results"
            },
            showlegend: true
        };

        Plotly.newPlot("plot-1", data, layout);
    });
}

buildPlot();

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