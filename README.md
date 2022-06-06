# Housing Prices in King County, Washington
## Project Introduction
The term gentrification is defined as the process of urban development in which a city neighborhood develops rapidly over a short time, changing from low to high value. The process of gentrification can bring a lot of benefits to a neighborhood, such as promoting physical and institutional improvements, reducing rates of crime, and providing additional economic opportunities. However, simultaneously, gentrification raises concerns about its health impacts on long-time residents who stay or are forced to move from their original neighborhoods. This is due to the negative effects that gentrification can produce, such as the loss of affordable housing and increased living costs. Due to the lack of affordable housing in recent years, we want to research the distribution of rental prices across King County in Washington State. Specifically, we want to focus on comparing rental prices, median income levels, and population demographics. Based on the datasets found, the project will be based on the census tract level. The goal of this project is to provide our target audience with several informative map visualizations that will possibly influence city policies, development, and decision-making that will better serve current and future King County residents.

## Project Goals

- Provide basic rent prices information to local residents looking to rent, out-of-state employees looking to move into the city, and people looking to move to Seattle to start a family. 

- Bring awareness to the potential negative effects of gentrification on housing and provide an overview of the rental situation in King County, Washington so that the decision-makers can make relevant decisions to benefit the people with the current housing situation.

## Primary Functions
- Created an interactive hovering features that displays rent, income, and demographic information when the user is over a      given Census Tract. 
- Display charts on each map's pop-out window to give additional context about the thematic layer.
- Create multiple maps with different data to draw meaningful conclusions about the changes in the King County region.

## Target Audience
The target audience for our projects is local residents looking for a place to rent, out-of-state employees looking to move into the city, and people looking to move to Seattle to start a family. In addition, we want the policymakers to see this map to be aware of the rising housing costs in King County, Washington, and make relevant policies to benefit different demographic groups.

## Multimedia
We used an image on the homepage of our dashboard project to stress the housing needs in the King County area. We will also include hyperlinks to the datasets we used on our 'data sources' page which will give users direct access to the open data portals we sourced the datasets from.

## Project Format: Smart Dashboard
#### Map Projection, Map Zoom Levels, Center.
- This project will use the WGS 84/Pseudo-Mercator projection. 
- The map’s minimum zoom level will be 1, and the maximum zoom level will be around 15, depending on the time it takes to generate the tiles. Ideally, the more, the better. 
- The center of the map will be set at [47.4392,-121.7830]

#### Description of the Basemap
We plan to use the Mapbox monochrome dark base map. This was inteded to mute uneccessary features add to the more bleak topic of our map project.

#### Description of the Thematic Layers
##### The used visual strategies: choropleth, proportional symbols, etc:
- Median rent prices, Median income, and the population by race will be visualized using a choropleth thematic layers.

##### The supporting data sets for each thematic map layer:
- [Median Contract Rent by Census Tract](https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::acs-median-contract-rent-dollars-acs-b25058-mediancontractrent/explore?location=47.430693%2C-121.809050%2C10.67&showTable=true)
- [Basic demographics by Census Tracts in King County based on 2012 - 2016 American Community Survey 5 Year Average (includes population by race and median household income )](https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::demographic-base-demographic-base-area/explore?location=47.428449%2C-121.802498%2C10.00&showTable=true)

##### Vector or raster layer. If it is a vector, which data attribute to use? If raster, which zoom level and presumed bounding box to use?
We will have a vector layer and will use shape length and shape area of the census tracts as polygon boundaries.

#### Proposed Interactive Functions
- Have a pop-up description when hovering over areas of interest to show the information such as demographics and home sale-related information.
- Access supporting charts that give additional context about the map's thematic layer
- include links to data sources on each map page

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
