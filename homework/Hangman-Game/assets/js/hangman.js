var wordIndex = [

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
        name: 'Pineapple',
        hint1: 'A lot of believe believe this does not belong on a pizza.',
        hint2: 'Usually paired with Ham.'
    },
    {
        name: 'Mushrooms',
        hint1: 'One of the most popular vegetables.',
        hint2: 'Usually paired with Pepperoni.'
    },
    {
        name: 'Olives',
        hint1: 'They are usally green in your fridge.',
        hint2: 'Small, round and black, usually cut into pieces.'
    },
    {
        name: 'Ham',
        hint1: 'A three-letter meat.',
        hint2: 'A Hawaiian pizza.'
    }
];

var randomNumber = Math.floor((Math.random() * 5) + 1) - 1;

var selectedWord = wordIndex[randomNumber].name.toUpperCase();
var wordHint1 = wordIndex[randomNumber].hint1;
var wordHint2 = wordIndex[randomNumber].hint2;

var wordSplit = selectedWord.split('');
var userGuesses = selectedWord.length + 2;
var userGuessesOrig = userGuesses;
var userWord = [];
var incorrectLetters = [];


// Since we use document.getElementById quite often,  
// lets save some time by creating a function for it.

grabID = function (ID) {
    return document.getElementById(ID);
}

// Check the length of selectedWord and add a "_" for each letter.

for (let i = 0; i < selectedWord.length; i++) {

    userWord.push("_")

}

document.onkeyup = function (keyInput) {

    // Take the key the user pressed and convert it to uppercase.

    userLetter = keyInput.key;
    userLetter = userLetter.toUpperCase();

    console.log(wordSplit);
    console.log(userWord);
    console.log(userLetter);

    if (wordSplit.includes(userLetter)) {

        for (let i = 0; i < selectedWord.length; i++) {

            // If the inputted letter is one or more letters in the
            // selected word, replace all "_" with the correct letter.

            if (selectedWord[i] === userLetter) {

                userWord[i] = selectedWord[i];
                console.log(userLetter);
                console.log(userWord);

            }

        }

        // Check to see if userWord has any blank letters left. 

        if (userWord.includes("_")) {} else {

            console.log("You Win!")

        }

    } else {

        // If the user has already inputted the letter, just skip it and 
        // inform them so they don't waste one of their guesses.

        if (incorrectLetters.includes(userLetter)) {

            console.log("Letter aready inputted, skipping!")

        } else {

            incorrectLetters.push(userLetter);
            userGuesses--;

            console.log(incorrectLetters);
            console.log(userGuesses);

        }

        // Show Hint 1

        if (userGuesses <= 4) {

            console.log(wordHint1)

        }

        // Show Hint 2

        if (userGuesses === 2) {

            console.log(wordHint2)

        }

        // If the user runs out of guesses, they lose. 

        if (userGuesses === 0) {

            console.log("Game Over Man!")

        }

    }

}