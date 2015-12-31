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
