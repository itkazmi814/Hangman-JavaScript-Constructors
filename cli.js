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

function userCategoryInput(){
	var question = [{
		type: "list",
		name: "topic",
		message: "Choose a category",
		choices: ["Fruit","Cheese"]
	}];

	return inquirer.prompt(question);	
}

//Gets game topic and then starts game
function getTopic () {
	//inquirer used to set the topic

	var allGames = Promise.resolve();
	
	allGames = allGames
	.then( () => userCategoryInput())
	.then(answers => instance.createWord(answers.topic))
	.then( () => instance.initializeGame() )
	.then( () => console.log(`\nCurrently guessing: ${instance.chosenWord.value}`) )
	.then( () => console.log(`${instance.chosenWord.displayValue}\n`) )
	.then( () => guessLetter());
}

function userLetterInput(){
	var question =[{
		type: "input",
		name: "guessedLetter",
		message: "Guess a letter!"
	}];

	return inquirer.prompt(question);
}

//main function
function guessLetter () {
	//Recursion while alive

	if(instance.continueGame() === true){

		var pressedLetter = "";
		var allGuesses = Promise.resolve();

		allGuesses = allGuesses
		.then( () => userLetterInput() )
		.then(answers => {

			pressedLetter = answers.guessedLetter.toLowerCase();

			//User input validation
			if(instance.validateInput(pressedLetter) === false) {
				pressedLetter = null;
				console.log("\nThat was not a letter!\n".red)
			}
		})
		.then( () => {
			//Determines if pressedLetter is in the Word object and acts accordingly
			if(instance.parser(pressedLetter) === false) {
				console.log("\nINCORRECT !!\n".red);
			}else if(instance.parser(pressedLetter) === true) {
				console.log("\nCORRECT !!\n".green);
			}
		})
		.then( () => console.log(`${instance.chosenWord.displayValue}\n`))
		.then( () => console.log(`Lives remaining: ${instance.lives}\n`))
		.then( () => {
			//Check for game over condition and restarts
			if(instance.gameWon() === true) {
				console.log("You won the game!\n".green.bold)
				startMenu();
			}else if(instance.gameWon() === false) {
				console.log("You lost :(\n".red.bold)
				startMenu();
			}	
		}).then( () => guessLetter());
	}
}

