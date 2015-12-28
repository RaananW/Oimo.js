/**
 * Base class for all collision phases in a step.
 * @author xprogram
 */
OIMO.CollisionPhase = function(){
	this.world = null;
};
OIMO.CollisionPhase.prototype = {
	constructor: OIMO.CollisionPhase,

	computePairs: function(){
		OIMO.err("CollisionPhase", OIMO.ERR_INHERITANCE);
	}
};
