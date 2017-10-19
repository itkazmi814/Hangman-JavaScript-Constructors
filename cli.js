var Game = require("./game");
var inquirer = require("inquirer");
var colors = require("colors");

var instance = new Game();

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

//main function
function guessLetter () {
	var allGuesses = Promise.resolve();
	var pressedLetter = "";

	allGuesses = allGuesses
	.then( () => userLetterInput() )
	.then(answers => validate(answers.guessedLetter.toLowerCase()))
	.then( () => displayGuessResult() )
	.then( () => console.log(`${instance.chosenWord.displayValue}\n`))
	.then( () => console.log(`Lives remaining: ${instance.lives}\n`))
	.then( () => displayGameResult() )
}

function userLetterInput(){
	var question =[{
		type: "input",
		name: "guessedLetter",
		message: "Guess a letter!"
	}];

	return inquirer.prompt(question);
}

function validate (input) {
	pressedLetter = input;
	//User input validation

	if(instance.validateInput(input) === false) {
		console.log("\nThat was not a letter!\n".red)
		return guessLetter();
	}
}

function displayGuessResult () {
	//Determines if pressedLetter is in the Word object and acts accordingly
	if(instance.parser(pressedLetter) === true) {
		console.log("\nCORRECT !!\n".green);
	}else{
		console.log("\nINCORRECT !!\n".red);
	}
}

function displayGameResult () {
	if(instance.gameOver() === true) {
		console.log("You won the game!\n".green.bold)
		return startMenu();
	}else if(instance.gameOver() === false) {
		console.log("You lost :(\n".red.bold)
		return startMenu();
	}
	guessLetter();
}

startMenu();