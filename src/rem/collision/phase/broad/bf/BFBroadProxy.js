/**
 * A broad-phase brute-force proxy to use when
 * stepping the world.
 * @author lo-th
 * @author xprogram
 */
OIMO.BFBroadProxy = function(s1, s2){
	OIMO.BroadProxy.call(this, s1, s2);
};
OIMO.BFBroadProxy.prototype = Object.create(OIMO.BroadProxy.prototype);
OIMO.BFBroadProxy.prototype.constructor = OIMO.BFBroadProxy;
