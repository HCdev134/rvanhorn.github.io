// Global Variables

// characterList contains all our playable characters stats. 

let characterList = [

    {
        name: 'Luke Skywalker',
        short: 'luke',
        hp: 140,
        attack: 10
    },
    {
        name: 'Mace Windu',
        short: 'mace',
        hp: 160,
        attack: 12
    },
    {
        name: 'Han Solo',
        short: 'han',
        hp: 150,
        attack: 11
    },
    {
        name: 'Count Dooku',
        short: 'dooku',
        hp: 170,
        attack: 13
    },
    {
        name: 'Emperor Sidious',
        short: 'sidious',
        hp: 180,
        attack: 14
    },
]

// Declare playerCharacter and computerCharacter for use later when
// selecting the characters that will be fighting. 

let playerCharacter;
let computerCharacter;
let nextOpponent = false;
let winTotal = 0;

// Assigns the selected characters "ID" for use later on. 

$("#luke").click(function () {
    characterID = this.id;
    characterSelect();
});

$("#mace").click(function () {
    characterID = this.id;
    characterSelect();
});

$("#han").click(function () {
    characterID = this.id;
    characterSelect();
});

$("#dooku").click(function () {
    characterID = this.id;
    characterSelect();
});

$("#sidious").click(function () {
    characterID = this.id;
    characterSelect();
});

// characterSelect assigns the player and computer character while
// checking to make sure both players are not the same character.

function characterSelect() {

    if (playerCharacter === undefined) {

        playerCharacter = characterID;
        console.log("Player Character: " + playerCharacter);
        characterMove();
        headerChange()

    }
    if (playerCharacter !== characterID && computerCharacter === undefined) {

        computerCharacter = characterID;
        console.log("Computer Character: " + computerCharacter);
        characterMove();
        headerChange()

    }
    if (playerCharacter !== undefined && computerCharacter !== undefined) {

        console.log("Both players selected.");
    }

};

// headerChange determines what the header will output based on the current action being preformed. 

function headerChange() {

    let headerText = $("#character-select").text();

    if (headerText === "Select Your Character" || nextOpponent === true) {
        $('#character-select').text("Select Your Opponent");
        nextOpponent = false;
    } else if (headerText === "Select Your Opponent") {
        $('#character-select').text("Characters Selected - Time To Fight!");
    } else if (nextOpponent === false) {
        $('#character-select').text("You Lost!");
    }
};

// characterMove moves the selected characters from the selection area to the battle arena.

function characterMove() {

    $("#battle-arena").append($("<div id=" + characterID + "-battle-row class=col-xl-2>"));
    $("#" + characterID + "-battle-row").append($("#" + characterID + "-info>"));
    $("#" + characterID + "-row").detach();
};

// When the "Fight" button is clicked, 

$("#fight").click(function () {

    // Using the ID we got before, we search our array for the selected characters and 
    // assign their index number to their respective variables. 

    playerNumber = characterList.findIndex(x => x.short === playerCharacter);
    computerNumber = characterList.findIndex(x => x.short === computerCharacter);

    // Check to make sure the user selected a computer to fight. 

    if (computerCharacter === undefined) {

        $("#player-report").text("Calm down Kylo, select another opponent first.");
        $("#computer-report").text("");

    } else {

        playerAttack();
        healthCheck();
        computeAttack();

    };


});

function playerAttack() {

    // Player Attacks

    $("#battle-log").append("<p id=player-report>");
    $("#player-report").text(characterList[playerNumber].name + " attacks for " + characterList[
        playerNumber].attack + " damage.");

    characterList[computerNumber].hp = characterList[computerNumber].hp - characterList[playerNumber].attack;
    characterList[playerNumber].attack = characterList[playerNumber].attack + 12;

    $("#" + computerCharacter + "-battle-row .character-HP").text("HP: " + characterList[computerNumber].hp);

}

function computeAttack() {

    // Computer Attacks

    $("#battle-log").append("<p id=computer-report>");
    $("#computer-report").text(characterList[computerNumber].name + " attacks for " + characterList[
        computerNumber].attack + " damage.");

    characterList[playerNumber].hp = characterList[playerNumber].hp - characterList[computerNumber].attack;

    $("#" + playerCharacter + "-battle-row .character-HP").text("HP: " + characterList[playerNumber].hp);

}

function healthCheck() {

    // if the Computer Character's HP is LESS THAN or EQUAL TO ZERO, remove the character
    // and inform the player they won and need to select the next fighter.

    if (characterList[computerNumber].hp <= 0) {

        $("#player-report").text(characterList[computerNumber].name + " was defeated!")
        $("#computer-report").text("Select the next fighter!")
        $("#" + computerCharacter + "-battle-row").detach();
        nextOpponent = true;
        computerCharacter = undefined;
        winTotal++;
        headerChange();
    }

    // Check to see how many times the player has won, if they have won a total of 
    // four times then that means they defeated all the characters. 


    if (winTotal === 4) {

        $('#character-select').text("You Won!");
        $("#player-report").text(characterList[playerNumber].name + " was victorious!")
        $("#computer-report").text("Press the REFRESH button to play again.")

        $("#luke-row").detach();
        $("#mace-row").detach();
        $("#han-row").detach();
        $("#dooku-row").detach();
        $("#sidious-row").detach();

        $("#" + playerCharacter + "-battle-row").detach();
        $("#" + computerCharacter + "-battle-row").detach();

        $("#fight").detach();
        $("#battle-arena").append($("<button id=refresh class=btn>Refresh</button>"));
        $("#refresh").addClass("btn-primary shadow rounded");

    }

    // if the Player Character's HP is LESS THAN or EQUAL TO ZERO, remove the character
    // and inform the player they lost and need to hit refresh to try again.

    if (characterList[playerNumber].hp <= 0) {

        $("#player-report").text(characterList[playerNumber].name + " was defeated!")
        $("#computer-report").text("Press the REFRESH button to try again.")

        $("#luke-row").detach();
        $("#mace-row").detach();
        $("#han-row").detach();
        $("#dooku-row").detach();
        $("#sidious-row").detach();

        $("#" + playerCharacter + "-battle-row").detach();
        $("#" + computerCharacter + "-battle-row").detach();

        $("#fight").detach();
        $("#battle-arena").append($("<button id=refresh class=btn>Refresh</button>"));
        $("#refresh").addClass("btn-primary shadow rounded");

        nextOpponent = false;
        headerChange();

    }

}

// Refreshes the page to allow the player to try again. 

$("#battle-arena").on('click', function () {
    location.reload();
});