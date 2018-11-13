var Word = require("./Word");
var inquirer = require("inquirer");



var playWords = ["BAD BUNNY", "DADDY YANKEE", "DON OMAR", "OZUNA", "PLAN B", "NICKY JAM"];
shuffle(playWords);
var currentWord;
var numOfGuesses;

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
    currentWord = new Word(playWords.pop());
    numOfGuesses = 10;
}

var startGame = function () {
    newWord();
    guessLetters()
}

var guessLetters = function () {
    console.log(currentWord.getWordAsString());
    console.log(numOfGuesses + " guesses left.");


    if (currentWord.getWordAsString().indexOf("_") > -1 && numOfGuesses > 0) {
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "Guess a letter!"
            }

        ]).then(function (guess) {
            if (currentWord.makeAGuess(guess.letter)) {
                console.log("Correct!")
            }
            else {
                numOfGuesses--
            }
            guessLetters()
        });
    }
    else {
        if (numOfGuesses === 0) {
            console.log("Out of Guesses")
        }
        else {
            console.log("Guessed the full word!")
        }
    }
}

startGame()
//HAVE TO IMPLEMENT "YOU ALREADY ENTERED THAT FEATURE"




