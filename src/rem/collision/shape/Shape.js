/**
 * A shape is used to detect collisions of bodies.
 * @author saharan
 * @author lo-th
 */
OIMO.Shape = function(verts, faces){
	this.id = OIMO.id();

	// Body data
	this.body = null;
	this.contacts = [];

	// Position data
	this.positionWorld = new OIMO.Vec3;
	this.positionLocal = new OIMO.Vec3;

	// Rotation data
	this.rotationWorld = new OIMO.Mat3;
	this.rotationLocal = new OIMO.Mat3;

	// Simulation data
	this.aabb = new OIMO.AABB;
	this.vertices = verts;
	this.faces = faces;
};
OIMO.Shape.prototype = {
	constructor: OIMO.Shape,

	setupMass: function(out){
		var tot = new OIMO.Vec3, fs = this.faces;
		var i = fs.length, j = 0;

		while(i--){
			tot.add(fs[i].centroid);
			j++;
		}

		out.center = tot / j;
	},
	computeAabb: function(){
		this.aabb.setFromPoints(this.vertices).expandByScalar(OIMO.AABB_PROX);
	}
};
