var Game = require("./game");
var inquirer = require("inquirer");

var instance = new Game();

startMenu();

//Starts game or Quits game
function startMenu () {
	inquirer.prompt([{
		type: "list",
		name: "command",
		message: "What would you like to do?",
		choices: ["Start a new game","Quit"]	
	}]).then( answers => {
		switch(answers.command){
			case "Start a new game":
				console.log("\nStarting new game\n");
				getTopic();
				break;

			case "Quit":
				console.log("\nThanks for playing!\n");
				break;
		}
	})
}

//Gets game topic and then starts game
function getTopic () {
	//inquirer used to set the topic
	inquirer.prompt([{
		type: "list",
		name: "topic",
		message: "Choose a category",
		choices: ["Fruit","Cheese"]
	}]).then(answers => {
		instance.startGame(answers.topic);
		console.log(`Currently guessing: ${instance.wordString}`);
	
		console.log(instance.chosenWord.displayValue)

		//prompts user to guess a letter
		guessLetter();
	})	
}

//main function
function guessLetter () {
	//Recursion while alive
	if(instance.lives > 0) {

		inquirer.prompt([{
				type: "input",
				name: "guessedLetter",
				message: "Guess a letter!"
			}]).then(answers => {
			//add .toLowerCase() to accept capital letters
			//include input validation - only accept alphabet letters
			var pressedLetter = answers.guessedLetter;

			//Determines if pressedLetter is in the Word object and acts accordingly
			if(instance.parser(pressedLetter) === true) {
				console.log("\nCORRECT !!\n");
			}else{
				console.log("\nINCORRECT !!\n")
			}

			console.log(`${instance.chosenWord.displayValue}\n`)
			console.log(`${instance.lives} lives remaining\n`);

			//Display updated word, taking displayValue's from the letter objects

			//Check for game over condition
			if(instance.gameOver() === true) {
				console.log("You won the game!\n")
				return startMenu();
			}else if(instance.gameOver() === false) {
				console.log("You lost :(\n")
				return startMenu();
			}
			//Guess another letter
			guessLetter();
		})
	}
}