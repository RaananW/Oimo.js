/**
 * The broad-phase is used for collecting possible pairs
 * for collision based on the input from the group-phase.
 * @author lo-th
 * @author xprogram
 */
OIMO.BroadPhase = function(){
	OIMO.CollisionPhase.call(this);

	this.pairs = [];
};
OIMO.BroadPhase.prototype = Object.create(OIMO.CollisionPhase.prototype);
OIMO.BroadPhase.prototype.constructor = OIMO.BroadPhase;

OIMO.BroadPhase.prototype.createProxy = function(){
	OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
};
OIMO.BroadPhase.prototype.addProxy = function(){
	OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
};
OIMO.BroadPhase.prototype.removeProxy = function(){
	OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
};
OIMO.BroadPhase.prototype.computePairs = function(){
	this.pairs = []; // Reset array
	this.collectPairs();
};
OIMO.BroadPhase.prototype.collectPairs = function(){
	OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
};
OIMO.BroadPhase.prototype.addPair = function(p1, p2){
	this.pairs.push(new OIMO.Pair(p1, p2));
};
