var Game = require("./game");
var inquirer = require("inquirer");
var colors = require("colors");

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
		instance.setTopic(answers.topic)
		instance.startGame();
		console.log(`\nCurrently guessing: ${instance.chosenWord.value}`);
	
		console.log(`${instance.chosenWord.displayValue}\n`)

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
				console.log("\nCORRECT !!\n".green);
			}else{
				console.log("\nINCORRECT !!\n".red)
			}

			console.log(`${instance.chosenWord.displayValue}\n`)
			console.log(`${instance.lives} lives remaining\n`);

			//Display updated word, taking displayValue's from the letter objects

			//Check for game over condition
			if(instance.gameOver() === true) {
				console.log("You won the game!\n".green)
				return startMenu();
			}else if(instance.gameOver() === false) {
				console.log("You lost :(\n".red)
				return startMenu();
			}
			//Guess another letter
			guessLetter();
		})
	}
}