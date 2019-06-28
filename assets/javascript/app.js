$(document).ready(function () {
  // array of Lakers players
  var players = ["Shaq", "Kobe Bryant", "Lebron James", "Lance Stephenson", "Anthony Davis"];

  // nba players function
  function displayNbaPlayers() {

    var nba = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nba + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      $("#nbaview").empty();

      var results = response.data;

      // Retrieving the Rating
      console.log(response);

      // Loops 
      for (var i = 0; i < results.length; i++) {


        var nbaDiv = $("<div>");

        // Make the class for style.css
        nbaDiv.addClass("nbapictures");

        // Creates an element to have the rating displayed
        var rating = results[i].rating;
        var p = $("<h2>").text("Rating: " + rating);

        // The Images can be still or animate
        var nbaImage = $("<img>");
        nbaImage.attr("src", results[i].images.fixed_height_still.url);
        nbaImage.attr("data-animate", results[i].images.fixed_height.url);
        nbaImage.attr("data-still", results[i].images.fixed_height_still.url);
        nbaImage.attr("data-state", "still");
        nbaImage.addClass('nbaImage');

        // Displays the rating
        nbaDiv.prepend(p);

        // Displays the Image
        nbaDiv.prepend(nbaImage);
        $("#nbaview").prepend(nbaDiv);
      }

      $(".nbaImage").on("click", function () {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  // display nba funciton
  function renderButtons() {

    // Deletes the movies prior to adding new giphys

    $("#nbabuttons").empty();

    for (var i = 0; i < players.length; i++) {

      // generates buttons for each movie in the array

      var nbaADD = $("<button>");

      // Adds a class to buttons
      nbaADD.addClass("nba");

      // Added data-attribute
      nbaADD.attr("data-name", players[i]);

      // Provided the initial button text
      nbaADD.text(players[i]);

      // Added the button to the buttons-view div
      $("#nbabuttons").append(nbaADD);
    }

  }

  // This function handles click events
  $("#add-nbaPlayer").on("click", function (event) {
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var nba = $("#nba-input").val().trim();


    players.push(nba);


    renderButtons();
  });

  // Adding click event "
  $(document).on("click", ".nba", displayNbaPlayers);

  // Calling the renderButtons function
  renderButtons();
});
