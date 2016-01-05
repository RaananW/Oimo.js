/**
 * The broad-phase is used for collecting possible pairs
 * for collision based on the input from the group-phase.
 * @author lo-th
 * @author xprogram
 */
OIMO.BroadPhase = function(){
	this.shapes = [];
	this.pairs = [];
	this.numChecks = 0;
};
OIMO.BroadPhase.prototype = {
	constructor: OIMO.BroadPhase,

	computePairs: function(){
		this.pairs = []; // Reset array
		this.collectPairs();
	},
	collectPairs: function(){
		OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
	},
	addPair: function(p1, p2){
		this.pairs.push(new OIMO.Pair(p1, p2));
	}
};
