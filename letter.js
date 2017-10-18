function Letter (val) {
	//string representing the letter
	this.value = val;
	//boolean used to decide how to display the letter
	this.guessed = false;
}

Letter.prototype.displayLetter = function () {
	if(this.guessed){
		return ` ${this.value} `;
	}else{
		return " _ "
	}
}

module.exports = Letter;