import Create2DArray from "util.js"
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
export default Map;
export Room;