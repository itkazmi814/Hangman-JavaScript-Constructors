function Letter (val) {
	this.value = val;
	this.guessed = false;
}

Letter.prototype.displayLetter = function () {
	if(this.guessed 
		|| this.value === " " || this.value === "-"){
		return ` ${this.value} `;
	}else{
		return " _ "
	}
}

Letter.prototype.changeLetterDisplay = function (input) {
	if(input === this.value){
		this.guessed = true;
	}
}

module.exports = Letter;