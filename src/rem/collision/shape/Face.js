/**
 * Representation of a 3D triangle from
 * 3 vectors.
 */
OIMO.Face = function(a, b, c){
	this.a = a;
	this.b = b;
	this.c = c;

	a.uses.push(this);
	b.uses.push(this);
	c.uses.push(this);
};
OIMO.Face.prototype = {
	constructor: OIMO.Face,

	getCentroid: function(){
		return new OIMO.Vec3().add(a).add(b).add(c).divideScalar(3);
	}
};
