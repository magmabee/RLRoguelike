import Game from "main.js"
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
export default Tile;