# Housing Prices in King County, Washington
## Project Idea
The term gentrification is defined as the process of urban development in which a city neighborhood develops rapidly over a short time, changing from low to high value. The process of gentrification can bring a lot of benefits to a neighborhood, such as promoting physical and institutional improvements, reducing rates of crime, and providing additional economic opportunities. However, at the same time, gentrification raises questions about its health impacts on the residents who stayed or moved from their original neighborhoods due to the negative effects that gentrification brought, such as the loss of affordable housing and increased living costs. 

Because of the increase in housing prices, we want to research the housing prices in King County in Washington State. Specifically, we want to focus on comparing housing prices, income levels, population demographics, and changes in housing prices over time. Based on the datasets found, the project will be based on the census tract level. The goal of this project is to provide our target audience with several informative map visualizations that will possibly influence city policies, development, and decision-making that will better serve current and future King County residents.

## Project Significance and Broader Impacts

This project aims to provide basic housing prices information to local residents looking to buy houses, out-of-state employees looking to move into the city, and people looking to move to Seattle to start a family. Another important goal of this project is to bring awareness to the potential negative effects of gentrification on housing and provide an overview of the housing situation in King County, Washington so that the decision-makers can make relevant decisions to benefit the people with the current housing situation.

One potentially negative impact of this project is that the type of housing for this project is single-family houses. It might confuse the audience with other housing types, such as multi-family houses or apartments. This can be avoided by clarifying the type of housing done in this project in the introduction portion.

## Major Data Sources
- [Single-Family Home Sale Prices by Census Tract](https://data-seattlecitygis.opendata.arcgis.com/datasets/SeattleCityGIS::single-family-home-sale-prices-by-census-tract/explore?location=47.614125%2C-122.336870%2C10.89)
- [Median Household Income by Census Tract in King County by Census Tract](https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::median-household-income-1/explore?location=47.430392%2C-121.802498%2C10.67&showTable=true)
- [Demographics of King County](https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::demographic-base-demographic-base-area/explore?location=47.429699%2C-121.802498%2C10.11&showTable=true)

## Primary Functions
- Have a pop-up description when hovering over areas of interest to show the information such as demographics and home sale-related information.
- Have a slider that will allow users to see the sing-family home sale prices from 2006 to 2019.
- Have different thematic layers so that users can switch between to show relationships between various population demographics and housing prices.

## Target Audience
The target audience for our projects is local residents looking to buy houses, out-of-state employees looking to move into the city, and people looking to move to Seattle to start a family. In addition, we want the policymakers to see this map to be aware of the rising housing costs in King County, Washington, and make relevant policies to benefit different demographic groups.

## Potential Multimedia
We will use an image on the homepage of our dashboard project to stress the housing needs in the King County area. We will also include hyperlinks to the datasets we used on our 'data sources' page which will give users direct access to the open data portals we sourced the datasets from.

## Project Format: Smart Dashboard
#### Map Projection, Map Zoom Levels, Center.
- This project will use the WGS 84/Pseudo-Mercator projection. 
- The map’s minimum zoom level will be 1, and the maximum zoom level will be around 15, depending on the time it takes to generate the tiles. Ideally, the more, the better. 
- The center of the map will be set at [47.4392,-121.7830]

#### Description of the Basemap
We plan to use the Mapbox monochrome dark base map. 

#### Description of the Thematic Layers
##### The used visual strategies: choropleth, proportional symbols, etc:
- Single-family home sale prices will be visualized using a choropleth thematic layer. Median household income will be visualized using a proportional symbols thematic layer.
##### The supporting data sets for each thematic map layer:
- [Single-Family Home Sale Prices by Census Tract](https://data-seattlecitygis.opendata.arcgis.com/datasets/SeattleCityGIS::single-family-home-sale-prices-by-census-tract/explore?location=47.614125%2C-122.336870%2C10.89)
- [Median Household Income by Census Tract in King County by Census Tract](https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::median-household-income-1/explore?location=47.430392%2C-121.802498%2C10.67&showTable=true)
- [Demographics of King County](https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::demographic-base-demographic-base-area/explore?location=47.429699%2C-121.802498%2C10.11&showTable=true)

##### Vector or raster layer. If it is a vector, which data attribute to use? If raster, which zoom level and presumed bounding box to use?
We will have a vector layer and will use shape length and shape area of the census tracts as polygon boundaries.

#### Proposed Interactive Functions
- Have a pop-up description when hovering over areas of interest to show the information such as demographics and home sale-related information.
- Have a slider that will allow users to see the sing-family home sale prices from 2006 to 2019.

#### How to arrange all the components on the graphical user interface (GUI)?
- We plan to arrange our project’s introduction on our main page of the dashboard. We will then have tabs on the top right which users can click on to access other pages. We will create a separate map page which will display our main choropleth map visualization displaying Housing prices in King County. Here we will also include most of our interactive map elements. Next, we will have an “About Us” page introducing our project team and acknowledging the course teaching team. Then, we will have a tab citing the data sources that we used for our project. Other added pages we may include are additional maps and charts to highlight other attributes in our dataset.
- [Figma Prototype](https://www.figma.com/file/EDlWdiztSAazwZ3pKoEPQg/GEOG-458?node-id=0%3A1)

#### What are the coordinated charts you plan to make?
##### Javascript that supports the making of a chart
We will be using C3.js in order to make the chart.
##### Type of chart
Some bar charts and line charts will be created
##### Data Attributes to be Visualized
- A line graph will visualize the trend of average nominal price change and average nominal of single-family houses over the years. 
- A bar graph will visualize the number of single-family house sales per year. 
- The trend of the average sale price per square foot and average sale price per square foot change of single-family houses over the years.
