var Word = require("./Word");
var inquirer = require("inquirer");



var playWords = ["BAD BUNNY", "DADDY YANKEE", "DON OMAR", "OZUNA", "PLAN B", "NICKY JAM"];
shuffle(playWords);
var currentWord;

// This function to shuffle array was taken from https://www.kirupa.com/html5/shuffling_array_js.htm
function shuffle(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    }
    return array;
}

var newWord = function () {
    currentWord = new Word(playWords.pop())
}

var startGame = function () {
    newWord();

    guessLetters()
}

var guessLetters = function () {
    console.log(currentWord.getWordAsString());

    if (currentWord.getWordAsString().indexOf("_") > -1) {
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "Guess a letter!"
            }

        ]).then(function (guess) {
            currentWord.makeAGuess(guess.letter)
            guessLetters()
        });
    }
    else {
        console.log("done")
    }
}

startGame()




