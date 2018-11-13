var Letter = require("./Letter");

var Word = function (word) {
    this.letterArray = [];

    for (var i = 0; i < word.length; i++) {
        var tempLetter = new Letter(word[i]);
        this.letterArray.push(tempLetter);
    }

    this.getWordAsString = function () {
        var wordAsString = "";

        for (var i = 0; i < this.letterArray.length; i++) {
            var tempLetter = this.letterArray[i].getChar();
            wordAsString= wordAsString + " ";
            wordAsString= wordAsString + tempLetter;
        }

        return wordAsString;
    }

    this.makeAGuess = function (char) {
        var guessBooleanKeeper = false;

        for (var i = 0; i < this.letterArray.length; i++) {
            if (this.letterArray[i].testChar(char)) {
                guessBooleanKeeper = true;
            }
        } 

        return guessBooleanKeeper;
    }



};

module.exports = Word;

