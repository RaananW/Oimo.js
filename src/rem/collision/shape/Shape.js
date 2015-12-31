/**
 * A shape is used to detect collisions of rigid bodies.
 * @author saharan
 * @author lo-th
 */
OIMO.Shape = function(config){
	this.id = OIMO.id();

	this.parent = null;
	this.contacts = [];
	this.position = new OIMO.Vec3();
	this.rotation = new OIMO.Mat33();
	this.aabb = new OIMO.AABB();
	this.proxy = null;

	this.density = config.density;
	this.friction = config.friction;
	this.restitution = config.restitution;
	this.belongsTo = config.belongsTo;
	this.hitIndex = config.hitIndex;
};
OIMO.Shape.prototype = {
	constructor: OIMO.Shape,

	setupMass: function(){
		OIMO.err("Shape", OIMO.ERR_INHERITANCE);
	},
	updateProxy: function(){
		this.proxy.setFromPoints(this.vertices).expandByScalar(OIMO.AABB_PROX);
	}
};
