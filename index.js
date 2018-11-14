var Word = require("./Word");
var inquirer = require("inquirer");

var divider = "\n<---------------------------->\n"
var playWords = ["Newark", "Paterson", "New Brunswick", "Jersey City", "Belleville", "Bloomfield", "Asbury Park" , "Nutley" , "Montclair" , "Cranford" , "Elizabeth" , "Passaic" ];
shuffle(playWords);
var currentWord;
var numOfGuesses;
var oldGuesses;

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
    oldGuesses = [];
}

var startRound = function () {
    newWord();
    guessLetters()
}

var guessLetters = function () {
    console.log(currentWord.getWordAsString() + "\n");
    console.log(numOfGuesses + " guesses left.\n\n");


    if (currentWord.getWordAsString().indexOf("_") > -1 && numOfGuesses > 0) {
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "Guess a letter!"
            }

        ]).then(function (guess) {
            if (oldGuesses.indexOf(guess.letter) > -1) {
                console.log("You already guessed that letter!" + divider) 
            }
            else {
                oldGuesses.push(guess.letter)
                currentWord.makeAGuess(guess.letter)

                if (currentWord.getWordAsString().toLowerCase().indexOf(guess.letter.toLowerCase()) > -1) {
                    console.log("\n" + guess.letter + " is Correct!" + divider)
                }
                else {
                    console.log("\nbad guess!" + divider)
                    numOfGuesses--
                }
            }

            guessLetters()
        });
    }
    else {
        if (numOfGuesses === 0) {
            console.log("Out of Guesses" + divider)
            startRound()
        }
        else {
            console.log("Guessed the full word!" + divider)
            startRound()
        }
    }
}

console.log("Word Guess: New Jersey Cities" + divider)
startRound()
//CLEAN CODE
//README
//ADD TO PORTFOLIO



