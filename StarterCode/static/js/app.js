// from data.js
var tableData = data;

// Create empty arrays to store the data table values
var datetime = [];
var city = [];
var state = [];
var country = [];
var shape = [];
var durationMinutes = [];
var comments = [];

// Iterate through each document in data
tableData.forEach((data) => {
  // Iterate through each key and value
  Object.entries(data).forEach(([key, value]) => {
    // Use the key to determine which array to push the value to
    if (key === "datetime") {
      datetime.push(value);
    }
    else if (key == "city") {
        city.push(value)
    }
    else if (key == "state") {
        state.push(value)
    }
    else if (key == "country") {
        country.push(value)
    }
    else if (key == "shape") {
        shape.push(value)
    }
    else if (key == "durationMinutes") {
        durationMinutes.push(value)
    }
    else {
      comments.push(value);
    }
   });
});

// create table for the arrays
var tbody = d3.select("tbody");

// loop through each array and add each element to the table
for (var i = 0; i < datetime.length; i++) {
    var row = tbody.append("tr");
    row.append("td").text(datetime[i]);
    row.append("td").text(city[i]);
    row.append("td").text(state[i]);
    row.append("td").text(country[i]);
    row.append("td").text(shape[i]);
    row.append("td").text(durationMinutes[i]);
    row.append("td").text(comments[i]);
}

// select the button 
var button = d3.select("#filter-btn");
// select the form
var form = d3.select("form")

// create event handlers
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
    
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element(s) and get the raw HTML nodes
    var inputElementDate = d3.select("#datetime");
    var inputElementCity = d3.select("#city");
    var inputElementState = d3.select("#state");
    // Get the value property of the input element(s)
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value").toLowerCase();
    var inputValueState = inputElementState.property("value").toLowerCase();


    //Conditionals to accomodate which filter is being used
    // date, city, state supplied
    if (inputValueDate != "" && inputValueCity != "" && inputValueState != "") {
        var filteredData = tableData.filter(data => data.datetime === inputValueDate 
            && data.city.toLowerCase() === inputValueCity
            && data.state.toLowerCase() === inputValueState);
        console.log("filtered on : date, city, state")
    }
    // date not supplied
    else if (inputValueDate === "") {
        // city not supplied
        if (inputValueCity === "") {
            // only state
            var filteredData = tableData.filter(data => data.state === inputValueState.toLowerCase());
            console.log("filtered on : state")
        }
        // state not supplied
        else if (inputValueState === "") {
            // only city
            var filteredData = tableData.filter(data => data.city === inputValueCity.toLowerCase());
            console.log("filtered on : city")
        } else {
            // filter on city and state
            var filteredData = tableData.filter(data => data.city.toLowerCase() === inputValueCity
            && data.state.toLowerCase() === inputValueState);
            console.log("filtered on : city, state")
        }
    }
    // city not supplied
    else if (inputValueCity === "") {
        // state not supplied
        if (inputValueState === "") {
            // only date
            var filteredData = tableData.filter(data => data.datetime === inputValueDate);
            console.log("filtered on : date")
        } else {
            // filter on date and state
            var filteredData = tableData.filter(data => data.datetime === inputValueDate
            && data.state.toLowerCase() === inputValueState);
            console.log("filtered on : date, state")
        }
    }
    // state not supplied
    else if (inputValueState === "") {
        // filter on date and city
        var filteredData = tableData.filter(data => data.datetime === inputValueDate
        && data.city.toLowerCase() === inputValueCity);
        console.log("filtered on : date, city")
    }

    // Clears the old table body to be replaced with a new
    tbody.remove()

    // Selects the table and body
    table = d3.select("table")
    tbody = d3.select("tbody")
    // Adds a new table body to then add the rows and information based on filtered data
    table.append("tbody")

    // Renders the new data based off of date entered
    for (var i = 0; i < filteredData.length; i++) {
        //adds rows to hold the data
        row = d3.select("table>tbody").append("tr")
        
        row.append("td").text(filteredData[i]['datetime']);
        row.append("td").text(filteredData[i]['city']);
        row.append("td").text(filteredData[i]['state']);
        row.append("td").text(filteredData[i]['country']);
        row.append("td").text(filteredData[i]['shape']);
        row.append("td").text(filteredData[i]['durationMinutes']);
        row.append("td").text(filteredData[i]['comments'])
    }
}