/**
 * Class for a mid-phase implementation, where we determine
 * which face is colliding with which face between 2 shapes.
 * @author xprogram
 */
OIMO.MidPhase = function(){
	OIMO.CollisionPhase.call(this);
};
OIMO.MidPhase.prototype = Object.create(OIMO.CollisionPhase.prototype);
OIMO.MidPhase.prototype.constructor = OIMO.MidPhase;

OIMO.MidPhase.prototype.computePairs = function(){
	OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
};
