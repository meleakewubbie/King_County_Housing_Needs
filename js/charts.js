let chartdata = [];
let populationdata = [];
let chartIDs = [];
function price_nom(){
    fetch("https://services.arcgis.com/ZOyb2t4B0UYuYNYH/arcgis/rest/services/Typology/FeatureServer/0/query?where=1%3D1&outFields=YEAR,PRICE_NOM&returnGeometry=false&outSR=4326&f=json")
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.features[100])
            console.log(data.features[255].attributes.YEAR)
            console.log(data.features[255].attributes.PRICE_NOM)
            chartdata = [];
            //chartdata[0] = "Single Family Home Sales Prices"
            for(let i = 0; i < data.features.length; i++)
            {
                let d = data.features[i].attributes;
                // console.log(d);
                if(d.YEAR == null || d.PRICE_NOM == null){ // should PRICE_NOM null be skipped?
                    continue;
                }
                if(chartdata[d.YEAR - 2006] != null)
                    chartdata[d.YEAR - 2006].pricenom += d.PRICE_NOM
                else{
                    chartdata[d.YEAR - 2006] = {};
                    chartdata[d.YEAR - 2006].year = d.YEAR
                    chartdata[d.YEAR - 2006].pricenom = d.PRICE_NOM
                }
            }
            console.log(chartdata);
            line_chart();
        })
}
//price_nom();

function line_chart(){
    let chart = c3.generate({
        bindto: '#chart_a',
        data: {
        columns: [
            ['Single Family Home Sales Prices', chartdata[0].pricenom, chartdata[1].pricenom, chartdata[2].pricenom, 
            chartdata[3].pricenom, chartdata[4].pricenom,chartdata[5].pricenom, chartdata[6].pricenom,
            chartdata[7].pricenom, chartdata[8].pricenom, chartdata[9].pricenom, chartdata[10].pricenom,
            chartdata[11].pricenom, chartdata[12].pricenom, chartdata[13].pricenom
            ]
        ]
        },
        axis: {
            x: {
                type: 'category',
                categories: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
            }
        }
    });
}

function median_income_tract(){
    fetch("https://gisdata.kingcounty.gov/arcgis/rest/services/OpenDataPortal/census__demographic_base_area_esj/MapServer/25491201/query?outFields=*&where=1%3D1&f=geojson")
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        console.log(data.features[100])
        
        //console.log(data.features[255].attributes.YEAR)
        //console.log(data.features[255].attributes.PRICE_NOM)
        chartdata = [];
        chartdata[0] = [] // y-values
        chartdata[1] = [] // x-values
        chartdata[0][0] = "Median_Income"
        chartdata[1][0] = "Tract"
        for(let i = 0; i < data.features.length - 1; i++)
        {
            let d = data.features[i].properties
            chartdata[0][i + 1] = d.MHHI1
            chartdata[1][i + 1] = d.GEO_ID_TRT.substring(5)
        }
        console.log(chartdata);
        scatter_chart();
    }) 
}

function scatter_chart(){
    let chart = c3.generate({
        bindto: '#chart_b',
        data: {
            xs: {
                Median_Income: 'Tract'
            },
            columns: [
                chartdata[1],
                chartdata[0]
            ],
            type: 'scatter'
        },
        axis: {
            x: {
                label: 'Tract',
                tick: {
                    fit: false
                }
            },
            y: {
                label: 'Median_Income'
            }
        }
    });
}

