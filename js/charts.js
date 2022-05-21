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