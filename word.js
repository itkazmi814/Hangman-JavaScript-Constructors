var Letter = require("./letter")

function Word (val){
	this.value = val;
	this.displayValue = "";
	this.letters = [];
}

//creates array of letter objects
Word.prototype.getLetters = function () {
	for(var i=0; i<this.value.length; i++){
		var tempLetter = new Letter(this.value[i])
		this.letters.push(tempLetter);
	}
}

//displays array of letter objects
//allow special characters and spaces to automatically show
//probably only turn alphabet letters into " _ "
Word.prototype.displayWord = function () {
	this.displayValue = "";

	for(var i=0; i<this.letters.length; i++){
		this.displayValue += this.letters[i].displayLetter();
	}
}

module.exports = Word;