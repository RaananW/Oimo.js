/**
 * A broad-phase proxy.
 * @author xprogram
 */
OIMO.BroadProxy = function(shape){
	OIMO.Proxy.call(this, shape.aabb);

	this.shape = shape;
};
