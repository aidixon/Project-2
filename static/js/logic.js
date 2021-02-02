var appToken = app_token;

// Query URL for the data 
var queryUrl = `https://opendata.fcgov.com/resource/8n27-taq6.json?$where=datenum%3E=20190101&$$app_token=${appToken}`;
console.log(queryUrl)

// Function to extract data and put into a visible table
function getWaterData() {
    queryUrl;
    // Variables for empty lists
var all_dates = [];
var all_poudre = [];
var all_horsetooth = [];
var all_finished = [];
    response = d3.json(queryUrl, function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {

            // Code to extract data and push into empty arrays
            var water_dates = data[i].date; 
            all_dates.push(water_dates);
                
            var poudreturb = data[i].poudre_turb_ntu;
            all_poudre.push(poudreturb);

            var horsetoothturb = data[i].horsetooth_turb_ntu;
            all_horsetooth.push(horsetoothturb);

            var finishedturb = data[i].finished_water_turb_ntu;
            all_finished.push(finishedturb);
    }
    console.log(all_dates);
    console.log(all_poudre);
    console.log(all_horsetooth);
    console.log(all_finished);
});

}
getWaterData();

// Use the data to put into a table
function buildTable() {
    var table = d3.select("#data-table");
    var tbody = table.select("tbody");
    var trow;
    for (var i = 0; i < 1; i++) {
        trow = tbody.append("tr");
        trow.append("td").text(all_finished);
        trow.append("td").text(all_poudre);
        trow.append("td").text(all_horsetooth);
        trow.append("td").text(all_finished);

    }
}

// Plotly chart
function buildPlot() {
    queryUrl;
    d3.json(queryUrl, function(data) {
        for (var i = 0; i < data.length; i++) {

        // Data for the plot via the json response
        var water_dates = data.date;
        var poudreturb = data.poudre_turb_ntu;
        var horsetoothturb = data.horsetooth_turb_ntu;
        var finishedturb = data.finished_water_turb_ntu;

        getWaterData();

        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: water_dates,
            y: finishedturb,
            line: {
                color: "#17BECF"
            }
        };

        // Candlestick Trace
        var trace2 = {
            type: "candlestick",
            x: water_dates,
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
    }});
}

buildPlot();