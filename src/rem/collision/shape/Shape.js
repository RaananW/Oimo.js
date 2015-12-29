/**
 * A shape is used to detect collisions of rigid bodies.
 * @author saharan
 * @author lo-th
 */

OIMO.Shape = function(config){
	this.id = OIMO.id();
	this.prev = null;
	this.next = null;
	this.proxy = null;
	this.parent = null;
	this.contactLink = null;
	this.numContacts = 0;
	this.position = new OIMO.Vec3();
	this.rotation = new OIMO.Mat33();
	this.relativePosition = new OIMO.Vec3().copy(config.relativePosition);
	this.relativeRotation = new OIMO.Mat33().copy(config.relativeRotation);
	this.aabb = new OIMO.AABB();
	this.density = config.density;
	this.friction = config.friction;
	this.restitution = config.restitution;
	this.belongsTo = config.belongsTo;
	this.collidesWith = config.collidesWith;
};

OIMO.Shape.prototype = {
	constructor: OIMO.Shape,
	calculateMassInfo: function(out){
		OIMO.Error("Shape", OIMO.ERR_INHERITANCE);
	},
	updateProxy: function(){
		OIMO.Error("Shape", OIMO.ERR_INHERITANCE);
	}
};
