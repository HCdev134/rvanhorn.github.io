// Global Variables
let topics = ["Dog", "Cat", "Snake", "Horse", "Zebra", "Lion", "White Tiger"];
let api = "pIifEIp1TjKSGmZwOnpzedQIOGMR2xBe";
let giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api + "&q=";

let newButton;
let buttonRow = $("#buttonsRow");

// Call createButtons to create initial buttons. 
createButtons()

function createButtons() {

    // Delete current button row to replace with updated one.
    $("#buttonsRow").empty();

    for (let i = 0; i < topics.length; i++) {

        console.log(topics.length)

        newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.attr("id", topics[i]);
        newButton.attr("class", "btn btn-primary gif-topic");
        buttonRow.append(newButton);
    }
}

// AJAX call to make Giphy magic.
function giphyMagic(topicID) {
    
    $.ajax({

        url: giphyURL + topicID,
        method: "GET"

    }).then(function (response) {

        // Log response to verify data.
        console.log(response);

        // Delete current image row to replace with updated one.
        $("#imagesRow").empty();

        for (let imageMax = 0; imageMax < 12; imageMax++) {

            let image = $("<img>");
            image.attr("src", response.data[imageMax].images.fixed_width.url);
            image.attr("class", "image-container");

            let imageDiv = $("<div>");
            imageDiv.attr("class", "col-xl-3 row-spacer");

            imageDiv.append(image);
            $("#imagesRow").append(imageDiv);

        }
    });
}

$("#addNewGif").on("click", function (event) {

    event.preventDefault();

    let newGif = $("#user-input").val().trim();
    topics.push(newGif);
    createButtons();

});

$(document).on("click", ".gif-topic", function () {
    giphyMagic(this.id);
});