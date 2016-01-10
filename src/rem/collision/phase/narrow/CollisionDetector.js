/**
 * Base class for all collision detectors in
 * narrowphase.
 * @author lo-th
 * @author xprogram
 */
OIMO.CollisionDetector = function(){};
OIMO.CollisionDetector.prototype = {
	solveCollision: function(t1, t2, manifold){
		OIMO.err("CollisionDetector", OIMO.ERR_INHERITANCE);
	}
};
