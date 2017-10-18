var Game = require("./game");
var inquirer = require("inquirer");

inquirer.prompt([
	// {
	// 	type: "input",
	// 	name: "name",
	// 	message: "Enter your name"
	// },
	{
		type: "list",
		name: "topic",
		message: "Choose a category",
		choices: ["Fruit","Cheese"]
	}
]).then(answers => {

	var instance = new Game();
	
	instance.playerName = answers.name;
	instance.chooseTopic(answers.topic);
	instance.startGame();
	instance.guessLetter();
})

//CLI should only prompt for name
	//name will be used for leaderboard

//move topicChoosing to game.js

//go to start menu
	//start game -> choose topic
	//view leaderboard
	//quit

	