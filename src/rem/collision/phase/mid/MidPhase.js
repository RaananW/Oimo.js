/**
 * Class for a mid-phase implementation, where we determine
 * which face is colliding with which face between 2 shapes.
 * @author xprogram
 */
OIMO.MidPhase = function(){
	this.proxies = [];
	this.pairs = [];
	this.numChecks = 0;
};
OIMO.MidPhase.prototype = {
	constructor: OIMO.MidPhase,

	createProxy: function(){
		OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
	},
	addProxy: function(){
		OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
	},
	removeProxy: function(){
		OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
	},
	computePairs: function(){
		this.pairs = []; // Reset array
		this.collectPairs();
	},
	collectPairs: function(){
		OIMO.err("MidPhase", OIMO.ERR_INHERITANCE);
	},
	addPair: function(p1, p2){
		this.pairs.push(new OIMO.Pair(p1, p2));
	}
};
