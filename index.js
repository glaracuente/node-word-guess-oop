var Word = require("./Word");
var inquirer = require("inquirer");

var playWords = ["Newark", "Paterson", "New Brunswick", "Jersey City", "Belleville", "Bloomfield", "Asbury Park" , "Nutley" , "Montclair" , "Cranford" , "Elizabeth" , "Passaic" ];
shuffle(playWords);
var divider = "\n<---------------------------->\n"
var currentWord;
var numOfGuesses;
var oldGuesses;

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

var guessLetters = function () {
    console.log(currentWord.getWord() + "\n");
    console.log(numOfGuesses + " guesses left.\n\n");

    if (currentWord.getWord().indexOf("_") > -1 && numOfGuesses > 0) {
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

                if (currentWord.getWord().toLowerCase().indexOf(guess.letter.toLowerCase()) > -1) {
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
            console.log("Out of Guesses ...new word on the way..." + divider)
            startRound()
        }
        else {
            console.log("Guessed the full word! ...new word on the way..." + divider)
            startRound()
        }
    }
}

var startRound = function () {
    if (playWords.length === 0) {
        console.log("Game over! No more words left.")
    }
    else {
        newWord();
        guessLetters()
    }
}

console.log("Word Guess: New Jersey Cities" + divider)
startRound()



