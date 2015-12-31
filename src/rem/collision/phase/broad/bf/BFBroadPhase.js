/**
 * A broad-phase algorithm with brute-force search.
 * This always checks for all possible pairs.
 * @author lo-th
 */
OIMO.BFBroadPhase = function(){
	OIMO.BroadPhase.call(this);

	this.proxies = [];
};
