// Global Variables

// If  debug is set to "true", will show all variable values in the console.

let debug = true;
let randomLetter = null;

let userWin = 0;
let userLoss = 0;

let computerWin = 0;
let computerLoss = 0;

let userGuesses = [];
let guessNumber = 10

// Since we use document.getElementById quite often,  
// lets save some time by creating a function for it.

grabID = function (ID) {
    return document.getElementById(ID);
}

// Do the following when the user presses any key.

document.onkeyup = function (userKey) {

    // As long as guessNumber does not equal zero, keep the 
    // current game going. If guessNumber does equal 0, end current game.

    if (guessNumber !== 0) {

        letterGroup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
            "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ];

        if (randomLetter === null) {

            // Since randomLetter is null, we need to assign a number to it so we 
            // can match it with its corresponding letter in our array. 

            randomNumber = Math.floor((Math.random() * 26) + 1) - 1;
            randomLetter = letterGroup[randomNumber];

        }

        // Take the key the user pressed and convert it to uppercase 
        // for use in our comparison against randomLetter.

        userLetter = userKey.key
        userLetter = userLetter.toUpperCase();

        if (userLetter == randomLetter) {

            // Since the user inputted the correct letter, increase 
            // userWin by 1 and computerLoss by one.  We also want
            // to clear the userGuesses array for the next game.

            userWin++;
            computerLoss++;
            userGuesses = [];

            // Strictly for debugging. 

            if (debug === true) {

                console.log("Correct")
                console.log("User Value: " + userLetter)
                console.log("Computer Value: " + randomLetter)
                console.log("Guesses Remaining: " + guessNumber)
                console.log("Guessed Letters: " + userGuesses)
                console.log("---------------")

            }

            // Update userWinTotal & computerLossTotal to reflect updated value. 
            // Also update guessedLetters to the empty array we set above. 

            grabID("userWinTotal").innerHTML = userWin;
            grabID("computerLossTotal").innerHTML = computerLoss;
            grabID("guessedLetters").innerHTML = userGuesses;

            // Set randomLetter to null so it grabs a new random number
            // next time then reset guessNumber to its original value. 

            randomLetter = null;
            guessNumber = 10;

            grabID("guessesRemaining").innerHTML = guessNumber;


        } else {

            // Since the user guessed incorrectly, decrease guessNumber by one
            // and add the incorrect guess to userGuesses.

            guessNumber--;
            userGuesses += [userLetter + ", "];

            // Update guessesRemaining & guessedLetters to reflect current value.

            grabID("guessesRemaining").innerHTML = guessNumber;
            grabID("guessedLetters").innerHTML = userGuesses;

            // Strictly for debugging. 

            if (debug === true) {

                console.log("Incorrect");
                console.log("User Value: " + userLetter);
                console.log("Computer Value: " + randomLetter);
                console.log("Guesses Remaining: " + guessNumber);
                console.log("Guessed Letters: " + userGuesses);
                console.log("---------------")

            }

            if (guessNumber == 0) {

                // Since the user lost by using up all their guesses, increase 
                // userLoss by 1 and computerWin by one. We also want
                // to clear the userGuesses array for the next game.

                userGuesses = [];
                userLoss++;
                computerWin++;

                // Update userLossTotal & computerWinTotal to reflect updated value. 
                // Also update guessedLetters to the empty array we set above. 

                grabID("guessedLetters").innerHTML = userGuesses;
                grabID("userLossTotal").innerHTML = userLoss;
                grabID("computerWinTotal").innerHTML = computerWin;

                // Strictly for debugging. 

                if (debug === true) {

                    console.log("Game Over Man!")
                    console.log("---------------")

                }

            }

        }

    } else {

        // Reset guessNumber to its original value and update
        // guessesRemaining to show the reset value.  

        guessNumber = 10
        grabID("guessesRemaining").innerHTML = guessNumber;
    }

}
