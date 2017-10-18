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

//Selects array to be used for possibleWords
Game.prototype.chooseTopic = function (topic) {
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
	
	//Initial game set up

	var rand = Math.floor(Math.random()*3)
	this.wordString = this.possibleWords[rand];
	console.log(`wordString: ${this.wordString}`)
	
	this.chosenWord = new Word(this.wordString);
	this.chosenWord.getLetters();
	this.chosenWord.displayWord();

	//Runs until guesses = 0 or word = guessed
	// while(this.lives > 0){

	
	// }
}

Game.prototype.guessLetter = function () {
	if(this.lives > 0) {
		inquirer.prompt([
			{
				type: "input",
				name: "guessedLetter",
				message: "Guess a letter!"
			}
		]).then(answers => {
			//add .toLowerCase() to accept capital letters
			//include input validation - only accept alphabet letters
			var input = answers.guessedLetter;

			//if the letter is in the word
			if(this.wordString.indexOf(input) > -1) {
				console.log(`\n"${input}" is a correct guess!\n`)

				//set their letter.guessed = true
				for(var i=0; i<this.chosenWord.letters.length; i++){
					if(input === this.chosenWord.letters[i].value){
						this.chosenWord.letters[i].guessed = true;
					}
				}

				//display updated word
				this.chosenWord.displayWord()

			}else{
				console.log(`\n"${input}" is an incorrect guess :(\n`)
				this.lives--;
			}

			//Check for game over condition
			if(this.chosenWord.displayValue.indexOf("_") === -1) {
				return this.gameWon(true);
			}else if(this.lives === 0) {
				return this.gameWon(false);	
			}

			console.log(`${this.lives} lives remaining\n`)

			this.guessLetter();
		})
	}
}

Game.prototype.gameWon = function (flag) {
	if(flag){
		console.log("You won the game!")
	}else{
		console.log("You lost :(")
	}

	//go to start menu ->
		//prompt for new game
		//prompt to see leaderboard
		//quit
}


module.exports = Game;