function demographics(){
// NOTE: Did not include "POC" in our data calculation
fetch("https://gisdata.kingcounty.gov/arcgis/rest/services/OpenDataPortal/census___base/MapServer/2549/query?outFields=*&where=1%3D1&f=geojson")
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        console.log(data.features[100])
        
        //console.log(data.features[255].attributes.YEAR)
        //console.log(data.features[255].attributes.PRICE_NOM)
        chartdata = [];
        chartdata[0] = ["North", "Mid", "South"] // x-values
        chartdata[1] = ["White", 0, 0, 0] // bar groups with y-values
        chartdata[2] = ["Black", 0, 0, 0] // bar groups with y-values
        chartdata[3] = ["Hispanic or Latino", 0, 0, 0] // bar groups with y-values
        chartdata[4] = ["Asian", 0, 0, 0] // bar groups with y-values
        chartdata[5] = ["Native American", 0, 0, 0] // bar groups with y-values
        chartdata[6] = ["Pacific Islander", 0, 0, 0] // bar groups with y-values
        chartdata[7] = ["2 Races Alone", 0, 0, 0] // bar groups with y-values
        chartdata[8] = ["Not Latino", 0, 0, 0] // bar groups with y-values
        for(let i = 0; i < data.features.length - 1; i++)
        {
            let d = data.features[i].properties
            let tract = parseInt(d.GEO_ID_TRT.substring(5))
            let n = 0;
            if(tract > 5500 && tract <= 9000){
                n = 1;
            }
            else if(tract > 9000){
                n = 2;
            }
            chartdata[1][n + 1] += d.WhiteAlone
            chartdata[2][n + 1] += d.BlackAlone
            chartdata[3][n + 1] += d.HispanicorLatino
            chartdata[4][n + 1] += d.AsianAlone
            chartdata[5][n + 1] += d.AIANAlone
            chartdata[6][n + 1] += d.NHOPIalone
            chartdata[7][n + 1] += d.TworacesAlone
            chartdata[8][n + 1] += d.NotLatino
        }
        console.log(chartdata);
        bar_chart();
    })
}

    function bar_chart(){
        let chart = c3.generate({
            bindto: '#chart_c',
            size: {
                height: 00,
                width: 1200
            },
            data: {
                columns: [
                    chartdata[1],
                    chartdata[2],
                    chartdata[3],
                    chartdata[4],
                    chartdata[5],
                    chartdata[6],
                    chartdata[7],
                    chartdata[8]
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            axis: {
                x: {
                    type: 'category',
                    categories: chartdata[0]
                },
                y: {
                    tick: {
                        count: 15
                    }
                }
            }
        });
    }


function median_rent_with_pop(){

    if(populationdata.length == 0){
        //fetch("https://gisdata.kingcounty.gov/arcgis/rest/services/OpenDataPortal/census__acs/MapServer/2593/query?outFields=*&where=1%3D1&f=geojson")
        fetch("https://gisdata.kingcounty.gov/arcgis/rest/services/OpenDataPortal/census___base/MapServer/2549/query?outFields=*&where=1%3D1&f=geojson")
        .then(response => {
            return response.json()
        })
        .then(data => {
            populationdata = data.features;

            median_rent();
        })
    }
}

function median_rent(){
    let chart_colors = [
      "rgb(250, 250, 110)",
      "rgb(156, 223, 124)",
      "rgb(74, 189, 140)",
      "rgb(0, 150, 142)",
      "rgb(16, 110, 124)",
      "rgb(160, 160, 160)"
    ];
    fetch("https://gisdata.kingcounty.gov/arcgis/rest/services/OpenDataPortal/census__acs/MapServer/2450/query?outFields=*&where=1%3D1&f=geojson")
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            console.log(data.features[100])
            chartdata = [];
            chartdata[0] = new Array("White");
            chartdata[1] = new Array("Asian");
            chartdata[2] = new Array("Hispanic or Latino");
            chartdata[3] = new Array("Black");
            chartdata[4] = new Array("Native American");
            chartdata[5] = new Array("Hawaiian");
            chartdata[6] = new Array("Mixed");
            chartdata[7] = new Array();
            
            for(let a = 0; a < chartdata.length - 1; a++){
                for(let n = 0; n < 5; n++){
                    chartdata[a].push(0);
                }
                chartdata[7][a] = chartdata[a][0]
            }
            chartdata[8] = ["$1115", "$1309", "$1476", "$1699", "$3309"]//, "Missing Data"]

            totalTracts = [0, 0, 0, 0, 0]

            console.log(populationdata[0].properties);

            //console.log(populationdata[100].properties);
            for(let i = 0; i < data.features.length; i++)
            {
                let d = data.features[i].properties;
                let rent = d.E25058232;
                // let num = 1;
                // //console.log(populationdata[i].properties.GEO_ID_TRT + "," + d.GEO_ID_TRT);
                // if(populationdata.length > 0){
                //     num = populationdata[i].properties.PWNH;
                // }
                let index = 5;

                /*if(rent == null || rent.length > 0){
                    index = 5;
                    totalTracts[index]++;
                }
                else */if(rent >= 0 && rent < 1115){
                    index = 0;
                    totalTracts[index]++;
                }
                else if(rent >= 1115 && rent < 1309){
                    index = 1;
                    totalTracts[index]++;
                }
                else if(rent >= 1309 && rent < 1476){
                    index = 2;
                    totalTracts[index]++;
                }
                else if(rent >= 1476 && rent < 1699){
                    index = 3;
                    totalTracts[index]++;
                }
                else if(rent >= 1699 && rent < 3309){
                    index = 4;
                    totalTracts[index]++;
                }
                index++; // lazy fix

                chartdata[0][index] += populationdata[i].properties.PWNH;
                chartdata[1][index] += populationdata[i].properties.PANH;
                chartdata[2][index] += 100 - populationdata[i].properties.PHL;
                chartdata[3][index] += populationdata[i].properties.PBNH;
                chartdata[4][index] += populationdata[i].properties.PAINH;
                chartdata[5][index] += populationdata[i].properties.PHNH;
                chartdata[6][index] += populationdata[i].properties.P2NH;
            }
            
            for(let r = 0; r < chartdata.length - 2; r++){
                for(let b = 1; b < chartdata[r].length; b++){
                    chartdata[r][b] /= totalTracts[b - 1];
                }
                chartdata[r].pop();
            }

            console.log(chartdata);
            stacked_bar_chart();
            // pie_chart();
        })
}

