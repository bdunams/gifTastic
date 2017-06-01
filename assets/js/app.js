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
    car.addClass("cars btn btn-info");
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
  
  $('#car-gifs').empty();
  
  var person = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
    
      console.log(response);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(p);
        gifDiv.prepend(personImage);

        $("#car-gifs").prepend(gifDiv);
      }
    });
});

$("#add-car").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var car = $("#car-input").val().trim();

  // The movie from the textbox is then added to our array
  cars.push(car);

  // Calling renderButtons which handles the processing of our movie array
  createButtons();

});