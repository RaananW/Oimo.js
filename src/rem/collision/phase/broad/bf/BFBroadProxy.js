/**
 * A broad-phase brute-force proxy to use when
 * stepping the world.
 * @author lo-th
 * @author xprogram
 */
OIMO.BFBroadProxy = function(shape){
	OIMO.BroadProxy.call(this, shape);
};
OIMO.BFBroadProxy.prototype = Object.create(OIMO.BroadProxy.prototype);
OIMO.BFBroadProxy.prototype.constructor = OIMO.BFBroadProxy;
