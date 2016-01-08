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
	var i, j, s1, s2, arr = this.shapes, l = arr.length;

	//this.numChecks = l * (l - 1) >> 1;

	i = l; // Amount of proxies to check
	while(i--){
		s1 = arr[i]; // First shape
		j = l; // Amount of shapes to check

		while(j--){
			if(j !== i){
				s2 = arr[j]; // Second shape

				if(this.isAvailablePair(s1, s2))
					this.intersectTest(s1, s2);
			}
		}
	}
};
