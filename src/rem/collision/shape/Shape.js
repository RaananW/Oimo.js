/**
 * A shape is used to detect collisions of rigid bodies.
 * @author saharan
 * @author lo-th
 */
OIMO.Shape = function(config){
	this.id = OIMO.id();

	this.body = null;
	this.contacts = [];
	this.position = new OIMO.Vec3;
	this.rotation = new OIMO.Mat33;
	this.proxy = null;

	this.density = config.density;
	this.friction = config.friction;
	this.restitution = config.restitution;
	this.hitGroups = config.hitGroups;
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
	updateProxy: function(){
		this.proxy.aabb.setFromPoints(this.vertices).expandByScalar(OIMO.AABB_PROX);
	}
};
