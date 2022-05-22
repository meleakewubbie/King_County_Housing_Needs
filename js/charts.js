let chartdata = [];
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
