/**
 * Class for a mid-phase implementation, where we determine
 * which face is colliding with which face between 2 shapes.
 * @author xprogram
 */
OIMO.MidPhase = function(){};
OIMO.MidPhase.prototype = {
	constructor: OIMO.MidPhase,

	findNearest: function(s1, s2, manifold){
		OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
	}
};
