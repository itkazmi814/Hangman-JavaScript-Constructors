function Letter (val) {
	this.value = val;
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