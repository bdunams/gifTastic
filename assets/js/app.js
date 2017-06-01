// initial cars available
var cars = ['Ford Mustang', 'Dodge Challenger', 'Chevy Camaro','Dodge Charger','Audi A7'];

// Function for displaying cars buttons
function createButtons() {
  
  // to prevent duplicates
  $("#buttons").empty();

  // Loops through the array of cars
  for (var i = 0; i < cars.length; i++) {

    // creates html button element
    var car = $("<button>");
    // Adds a classes to button
    car.addClass("cars btn btn-danger");
    // Added a data-attribute
    car.attr("data-name", cars[i]);
    // Button text
    car.text(cars[i]);
    // Added the button to the buttons-view div
    $("#buttons").append(car);
  }
};
// initialize buttons
createButtons();

$(document).on("click","button", function() {
  
  // to prevent duplicates and overflow
  $('#car-gifs').empty();
  
  var person = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      // loop through the results from giphy
      for (var i = 0; i < results.length; i++) {
        // create div for each result
        var carDiv = $("<div class='item'>");
        // get rating for each
        var rating = results[i].rating;
        // create p element with rating in it
        var p = $("<p>").text("Rating: " + rating);
        // create img element with src as each gif url
        var carImage = $("<img>");
        carImage.attr("src", results[i].images.fixed_height.url);

        carDiv.append(p);
        carDiv.append(carImage);

        $("#car-gifs").prepend(carDiv);
      }
    });
});

$("#add-car").on("click", function(event) {
  // This line of code will grab the input from the textbox
  event.preventDefault();

  // store data in input
  var car = $("#car-input").val().trim();

  // The car from the textbox is then added to our array
  cars.push(car);

  // Calling createButtons which handles the processing of our car array
  createButtons();

});