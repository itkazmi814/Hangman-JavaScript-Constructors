//new Word object is made in startGame()
var Word = require("./word");
var inquirer = require("inquirer");

function Game () {
	this.possibleWords;
	this.wordString;
	this.chosenWord;
	this.currentTopic;
	this.score = 0;
	this.lives = 5;
	this.playerName;
}

//Selects array to be used for possibleWords
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
	this.wordString = this.possibleWords[rand];
	// console.log(`wordString: ${this.wordString}`)
}

//sets chosenWord
Game.prototype.startGame = function () {
	//reset lives so the game doesn't immediately stop
	this.lives = 5;
	//Creates and displays word
	this.chosenWord = new Word(this.wordString);
	this.chosenWord.getLetters();
	this.chosenWord.displayWord();
}


//Move to word.js
Game.prototype.parseWord = function(input){
	//if the letter is in the word
	if(this.wordString.indexOf(input) > -1) {
		console.log("\nCORRECT !!");
		//set their letter.guessed = true
		for(var i=0; i<this.chosenWord.letters.length; i++){
			if(input === this.chosenWord.letters[i].value){
				this.chosenWord.letters[i].guessed = true;
			}
		}
	//if the letter is not in the word
	}else{
		console.log("\nINCORRECT !!")
		this.lives--;
	}
}

Game.prototype.gameOver = function () {
	if(this.lives === 0){
		return "You lost :(\n";
	}else{
		return "You won the game!\n";
	}
}

module.exports = Game;