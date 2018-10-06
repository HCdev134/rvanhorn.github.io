// Setup Firebase.
let config = {
	apiKey: "AIzaSyBHA803hP_yOfnm7Aobbcj_-9Fb64ePH7s",
	authDomain: "battlestarblazer.firebaseapp.com",
	databaseURL: "https://battlestarblazer.firebaseio.com",
	projectId: "battlestarblazer",
	storageBucket: "battlestarblazer.appspot.com",
	messagingSenderId: "326290665976"
};

firebase.initializeApp(config);

// Global Variables
let database = firebase.database();

let trainName = $("#train-name");
let trainDestination = $("#train-destination");
let trainFirstDeparture = $("#train-first-departure");
let trainFrequency = $("#train-frequency");

$(document).ready(function() {

	// Get current trains from Firebase.
	updateTrains();

	setInterval(function() {
		updateTrains();
	}, 3 * 1000);

	// Add a new train.
	$("#new-train").submit(function(event) {

		event.preventDefault();
		database.ref().push({

			trainNameFB: trainName.val(),
			trainDestinationFB: trainDestination.val(),
			trainFirstDepartureFB: trainFirstDeparture.val(),
			trainFrequencyFB: trainFrequency.val()

		});

		$("#new-train").trigger("reset");

	});
});

function updateTrains() {

	$("#table-train-info").empty();
	database.ref().on("child_added", function(snapshot) {

		// Generate table contents.
		let tableTR = $("<tr>");
		let tableName = $("<td>");
		let tableDestination = $("<td>");
		let tableFrequency = $("<td>");
		let tableNextDeparture = $("<td>");
		let tableMinutesAway = $("<td>");

		// Use MomentsJS to convert time.
		let initialTrain = snapshot.val().trainFirstDepartureFB;
		let initialConverted = moment(initialTrain, "HH:mm").subtract(1, "years");
		let diff = moment().diff(moment(initialConverted), "minutes");
		let apart = diff % snapshot.val().trainFrequencyFB;
		let minutesAway = snapshot.val().trainFrequencyFB - apart;
		let trainDeparture = moment().add(minutesAway, "minutes");

		// Add train values to table.
		tableName.text(snapshot.val().trainNameFB);
		tableDestination.text(snapshot.val().trainDestinationFB);
		tableFrequency.text(snapshot.val().trainFrequencyFB + " Mins");
		tableNextDeparture.text(moment(trainDeparture).format("hh:mm"));
		tableMinutesAway.text(minutesAway + " Mins");

		tableTR.append(tableName, tableDestination, tableFrequency, tableNextDeparture, tableMinutesAway);
		$("#table-train-info").append(tableTR);

	});
}