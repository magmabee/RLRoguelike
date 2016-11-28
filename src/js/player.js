/*
QUICK NOTE ABOUT HEIGHT:
0 - IT IS NOT THERE
1 - FLAT
50 - PLAYER HAS TO CLIMB

100 - PLAYER LEVEL
*/
//A very specific instance of Type.
import Type from "types.js"
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
export default player;