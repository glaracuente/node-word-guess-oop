var Letter = function (char) {
    this.charValue = char;
    this.guessed = false;

    this.getChar = function () {
        if (this.guessed) {
            return this.charValue;
        }
        else {
            return "_"
        }
    };

    this.testChar = function (char) {
        if (char.toLowerCase() === this.charValue.toLowerCase()) {
            this.guessed = true;
        }
        return this.guessed;
    }
};

module.exports = Letter;