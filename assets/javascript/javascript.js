$(document).ready(function () {
    // All this starts here:

    /* THIS IS HOW I WAS ATTEMPTING TO DYNAMICALLY LOAD THE BUTTONS BUT I COULDN´T

    var animalList = ["Dog",
        "Cat",
        "Rabbit",
        "Hamster",
        "Skunk",
        "Goldfish",
        "Bird",
        "Ferret",
        "Turtle",
        "Sugar Glid",
        "Chinchilla",
        "Hedgehog",
        "Hermit Crab",
        "Gerbil",
        "Pygmy Goat",
        "Chicken",
        "Capybara",
        "Teacup Pig",
        "Serval",
        "Salamander",
        "Frog"]

    //Function for displaying the buttons
    function makeButtons() {

        $("#listAnimalBttns").empty();

        //Loops through the desserts array and creates buttons for each
        for (var i = 0; i < animalList.length; i++) {

            var button = $("<button>")

            button.addClass("btn btn-success btn-block");
            button.attr();
            button.text(animalList[i]);

            $("#listAnimalBttns").append(button);
        }
    };*/


    // Adding click event listen listener to all buttons
    $('button').on("click", function () {
        // Grabbing and storing the text property value from the button
        var BtnText = $(this).text().trim();

        //Constructing a queryURL using the text that is stored in BtnText
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + BtnText + "&api_key=*/YOUR KEY*/";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var animalDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var animalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    animalImage.attr({
                        src: results[i].images.fixed_height.url,
                        "data-still": results[i].images.fixed_height.url,
                        "data-animate": results[i].images.fixed_height.url,
                        "data-state": "still",
                        class: "gif",
                    })


                    //Appending the paragraph and image tag to the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                }



                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $('#displayResults').append(animalDiv);

                $('#add-nBtnAnimal').on("click", function () {
                    event.preventDefault();
                    //This is storing in a variable whatever text is on the label of the page
                    var animalNameBtn = $("#new-animal-name").val().trim();
                    console.log(animalNameBtn);

                    var button = $("<button>")
                    button.attr({ type: "button", class: "btn btn-success btn-block", text: animalNameBtn })
                        .text(animalNameBtn)
                        .appendTo("#listAnimalBttns");

                    //Clears the text box after clicking Add Animal
                    $('#new-animal-name').val('');
                });


                $(".gif").on("click", function () {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });


            });

    });

});
    //--------------------------------------------------------------------------------------------------

    // All this ends here