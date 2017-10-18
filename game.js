var Word = require("./word");
var inquirer = require("inquirer");

function Game () {
	this.possibleWords;
	this.wordString;
	this.chosenWord;
	this.score = 0;
	this.lives = 5;
	this.playerName;
}

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
				this.startGame();
				break;

			case "Quit":
				console.log("\nThanks for playing!");
				break;
		}
	})
}

//sets chosenWord
Game.prototype.startGame = function () {
	//Topic set up
	this.chooseTopic();

	//Initial word set up
	var rand = Math.floor(Math.random()*3)
	this.wordString = this.possibleWords[rand];
	console.log(`wordString: ${this.wordString}`)
	
	//Creates and displays word
	this.chosenWord = new Word(this.wordString);
	this.chosenWord.getLetters();
	this.chosenWord.displayWord();

	//Prompt the user to enter a letter
	this.guessLetter();
}

//Selects array to be used for possibleWords
Game.prototype.chooseTopic = function (topic) {
	inquirer.prompt([
		{
			type: "list",
			name: "topic",
			message: "Choose a category",
			choices: ["Fruit","Cheese"]
		}]).then(answers => {
			switch(answers.topic) {
				case "Fruit":
					this.possibleWords = ["apple","banana","orange"];
					break;

				case "Cheese":
					this.possibleWords = ["provolone","gouda","swiss"];
					break;
			}	
		})
}

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
			var input = answers.guessedLetter;

			//if the letter is in the word
			if(this.wordString.indexOf(input) > -1) {
				console.log("CORRECT !!")
				// console.log(`\n"${input}" is a correct guess!\n`)
				//set their letter.guessed = true
				for(var i=0; i<this.chosenWord.letters.length; i++){
					if(input === this.chosenWord.letters[i].value){
						this.chosenWord.letters[i].guessed = true;
					}
				}
			//if the letter is not in the word
			}else{
				console.log("INCORRECT !!")
				// console.log(`\n"${input}" is an incorrect guess :(\n`)
				this.lives--;
			}

			console.log(`${this.lives} lives remaining\n`)

			//Display updated word
			this.chosenWord.displayWord()

			//Check for game over condition
			if(this.chosenWord.displayValue.indexOf("_") === -1) {
				return this.gameWon(true);
			}else if(this.lives === 0) {
				return this.gameWon(false);	
			}

			this.guessLetter();
		})
	}
}


Game.prototype.gameWon = function (flag) {
	if(flag){
		console.log("You won the game!\n")
	}else{
		console.log("You lost :(\n")
	}

	this.startMenu();

	//go to start menu ->
		//prompt for new game
		//prompt to see leaderboard
		//quit
}


module.exports = Game;