//stacked bar chart function for median rent 
function stacked_bar_chart(){
    let chartid = '#chart_median_rent'
    var chart = c3.generate({
        bindto: chartid,
        data: {
        columns: [
            chartdata[0],
            chartdata[1],
            chartdata[2],
            chartdata[3], 
            chartdata[4], 
            chartdata[5],
            chartdata[6],
        ],
        type: 'bar',
        groups: [
            chartdata[7]
        ]
    },
    axis: {
        x: {
            type: 'category',
            categories: chartdata[8]
        }
    },
    grid: {
        y: {
            lines: [{value:0}]
        }
    },
    colors : {
        "$0-$1115":"#FAFA6E",
        "$1115-$1309":"#9CDF7C",
        "$1309-$1476":"#4ABD8C",
        "$1476-$1699":"#00968E",
        "$1699-$3309":"#106E7C",
        "Missing Data":"#A0A0A0"
    },
    size : {
        width: 275
    }
});
chart.load({
    done: function(){

document.getElementById("toggle_chart").addEventListener("click", toggle_chart)
document.getElementById('chart_median_rent').style.display = "none"
document.getElementById("toggle_chart").innerHTML = "show chart"
chartIDs = Array('chart_median_rent')
    }
})
}


function pie_chart(){
    var chart = c3.generate({
        bindto: '#chart_median_rent',
        data: {
            // iris data from R
            columns: [
                chartdata[0],chartdata[1],chartdata[2],chartdata[3],chartdata[4], chartdata[5]
            ],
            legend:{
                show:false
            },
            type : 'pie',
            colors : {
                "$0-$1115":"#FAFA6E",
                "$1115-$1309":"#9CDF7C",
                "$1309-$1476":"#4ABD8C",
                "$1476-$1699":"#00968E",
                "$1699-$3309":"#106E7C",
                "Missing Data":"#A0A0A0"
            }
        }
    });
}

function toggle_chart(e){
    for(let i = 0; i < chartIDs.length; i++){
        let chart = document.getElementById(chartIDs[i])
        if(chart.style.display == "block"){
            chart.style.display= "none"
            e.target.innerHTML = "show chart"
        } else{
            chart.style.display = "block"
            e.target.innerHTML = "hide chart"
        }
    }
}

