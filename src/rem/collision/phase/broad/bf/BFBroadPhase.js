/**
 * A broad-phase algorithm with brute-force search.
 * This always checks for all possible pairs.
 * @author lo-th
 * @author xprogram
 */
OIMO.BFBroadPhase = function(){
	OIMO.BroadPhase.call(this);
};
OIMO.BFBroadPhase.prototype = Object.create(OIMO.BroadPhase.prototype);
OIMO.BFBroadPhase.prototype.constructor = OIMO.BFBroadPhase;

OIMO.BRBroadPhase.prototype.collectPairs = function(){
	var i, j, b1, s1, b2, s2, arr = this.shapes, l = arr.length;

	this.numChecks = l * (l - 1) >> 1;

	i = l; // Amount of proxies to check
	while(i--){
		s1 = arr[i]; // First shape
		b1 = s1.aabb; // AABB of shape 1
		j = l; // Amount of shapes to check

		while(j--){
			if(j !== i){
				p2 = arr[j]; // Second shape
				b2 = s2.aabb; // AABB of shape 2

				if(b1.containsBox(b2) && this.isAvailablePair(s1, s2))
					this.addPair(s1, s2);
			}
		}
	}
};
