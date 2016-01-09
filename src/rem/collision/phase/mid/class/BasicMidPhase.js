/**
 * A mid-phase algorithm with iterating search.
 * @author xprogram
 */
OIMO.BasicMidPhase = function(){
	OIMO.MidPhase.call(this);
};
OIMO.BasicMidPhase.prototype = Object.create(OIMO.MidPhase.prototype);
OIMO.BasicMidPhase.prototype.constructor = OIMO.BasicMidPhase;

OIMO.BasicMidPhase.prototype.findNearest = function(s1, s2, manifold){
	var i, j, a, b, ra;
	a = s1.vertices;
	b = s2.vertices;
	i = a.length;
	j = b.length;

	// There are much less vertices than triangles, so loop over that
	// and find the intersecting vertices with their respective triangles
	// using bounding radius of vertices.
	while(i--){
		while(j--){
			if(b[j].distanceTo(s1.position) <= a[i].distanceTo(s1.position))
				manifold.addVertexCross(a[i], b[j]);
		}
	}
};
