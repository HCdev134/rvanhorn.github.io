let wordIndex = [

    {
        name: 'Pepperoni',
        hint1: 'Top 5 most popular toppings.',
        hint2: 'The most popular topping.'
    },
    {
        name: 'Sausage',
        hint1: 'Top 10 most popular toppings.',
        hint2: 'A popular meat alternative to pepperoni.'
    },
    {
        name: 'Ham',
        hint1: 'A three-letter meat.',
        hint2: 'A Hawaiian pizza.'
    },
    {
        name: 'Bacon',
        hint1: 'Dogs love it but cant have it.',
        hint2: 'Also considered a breakfast food'
    },
    {
        name: 'Pineapple',
        hint1: 'A lot of people believe this does not belong on a pizza.',
        hint2: 'Usually paired with Ham.'
    },
    {
        name: 'Mushrooms',
        hint1: 'One of the most popular vegetables.',
        hint2: 'Usually paired with Pepperoni.'
    },
    {
        name: 'Olives',
        hint1: 'They are usually green in your fridge.',
        hint2: 'Small, round and black, usually cut into pieces.'
    },
    {
        name: 'Tomato',
        hint1: 'Red & small.',
        hint2: 'Looks like a cherry.'
    },
];

let userWins = 0;
let userLosses = 0;
let computerWins = 0;
let computerLosses = 0;

function startGame() {

    let randomNumber = Math.floor((Math.random() * 8) + 1) - 1;

    let selectedWord = wordIndex[randomNumber].name.toUpperCase();
    let wordHint1 = wordIndex[randomNumber].hint1;
    let wordHint2 = wordIndex[randomNumber].hint2;

    let wordSplit = selectedWord.split('');
    let userGuesses = selectedWord.length + 2;
    let userGuessesOrig = userGuesses;
    let userWord = [];
    let incorrectLetters = [];

    // Set to true to see console output.
    let debug = true;

    // Since we use document.getElementById quite often,  
    // lets save some time by creating a function for it.

    grabID = window.onload = function (ID) {
        return document.getElementById(ID);
    }

    // With the word already picked, set how many guesses
    // the user has initially.

    grabID("guesses-remaining").innerHTML = userGuesses;

    // Check the length of selectedWord and add a "_" for each letter.

    for (let i = 0; i < selectedWord.length; i++) {

        userWord.push("_");
        grabID("random-word").innerHTML = userWord.join(" ");
        grabID("hint-1").innerHTML = "";
        grabID("hint-2").innerHTML = "";

    }

    document.onkeyup = function (keyInput) {

        // Take the key the user pressed and convert it to uppercase.

        userLetter = keyInput.key;
        userLetter = userLetter.toUpperCase();

        if (debug === true) {

            console.log(wordSplit);
            console.log(userWord);
            console.log(userLetter);

        }

        if (wordSplit.includes(userLetter)) {

            for (let i = 0; i < selectedWord.length; i++) {

                // If the inputted letter is one or more letters in the
                // selected word, replace all "_" with the correct letter.

                if (selectedWord[i] === userLetter) {

                    userWord[i] = selectedWord[i];

                    grabID("random-word").innerHTML = userWord.join(" ");

                    if (debug === true) {

                        console.log(userLetter);
                        console.log(userWord);

                    }
                }
            }

            // Check to see if userWord has any blank letters left. 

            if (!userWord.includes("_")) {

                userWins = userWins + 1;
                computerLosses = computerLosses + 1;

                grabID("user-wins").innerHTML = userWins;
                grabID("computer-losses").innerHTML = computerLosses;
                grabID("hint-1").innerHTML = "You Won!";
                grabID("hint-2").innerHTML = "Press Start Game to begin the next round.";

                if (debug === true) {

                    console.log("You Win!");
                    console.log(userWins);
                    console.log(computerLosses);

                }
            }

        } else {

            // If the user has already inputted the letter, just skip it and 
            // inform them so they don't waste one of their guesses.

            if (incorrectLetters.includes(userLetter)) {

                if (debug === true) {

                    grabID("letter-already-guessed").innerHTML = "You've already entered the letter '" + userLetter + "'.Try again.";

                    console.log("Letter already inputted, skipping!");

                }

            } else {

                incorrectLetters.push(userLetter);
                userGuesses--;

                grabID("letter-already-guessed").innerHTML = "";
                grabID("guessed-letters").innerHTML = incorrectLetters;
                grabID("guesses-remaining").innerHTML = userGuesses;

                if (debug === true) {

                    console.log(incorrectLetters);
                    console.log(userGuesses);

                }
            }

            // Show Hint 1

            if (userGuesses <= 4) {

                grabID("hint-1").innerHTML = wordHint1;

                if (debug === true) {

                    console.log(wordHint1);

                }
            }

            // Show Hint 2

            if (userGuesses === 2) {

                grabID("hint-2").innerHTML = wordHint2;

                if (debug === true) {

                    console.log(wordHint2);

                }
            }

            // If the user runs out of guesses, they lose. 

            if (userGuesses === 0) {

                userLosses = userLosses + 1;
                computerWins = computerWins + 1;

                grabID("computer-wins").innerHTML = computerWins;
                grabID("user-losses").innerHTML = userLosses;
                grabID("random-word").innerHTML = selectedWord;
                grabID("hint-1").innerHTML ="You lost!";
                grabID("hint-2").innerHTML ="Press Start Game to begin the next round.";
                grabID("guessed-letters").innerHTML = "";
                grabID("guesses-remaining").innerHTML = userGuessesOrig
                grabID("letter-already-guessed").innerHTML = "";

                if (debug === true) {

                    console.log("Game Over Man!");

                }
            }
        }
    }
}