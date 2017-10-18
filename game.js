//new Word object is made in startGame()
var Word = require("./word");
var inquirer = require("inquirer");

function Game () {
	//array of strings
	this.possibleWords;
	//Word object
	this.chosenWord;
	this.currentTopic;
	this.score = 0;
	this.lives = 5;
	this.playerName;
}

//sets chosenWord
Game.prototype.startGame = function (topic) {
	//reset lives so the game doesn't immediately stop
	this.lives = 5;

	this.setTopic(topic)

	//Creates and displays word
	//move all of this into .setTopic
	
	this.chosenWord.getLetters();
	this.chosenWord.updateDisplayValue();
}

//Selects array to be used for possibleWords
//potentially move things related to setTopic to a category.js
Game.prototype.setTopic = function (topic) {
	switch(topic) {
		case "Fruit":
			this.possibleWords = ["apple","banana","orange"];
			break;

		case "Cheese":
			this.possibleWords = ["provolone","gouda","swiss"];
			break;
	}	
	//Initial word set up
	var rand = Math.floor(Math.random()*3)
	var wordString = this.possibleWords[rand];
	this.chosenWord = new Word(this.wordString);
}

Game.prototype.gameOver = function () {
	if(this.chosenWord.displayValue.indexOf(" _ ") === -1){
		return true;
	}else if(this.lives === 0){
		return false;
	}
}

Game.prototype.parser = function (input) {
	if(this.chosenWord.parseWord(input) === true){
		return true;
	}else{
		this.lives--;
		return false
	}
}

module.exports = Game;