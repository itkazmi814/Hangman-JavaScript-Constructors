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
Word.prototype.updateDisplayValue = function () {
	this.displayValue = "";

	for(var i=0; i<this.letters.length; i++){
		this.displayValue += this.letters[i].displayLetter();
	}
}

Word.prototype.searchThroughWord = function(input) {
	//if the letter is in the word
	if(this.value.indexOf(input) > -1) {
		for(var i=0; i<this.letters.length; i++){
			//reveal the letter
			this.letters[i].changeLetterDisplay(input);
		}
		this.updateDisplayValue();
		return true;
	//if the letter is not in the word
	}else{
		return false;
	}
}

module.exports = Word; 	