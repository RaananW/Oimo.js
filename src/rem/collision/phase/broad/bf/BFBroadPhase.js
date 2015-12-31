/**
 * A broad-phase algorithm with brute-force search.
 * This always checks for all possible pairs.
 * @author lo-th
 */
OIMO.BFBroadPhase = function(){
	OIMO.BroadPhase.call(this);
};
OIMO.BFBroadPhase.prototype = Object.create(OIMO.BroadPhase.prototype);
OIMO.BFBroadPhase.prototype.constructor = OIMO.BFBroadPhase;

OIMO.BFBroadPhase.prototype.createProxy = function(shape){
	return new OIMO.BRBroadProxy(shape);
};
OIMO.BFBroadPhase.prototype.addProxy = function(proxy){
	if(proxy instanceof OIMO.BRBroadProxy && this.proxies.indexOf(proxy) !== -1)
		this.proxies.push(proxy);
};
OIMO.BFBroadPhase.prototype.removeProxy = function(proxy){
	var arr = this.proxies;
	var i = arr.length;

	while(i--){
		if(arr[i] === proxy)
			arr[i] = arr[arr.length - 1];
	}

	arr.length--;
};
OIMO.BRBroadPhase.prototype.collectPairs = function(){
	var i, j, p1, b1, s1, p2, b2, s2, arr = this.proxies, l = arr.length;

	this.numChecks = l * (l - 1) >> 1;

	i = l; // Amount of proxies to check
	while(i--){
		p1 = arr[i]; // First proxy
		b1 = p1.aabb; // AABB of proxy 1
		s1 = p1.shape; // Shape of proxy 1
		j = l; // Amount of proxies to check

		while(j--){
			if(j !== i){
				p2 = arr[j]; // Second proxy
				b2 = p2.aabb; // AABB of proxy 2
				s2 = p2.shape; // Shape of proxy 2

				if(b1.containsBox(b2) && !this.isAvailablePair(s1, s2))
					continue;

				this.addPair(p1, p2);
			}
		}
	}
};
