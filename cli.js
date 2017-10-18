var Game = require("./game");
var inquirer = require("inquirer");

// inquirer.prompt([
	// {
	// 	type: "input",
	// 	name: "name",
	// 	message: "Enter your name"
	// },
	
// ]).then(answers => {
	// instance.playerName = answers.name;

	var instance = new Game();

	instance.startMenu();
// })

//CLI should only prompt for name
	//name will be used for leaderboard

//move topicChoosing to game.js

//go to start menu
	//start game -> choose topic
	//view leaderboard
	//quit

	