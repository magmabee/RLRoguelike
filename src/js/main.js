/*
RLrogue
This is my first poke at OOP (or rather, proto-OOP...), so this may seem like spagetti code...*/
//Extend ROT by adding a draw image function. I don't want to modify the ROT object, might break something
import player from "player.js";
import Create2DArray from "util.js";
import Type from "types.js";
import Tile from "tile.js";
import Player from "player.js"
import Map from "map.js";
var ROTEXT = {
	drawimage: function (image,dx,dy) {
		var ctx = game.display._context;
		if (ROTEXT.imgs[image] !==undefined) var img = ROTEXT.imgs[image];
		else {alert("A image was not preloaded! Please contact Mount2010")}
		ctx.drawImage(img,dx,dy);
	},
	ctx: game.display._context;
	loadimg: function (image) {
		var img = $("<img src=\""+image+".png\"></img>");
		imgs.push(img);
	},
	imgs: [],
}
var options = {

}
function Game () {
	this.display = new ROT.Display(options);
	this.scheduler = new ROT.Scheduler.Simple();
	this.types = [];
	this.map;
	this.rooms = [];
}
Game.prototype.init = function () {
	//generate types objects for map
	this.generateTypes();
	//generate room objects for map
	this.generateRooms();
	//Generate map before load
	map.generateMap();
	this.load();
}
Game.prototype.generateRooms = function () {


}
Game.prototype.load = function () {
	$("#main").append(this.display.getContainer());
	var loadprogress = 0;
	var eachload = 100 / ROTEXT.imgs.length;
	for (img of ROTEXT.imgs) {
		ROTEXT.loadimg(img);
		loadprogress+=eachload;
		ctx.fillStyle= "gray"; ROTEXT.ctx.fillRect(10,10,100,50);
		ctx.fillStyle = "green"; ROTEXT.ctx.fillRect(10,10,loadprogress,50);
	}
	this.display.clear();
}
Game.prototype.handleKeyboard = function (key) {
	switch (key) {
		case 87: case 38: player.move("forward"); break; //^ W
		case 83: case 40: player.move("backward"); break; //v S
		case 65: case 37: player.move("left"); break; //<- A
		case 68: case 39: player.move("right"); break; //-> D
		case 32: player.move("up"); break; //SPACE
		default: break;	
	}
}
$(() => {ROT.isSupported()?game.init():$("#main").append("Sorry- ROT is not supported. Please use another, more modern browser.")});
var game = new Game();
var map = new Map();
var player = new Player();
export default Game;
export ROTEXT;