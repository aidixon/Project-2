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
        height: 400,
        margin: {
            l: 40,
            b: 95,
            t: 60,
        }
    }
    var data = [trace4];

    Plotly.newPlot("plot-2", data, layout2);


    // Lists for Jan 2019, 2020, 2021 data for comparing most recent full month
    var Jan2021 = ["01-Jan-2021","02-Jan-2021","03-Jan-2021","04-Jan-2021","05-Jan-2021",
    "06-Jan-2021","07-Jan-2021","08-Jan-2021","09-Jan-2021","10-Jan-2021","11-Jan-2021",
    "12-Jan-2021","13-Jan-2021","14-Jan-2021","15-Jan-2021","16-Jan-2021","17-Jan-2021",
    "18-Jan-2021","19-Jan-2021","20-Jan-2021","21-Jan-2021","22-Jan-2021","23-Jan-2021",
    "24-Jan-2021","25-Jan-2021","26-Jan-2021","27-Jan-2021","28-Jan-2021","29-Jan-2021",
    "30-Jan-2021","31-Jan-2021"];

    var Jan2021F = [0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.03,0.03,
        0.03,0.03,0.02,0.03,0.03,0.03,0.03,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02];

    var Jan2021H = [2.41,2.38,2.44,2.41,2.47,2.45,2.48,2.44,2.47,2.53,2.51,2.52,2.48,2.56,2.86,
        2.99,2.9,3.03,3.06,2.92,2.68,2.63,2.63,2.63,2.61,2.58,2.46,2.41,2.4,2.39,2.48];

    var Jan2021P = [0.42,0.41,0.44,0.54,0.48,0.51,0.48,0.53,0.45,0.49,0.49,0.48,0.6,0.64,0.62,
        0.6,0.58,0.6,0.53,0.67,0.65,0.59,0.59,0.6,0.6,0.6,0.61,0.62,0.63,0.66,0.63];

    var Jan2020 = ["01-Jan-2020","02-Jan-2020","03-Jan-2020","04-Jan-2020","05-Jan-2020",
    "06-Jan-2020","07-Jan-2020","08-Jan-2020","09-Jan-2020","10-Jan-2020","11-Jan-2020",
    "12-Jan-2020","13-Jan-2020","14-Jan-2020","15-Jan-2020","16-Jan-2020","17-Jan-2020",
    "18-Jan-2020","19-Jan-2020","20-Jan-2020","21-Jan-2020","22-Jan-2020","23-Jan-2020",
    "24-Jan-2020","25-Jan-2020","26-Jan-2020","27-Jan-2020","28-Jan-2020","29-Jan-2020",
    "30-Jan-2020","31-Jan-2020"];

    var Jan2020F = [0.02, 0.02,0.02,0.02,0.02,0.02,0.02,0.03,0.02,0.02,0.02,0.02,0.02,0.02,0.02,
        0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02];

    var Jan2020H = [2.22,2.21,2.26,2.19,2.13,2.35,2.25,3.12,2.14,2.19,2.19,2.13,2.22,2.06,2.05,
        2.05,2.06,2.16,2.2,2.17,2.11,2.03,1.95,1.98,1.94,1.86,1.81,1.74,1.77,1.92,1.85];

    var Jan2020P = [0.37,0.38,0.36,0.38,0.42,0.39,0.41,0.41,0.39,0.41,0.42,0.4,0.39,0.42,0.43,
        0.44,0.44,0.43,0.43,0.42,0.44,0.45,0.46,0.45,0.43,0.43,0.43,0.42,0.45,0.45,0.44];

    var Jan2019 = ["01-Jan-2019","02-Jan-2019","03-Jan-2019","04-Jan-2019","05-Jan-2019",
    "06-Jan-2019","07-Jan-2019","08-Jan-2019","09-Jan-2019","10-Jan-2019","11-Jan-2019",
    "12-Jan-2019","13-Jan-2019","14-Jan-2019","15-Jan-2019","16-Jan-2019","17-Jan-2019",
    "18-Jan-2019","19-Jan-2019","20-Jan-2019","21-Jan-2019","22-Jan-2019","23-Jan-2019",
    "24-Jan-2019","25-Jan-2019","26-Jan-2019","27-Jan-2019","28-Jan-2019","29-Jan-2019",
    "30-Jan-2019","31-Jan-2019"];

    var Jan2019F = [0.02,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,
        0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.04,0.04,0.03,0.03];

    var Jan2019H = [2.97,2.97,2.95,2.95,2.92,2.86,2.67,2.66,2.72,2.71,2.65,2.64,2.69,2.61,2.51,
        2.47,2.44,2.42,2.45,2.37,2.34,2.75,2.7,2.62,2.66,2.83,2.88,2.97,3.02,2.87,2.79,2.72];

    var Jan2019P = [0.29,0.27,0.27,0.31,0.32,0.3,0.32,0.39,0.47,0.41,0.41,0.41,0.41,0.41,0.4,0.42,
        0.4,0.43,.41,0.41,0.41,0.41,0.4,0.41,0.4,0.41,0.4,0.66,0.56,0.39,0.38,];

    // Third chart
    Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Carbon emissions around the world (2014)'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: [{
            name: 'January 2019 Finished Water',
            data: [{
                name: "01-Jan-2019",
                value: Jan2019F[0]
            }, {
                name: "02-Jan-2019",
                value: Jan2019F[1]
            },
            {
                name: "03-Jan-2019",
                value: Jan2019F[2]
            },
            {
                name: "04-Jan-2019",
                value: Jan2019F[3]
            }, {
                name: "05-Jan-2019",
                value: Jan2019F[4]
            },
            {
                name: "06-Jan-2019",
                value: Jan2019F[5]
            },
            {
                name: "07-Jan-2019",
                value: Jan2019F[6]
            }, {
                name: "08-Jan-2019",
                value: Jan2019F[7]
            },
            {
                name: "09-Jan-2019",
                value: Jan2019F[8]
            },
            {
                name: "10-Jan-2019",
                value: Jan2019F[9]
            }, {
                name: "11-Jan-2019",
                value: Jan2019F[10]
            },
            {
                name: "12-Jan-2019",
                value: Jan2019F[11]
            },
            {
                name: "13-Jan-2019",
                value: Jan2019F[12]
            }, {
                name: "14-Jan-2019",
                value: Jan2019F[13]
            },
            {
                name: "15-Jan-2019",
                value: Jan2019F[14]
            },
            {
                name: "16-Jan-2019",
                value: Jan2019F[15]
            }, {
                name: "17-Jan-2019",
                value: Jan2019F[16]
            },
            {
                name: "18-Jan-2019",
                value: Jan2019F[17]
            },
            {
                name: "19-Jan-2019",
                value: Jan2019F[18]
            }, {
                name: "20-Jan-2019",
                value: Jan2019F[19]
            },
            {
                name: "21-Jan-2019",
                value: Jan2019F[20]
            },
            {
                name: "22-Jan-2019",
                value: Jan2019F[21]
            }, {
                name: "23-Jan-2019",
                value: Jan2019F[22]
            },
            {
                name: "24-Jan-2019",
                value: Jan2019F[23]
            },
            {
                name: "25-Jan-2019",
                value: Jan2019F[24]
            }, {
                name: "26-Jan-2019",
                value: Jan2019F[25]
            },
            {
                name: "27-Jan-2019",
                value: Jan2019F[26]
            },
            {
                name: "28-Jan-2019",
                value: Jan2019F[27]
            },
            {
                name: "29-Jan-2019",
                value: Jan2019F[28]
            },
            {
                name: "30-Jan-2019",
                value: Jan2019F[29]
            },
            {
                name: "31-Jan-2019",
                value: Jan2019F[30]
            }
            ]
        }, {
            name: 'January 2020 Finished Water',
            data: [{
                name: "01-Jan-2019",
                value: Jan2019F[0]
            }, {
                name: "02-Jan-2019",
                value: Jan2019F[1]
            },
            {
                name: "03-Jan-2019",
                value: Jan2019F[2]
            },
            {
                name: "04-Jan-2019",
                value: Jan2019F[3]
            }, {
                name: "05-Jan-2019",
                value: Jan2019F[4]
            },
            {
                name: "06-Jan-2019",
                value: Jan2019F[5]
            },
            {
                name: "07-Jan-2019",
                value: Jan2019F[6]
            }, {
                name: "08-Jan-2019",
                value: Jan2019F[7]
            },
            {
                name: "09-Jan-2019",
                value: Jan2019F[8]
            },
            {
                name: "10-Jan-2019",
                value: Jan2019F[9]
            }, {
                name: "11-Jan-2019",
                value: Jan2019F[10]
            },
            {
                name: "12-Jan-2019",
                value: Jan2019F[11]
            },
            {
                name: "13-Jan-2019",
                value: Jan2019F[12]
            }, {
                name: "14-Jan-2019",
                value: Jan2019F[13]
            },
            {
                name: "15-Jan-2019",
                value: Jan2019F[14]
            },
            {
                name: "16-Jan-2019",
                value: Jan2019F[15]
            }, {
                name: "17-Jan-2019",
                value: Jan2019F[16]
            },
            {
                name: "18-Jan-2019",
                value: Jan2019F[17]
            },
            {
                name: "19-Jan-2019",
                value: Jan2019F[18]
            }, {
                name: "20-Jan-2019",
                value: Jan2019F[19]
            },
            {
                name: "21-Jan-2019",
                value: Jan2019F[20]
            },
            {
                name: "22-Jan-2019",
                value: Jan2019F[21]
            }, {
                name: "23-Jan-2019",
                value: Jan2019F[22]
            },
            {
                name: "24-Jan-2019",
                value: Jan2019F[23]
            },
            {
                name: "25-Jan-2019",
                value: Jan2019F[24]
            }, {
                name: "26-Jan-2019",
                value: Jan2019F[25]
            },
            {
                name: "27-Jan-2019",
                value: Jan2019F[26]
            },
            {
                name: "28-Jan-2019",
                value: Jan2019F[27]
            },
            {
                name: "29-Jan-2019",
                value: Jan2019F[28]
            },
            {
                name: "30-Jan-2019",
                value: Jan2019F[29]
            },
            {
                name: "31-Jan-2019",
                value: Jan2019F[30]
            }
            ]
        }, {
            name: 'January 2021 Finished Water',
            data: [{
                name: "01-Jan-2019",
                value: Jan2019F[0]
            }, {
                name: "02-Jan-2019",
                value: Jan2019F[1]
            },
            {
                name: "03-Jan-2019",
                value: Jan2019F[2]
            },
            {
                name: "04-Jan-2019",
                value: Jan2019F[3]
            }, {
                name: "05-Jan-2019",
                value: Jan2019F[4]
            },
            {
                name: "06-Jan-2019",
                value: Jan2019F[5]
            },
            {
                name: "07-Jan-2019",
                value: Jan2019F[6]
            }, {
                name: "08-Jan-2019",
                value: Jan2019F[7]
            },
            {
                name: "09-Jan-2019",
                value: Jan2019F[8]
            },
            {
                name: "10-Jan-2019",
                value: Jan2019F[9]
            }, {
                name: "11-Jan-2019",
                value: Jan2019F[10]
            },
            {
                name: "12-Jan-2019",
                value: Jan2019F[11]
            },
            {
                name: "13-Jan-2019",
                value: Jan2019F[12]
            }, {
                name: "14-Jan-2019",
                value: Jan2019F[13]
            },
            {
                name: "15-Jan-2019",
                value: Jan2019F[14]
            },
            {
                name: "16-Jan-2019",
                value: Jan2019F[15]
            }, {
                name: "17-Jan-2019",
                value: Jan2019F[16]
            },
            {
                name: "18-Jan-2019",
                value: Jan2019F[17]
            },
            {
                name: "19-Jan-2019",
                value: Jan2019F[18]
            }, {
                name: "20-Jan-2019",
                value: Jan2019F[19]
            },
            {
                name: "21-Jan-2019",
                value: Jan2019F[20]
            },
            {
                name: "22-Jan-2019",
                value: Jan2019F[21]
            }, {
                name: "23-Jan-2019",
                value: Jan2019F[22]
            },
            {
                name: "24-Jan-2019",
                value: Jan2019F[23]
            },
            {
                name: "25-Jan-2019",
                value: Jan2019F[24]
            }, {
                name: "26-Jan-2019",
                value: Jan2019F[25]
            },
            {
                name: "27-Jan-2019",
                value: Jan2019F[26]
            },
            {
                name: "28-Jan-2019",
                value: Jan2019F[27]
            },
            {
                name: "29-Jan-2019",
                value: Jan2019F[28]
            },
            {
                name: "30-Jan-2019",
                value: Jan2019F[29]
            },
            {
                name: "31-Jan-2019",
                value: Jan2019F[30]
            }]
        }]
        }
    );

})};
getWaterData();
