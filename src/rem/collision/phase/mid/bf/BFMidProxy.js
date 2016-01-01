/**
 * A mid-phase brute-force proxy to use when
 * stepping the world.
 * @author lo-th
 * @author xprogram
 */
OIMO.BFMidProxy = function(shape){
	OIMO.MidProxy.call(this, shape);
};
OIMO.BFMidProxy.prototype = Object.create(OIMO.MidProxy.prototype);
OIMO.BFMidProxy.prototype.constructor = OIMO.BFMidProxy;
