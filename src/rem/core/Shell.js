/**
 * A shell is a body that can be added to
 * the scene. Its state can be chosen between
 * solid, liquid and gazeous. Default is solid.
 * @author xprogram
 */
OIMO.Shell = function(shape, material, mass){
	this.shape = shape || null;
	this.material = material || null;
	this.state = OIMO.Shell.STATE_SOLID;
	this.position = new OIMO.Vec3;
	this.rotation = new OIMO.Quat;
	this.scale = new OIMO.Vec3;
	this.velocity = new OIMO.Vec3;
	this.angularVelocity = new OIMO.Vec3;
	this.useFixedRotation = false;
	this.mass = mass || 0;
	this.id = OIMO.id();
	this.name = "";
};
OIMO.Shell.STATE_SOLID = 0;
OIMO.Shell.STATE_LIQUID = 1;
OIMO.Shell.STATE_GAZ = 2;
