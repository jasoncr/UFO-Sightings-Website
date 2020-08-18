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
var table = d3.select("table");
var tbody = d3.select("tbody");

//loop through each array and add to the table
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

//select the form
var form = d3.select("form")

//create event handlers
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    var tr = d3.select("tr")
    console.log(tr)
    //var filteredData = tableData.filter(data => data.datetime === inputValue);
    
    /*for (i = 0; i < datetime.length; i++) {
        var fullname = tableData[i].getElementsByTagName("td");
        if (fullname === inputValue) {
            tableData[i].style.display = "";
        } 
        else {
            tableData[i].style.display = "none";
        }
    }*/
    
    for (i = 1; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";
    
        td = tr[i].getElementsByTagName("td");
        console.log(td)
        for (var j = 0; j < td.length; j++) {
            cell = tr[i].getElementsByTagName("td")[j];
            if (cell.innerHTML === inputValue) {
                tr[i].style.display = "";
                break;
            } 
        }
    }
}
/*
(function(document) {
            'use strict';

            var TableFilter = (function(myArray) {
                var search_input;

                function _onInputSearch(e) {
                    search_input = e.target;
                    var tables = document.getElementsByClassName(search_input.getAttribute('data-table'));
                    myArray.forEach.call(tables, function(table) {
                        myArray.forEach.call(table.tBodies, function(tbody) {
                            myArray.forEach.call(tbody.rows, function(row) {
                                var text_content = row.textContent.toLowerCase();
                                var search_val = search_input.value.toLowerCase();
                                row.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
                            });
                        });
                    });
                }

                return {
                    init: function() {
                        var inputs = document.getElementsByClassName('search-input');
                        myArray.forEach.call(inputs, function(input) {
                            input.oninput = _onInputSearch;
                        });
                    }
                };
            })(Array.prototype);

            document.addEventListener('readystatechange', function() {
                if (document.readyState === 'complete') {
                    TableFilter.init();
                }
            });

        })(document);
*/