// from data.js
var tableData = data;

// Create empty arrays to store the table values
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

// create table from the arrays
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

//create event handlers
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElementDate = d3.select("#datetime");
    var inputElementCity = d3.select("#city");
    // Get the value property of the input element
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value").toLowerCase();

    if (inputValueDate != "" && inputValueCity != "") {
        var filteredData = tableData.filter(data => data.datetime === inputValueDate 
            && data.city.toLowerCase() === inputValueCity);
    }
    else if (inputValueDate === "" && inputValueCity != "") {
        var filteredData = tableData.filter(data => data.city === inputValueCity.toLowerCase());
    }
    else if (inputValueDate != "" && inputValueCity === "") {
        var filteredData = tableData.filter(data => data.datetime === inputValueDate);
    };

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