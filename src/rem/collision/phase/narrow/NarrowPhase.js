/**
 * Class for a narrow-phase implementation, where we determine
 * where each face is colliding with each face between 2 shapes.
 * @author xprogram
 */
OIMO.NarrowPhase = function(){
	OIMO.CollisionPhase.call(this);

	this.manifolds = [];
};
OIMO.NarrowPhase.prototype = Object.create(OIMO.CollisionPhase.prototype);
OIMO.NarrowPhase.prototype.constructor = OIMO.MidPhase;

OIMO.NarrowPhase.prototype.computeManifolds = function(){
	OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
};
