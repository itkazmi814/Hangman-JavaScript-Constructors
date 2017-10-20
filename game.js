//new Word object is made in startGame()
var Word = require("./word");
var inquirer = require("inquirer");

function Game () {
	this.possibleWords;
	this.chosenWord;
	this.lives = 5;
}

Game.prototype.validateInput = function (input) {
	var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	
	if(input === ""){
		return;
	}else if(alphabet.indexOf(input) > -1){
		return true;
	}else{
		return false;
	}
}

//sets chosenWord
Game.prototype.initializeGame = function (topic) {
	this.lives = 5;
	this.chosenWord.getLetters();
	this.chosenWord.updateDisplayValue();
}

//Selects array to be used for possibleWords
Game.prototype.createWord = function (topic) {
	switch(topic) {
		case "Fruit":
			this.possibleWords = ["apple","banana","orange"];
			break;

		case "Cheese":
			this.possibleWords = ["provolone","gouda","swiss"];
			break;
	}	
	//Initial word set up
	var rand = Math.floor(Math.random()*3);
	var wordString = this.possibleWords[rand];
	this.chosenWord = new Word(wordString);
}

Game.prototype.parser = function (input) {
	if(this.validateInput(input) === true) {
		if(this.chosenWord.searchThroughWord(input) === true){
			return true;
		}else{
			console.log("test subtracting a life");
			this.lives--;
		}
	}

	return false;
}

Game.prototype.gameWon = function () {
	if(this.chosenWord.displayValue.indexOf(" _ ") === -1){
		return true;
	}else if(this.lives === 0){
		return false;
	}
}

Game.prototype.continueGame = function () {
	if(this.chosenWord.displayValue.indexOf(" _ ") > -1 && this.lives > 0){
		return true;
	}else{
		return false;
	}
}


module.exports = Game;