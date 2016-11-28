/*
|=====| ||== ==== |=====|
  ||    ||== |___    ||
  ||    ||== ___|    ||   rogue
This is my first poke at OOP (or rather, proto-OOP...), so this may seem like spagetti code...*/
function Create2DArray(rows) {
  var arr = [];
  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }
  return arr;
}
//Extend ROT by adding a draw image function. I don't want to modify the ROT object, might break something
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
function Map () {
	//returns tile obj at specified X+Y
	this.getMap = function (x,y) {return Game.map[x][y]}
	this.storeAtTile = function (x,y,type) {var TileObj = new Tile(x,y,type); Game.map[x][y] = TileObj;}
	this.map = Create2DArray(options.height);
}
Map.prototype.generateMap= function () {
	//store rooms
	var rooms = game.rooms;
}
function Room () {
	this.neighbours = [false, false, false, false];
	this.sizex = 0;
	this.sizey = 0;
}
Room.prototype.size = function () {

}
/*
QUICK NOTE ABOUT HEIGHT:
0 - IT IS NOT THERE
1 - FLAT
50 - PLAYER HAS TO CLIMB

100 - PLAYER LEVEL
*/
//A very specific instance of Type.
var player = new Type("@",["player",false,false,true,false,false,100]);
player.move = function (where) {
	var parentThis = this;
	switch (where) {
		case "forward": parentthis.x++; break;
		case "backward": parentthis.x--; break;
		case "left": parentthis.y++; break;
		case "right": parentthis.y--; break;
		case "up": parentthis.jump(); break;
	}
}
player.jump = function () {

}
function Type (char, typeinfo = ["type", false, false, false, false, false, 0]) {
	this.getProperties = function () {return [this.canPassThrough,this.canMount,this.isEntity,this.dangerous,this.height]}
	this.name = typeinfo[0];
	this.canPassThrough = typeinfo[1];
	this.canMount = typeinfo[2];
	this.isEntity = typeinfo[3];
	this.dangerous = typeinfo[4]; //Is dangerous to move into?
	this.liquid = typeinfo[5];
	this.checkdanger = function () {return !!this.dangerous;}
	this.char = char;
	this.height = typeinfo[6]; //Relative height
}
function Tile (x=0,y=0,type) {
	this.type=type;
	this.x=x; this.y=y;
	this.height = game.types[type].getProperties()[4];
	this.isEntity = game.types[type].getProperties()[2];
	if (this.isEntity) {
		game.scheduler.add("entity"+game.entities.length+1);
		game.entities.push(this);
	}
}

$(() => {ROT.isSupported()?game.init():$("#main").append("Sorry- ROT is not supported. Please use another, more modern browser.")});
var game = new Game();
var map = new Map();
var player = new Player();