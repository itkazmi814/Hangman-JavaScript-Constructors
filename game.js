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

//Starts game or Quits game
//Put in CLI
Game.prototype.startMenu = function () {
	inquirer.prompt([{
		type: "list",
		name: "command",
		message: "What would you like to do?",
		choices: ["Start a new game","Quit"]	
	}]).then( answers => {
		switch(answers.command){
			case "Start a new game":
				console.log("\nStarting new game\n");
				this.getTopic();
				break;

			case "Quit":
				console.log("\nThanks for playing!\n");
				break;
		}
	})
}

//Gets game topic and then starts game
//Put in CLI
Game.prototype.getTopic = function () {
	//inquirer used to set the topic
	inquirer.prompt([{
		type: "list",
		name: "topic",
		message: "Choose a category",
		choices: ["Fruit","Cheese"]
	}]).then(answers => {
		this.setTopic(answers.topic)
		this.startGame()
	})	
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
}

//sets chosenWord
Game.prototype.startGame = function () {
	//Initial word set up
	var rand = Math.floor(Math.random()*3)
	this.wordString = this.possibleWords[rand];
	console.log(`wordString: ${this.wordString}`)
	
	//Creates and displays word
	this.chosenWord = new Word(this.wordString);
	this.chosenWord.getLetters();
	this.chosenWord.displayWord();

	//reset lives so the game doesn't immediately stop
	this.lives = 5;

	//Prompt the user to enter a letter
	this.guessLetter();
}

//main function
//
Game.prototype.guessLetter = function () {
	//Recursion while alive
	if(this.lives > 0) {
		inquirer.prompt([{
				type: "input",
				name: "guessedLetter",
				message: "Guess a letter!"
			}]).then(answers => {
			//add .toLowerCase() to accept capital letters
			//include input validation - only accept alphabet letters
			var pressedLetter = answers.guessedLetter;

			//Determines if pressedLetter is in the Word object and acts accordingly
			this.parseWord(pressedLetter);

			console.log(`${this.lives} lives remaining\n`);

			//Display updated word, taking displayValue's from the letter objects
			this.chosenWord.displayWord();

			//Check for game over condition
			if(this.chosenWord.displayValue.indexOf("_") === -1 || this.lives === 0) {
				return this.gameOver()
			}

			this.guessLetter();
		})
	}
}

Game.prototype.parseWord = function(input){
	//if the letter is in the word
	if(this.wordString.indexOf(input) > -1) {
		console.log("CORRECT !!");
		//set their letter.guessed = true
		for(var i=0; i<this.chosenWord.letters.length; i++){
			if(input === this.chosenWord.letters[i].value){
				this.chosenWord.letters[i].guessed = true;
			}
		}
	//if the letter is not in the word
	}else{
		console.log("INCORRECT !!")
		this.lives--;
	}
}

Game.prototype.gameOver = function () {
	if(this.lives === 0){
		console.log("You lost :(\n");
	}else{
		console.log("You won the game!\n");
	}
	this.startMenu();
}

module.exports = Game;