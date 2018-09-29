// Global Variables
let topics = ["Dog", "Cat", "Snake", "Horse", "Zebra", "Lion", "White Tiger"];
let gifStill = [];
let gifActive = [];
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

    // Delete current image row to replace with updated one.
    $("#imagesRow").empty();

    $.ajax({

        url: giphyURL + topicID,
        method: "GET"

    }).then(function (response) {

        // Log response to verify data.
        console.log(response);

        for (let imageMax = 0; imageMax < 12; imageMax++) {

            let image = $("<img>");
            let imageDiv = $("<div>");
            let nameParagraph = $("<p>")
            let ratingParagraph = $("<p>")
            let indexNumber = response.data.findIndex(p => p.id == response.data[imageMax].id)

            gifStill.push(response.data[imageMax].images.fixed_width_still.url);
            gifActive.push(response.data[imageMax].images.fixed_width.url);

            image.attr("src", response.data[imageMax].images.fixed_width_still.url);
            image.attr("class", "image-container gif-click");
            image.attr("id", response.data[imageMax].id)
            image.attr("object-num", indexNumber);
            image.attr("gif-state", "still");

            imageDiv.attr("class", "col-xl-3 row-spacer");
            nameParagraph.text("Title: " + response.data[imageMax].title)
            ratingParagraph.text("Rating: " + response.data[imageMax].rating)

            imageDiv.append(image, nameParagraph, ratingParagraph);
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

// Click event that fires when user clicks a button
$(document).on("click", ".gif-topic", function () {

    gifStill = [];
    gifActive = [];

    giphyMagic(this.id);

});

$(document).on("click", ".gif-click", function () {

    let imageID = this.id;
    let indexID = $("#" + imageID).attr("object-num");
    let gifState = $("#" + imageID).attr("gif-state");

    if (gifState === "still") {

        console.log("CLICKED ON")

        $("#" + imageID).attr("src", gifActive[indexID]);
        $("#" + imageID).attr("gif-state", "active");

    } else {

        console.log("CLICKED OFF")

        $("#" + imageID).attr("src", gifStill[indexID]);
        $("#" + imageID).attr("gif-state", "still");

    }

});