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
	this.aabb = new OIMO.AABB;
	this.proxy = null;
	this.massCenter = new OIMO.Vec3()

	this.density = config.density;
	this.friction = config.friction;
	this.restitution = config.restitution;
	this.hitGroups = config.hitGroups;
};
OIMO.Shape.prototype = {
	constructor: OIMO.Shape,

	setupMass: function(){
		var tot = new OIMO.Vec3, fs = this.faces;
		var i = fs.length, j = 0;

		while(i--){
			tot.add(fs[i].centroid);
			j++;
		}

		this.massCenter = tot / j;
	},
	updateProxy: function(){
		this.proxy.aabb.setFromPoints(this.vertices).expandByScalar(OIMO.AABB_PROX);
	}
};
