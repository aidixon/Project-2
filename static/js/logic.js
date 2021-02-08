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
    var water_data = [];
    var Jan2019 = [];

    response = d3.json(queryUrl, function(data) {
        console.log(data);

        // The data is callable 
        water_data.push(data);
        
        // For loop to loop through the data
        for (var i = 0; i < data.length; i++) {

            // Code to extract data and push into empty arrays
            var water_dates = data[i].date; 
            all_dates.push(water_dates);
                
            var poudreturb = data[i].poudre_turb_ntu;
            all_poudre.push(+poudreturb);

            var horsetoothturb = data[i].horsetooth_turb_ntu;
            all_horsetooth.push(+horsetoothturb);

            var finishedturb = data[i].finished_water_turb_ntu;
            all_finished.push(+finishedturb);

    }

    // console.log(all_dates);
    console.log(all_poudre);
    console.log(all_horsetooth);
    console.log(all_finished);
    console.log(water_data);
    console.log(all_dates);

  
    // Trace created to plot a chart
    var trace1 = {
        x: all_dates,
        y: all_finished,
        name: "Finished Turbidity",
        type: "scatter",
        mode: "markers"
    }

    var trace2 = {
        x: all_dates,
        y: all_poudre,
        name: "Poudre Raw Turbidity",
        type: "scatter",
        mode: "markers"
    }

    var trace3 = {
        x: all_dates,
        y: all_horsetooth,
        name: "Horsetooth Raw Turbidity",
        type: "scatter",
        mode: "markers"
    }

    var layout = {
        title: "Fort Collins Water Turbidity",
        width: 1300,
        height: 500,
        margin: {
            l: 20,
            b: 92,
            t: 50
        }
    }

    var data = [trace1, trace2, trace3];
    Plotly.newPlot("plot-1", data, layout);


    // Second chart 
    var trace4 = {
        type: "scatter",
        mode: "lines",
        x: all_dates,
        y: all_finished,
        line: {
            color: "#17BECF"
        }
    }

    var layout2 = {
        title: "Finished Water Closer Analysis",
        width: 1300,
        height: 500,
        margin: {
            l: 40,
            b: 95,
            t: 60,
        }
    }
    var data = [trace4]

    Plotly.newPlot("plot-2", data, layout2)

})};
getWaterData();
