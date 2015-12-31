/**
 * Class for a mid-phase implementation, where we determine
 * which face is colliding with which face between 2 shapes.
 * @author xprogram
 */
OIMO.MidPhase = function(){
	this.pairs = [];
};
OIMO.BroadPhase.prototype = {
	constructor: OIMO.MidPhase,

	createProxy: function(){
		OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
	},
	addProxy: function(){
		OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
	},
	removeProxy: function(){
		OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
	},
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
