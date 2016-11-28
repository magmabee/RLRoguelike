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
export default Type;