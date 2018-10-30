// Required
require("dotenv").config();
let keys = require('./keys');
let Spotify = require('node-spotify-api');
let request = require("request");
let moment = require('moment');

// Global Variables
let userInput = "";
let type = process.argv[2];
let spotifyInfo = new Spotify(keys.spotify);

// Check for user inputs and add them to our variable.
for (let i = 3; i < process.argv.length; i++) {

	userInput += process.argv[i] + " ";

}

// If user does not specify the type, select a random one.
if (type === undefined) {

	let randomNumber = Math.floor((Math.random() * 3) + 1);

	if (randomNumber === 1) {

		type = "spotify-this-song";

	} else if  (randomNumber === 2) {

		type = "concert-this";

	} else if  (randomNumber === 3) {

		type = "movie-this";

	}

}

if (type === 'spotify-this-song') {

	if (userInput === "") {

		userInput = "The Sign";

	}

	spotifyInfo.search({type: 'track', query: userInput}, function (err, data) {

		if (err) {

			return console.log('Error occurred: ' + err);

		}

		// Check for a perfect match.
		for (let i = 0; i < data.tracks.items.length; i++) {

			if (userInput.trim().toLowerCase() === data.tracks.items[i].name.toLowerCase()) {

				console.log('------------- Spotify (Exact Match) -------------');
				console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
				console.log("Song Name: " + data.tracks.items[i].name);
				console.log("Album: " + data.tracks.items[i].album.name);
				console.log("Preview Link: " + data.tracks.items[i].external_urls.spotify);
				return;

			}

		}

		// If no perfect match, just return the first result.
		console.log('------------- Spotify (First Result/Blank Input) ------------- ');
		console.log("Artist Name : " + data.tracks.items[0].artists[0].name);
		console.log("Song Name : " + data.tracks.items[0].name);
		console.log("Album Name : " + data.tracks.items[0].album.name);
		console.log("Preview URL : " + data.tracks.items[0].external_urls.spotif);

	});

} else if (type === 'concert-this') {

	if (userInput === "") {

		userInput = "marshmellow";

	}

	console.log(userInput);

	let bandsURL = 'https://rest.bandsintown.com/artists/' + userInput.trim() + '/events?app_id=codingbootcamp';

	request(bandsURL, function (err, response, body) {

		if (err) {

			console.log(err)

		}

		let x = JSON.parse(body);

		x.forEach(element => {

			console.log('------------- Next Concert -------------');
			console.log("Event Venue: " + element.venue.name);
			console.log("Event Location: " + element.venue.city + "," + element.venue.region);
			console.log("Event Date: " + moment(element.datetime).format('MM/DD/YYYY'));
			console.log("----------------------------------------")

		});
	});

} else if (type === "movie-this") {

	if (userInput === "") {

		userInput = "Mr. Nobody";

	}

	let omdbURL = "http://www.omdbapi.com/?apikey=" + keys.omdb.id + "&t=";

	request(omdbURL + userInput.trim(), function (err, response, body) {

		console.log('------------- Movie Ifo ------------- ');
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("IMDB: " + JSON.parse(body).imdbRating);
		console.log("Country Produced: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);

	})
}