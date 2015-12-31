/**
 * Class for a mid-phase proxy.
 * @author xprogram
 */
OIMO.MidProxy = function(tri){
	OIMO.Proxy.call(this, _aabbs.alloc().setFromVertices(tri));

	this.triangle = tri;
};
