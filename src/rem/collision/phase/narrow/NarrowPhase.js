/**
 * Class for a narrow-phase implementation, where we determine
 * where each face is colliding with each face between 2 shapes.
 * @author xprogram
 */
OIMO.NarrowPhase = function(){
	this.manifolds = [];
};
OIMO.NarrowPhase.prototype = {
	constructor: OIMO.NarrowPhase,

	createProxy: function(){
		OIMO.err("NarrowPhase", OIMO.ERR_INHERITANCE);
	},
	addProxy: function(){
		OIMO.err("NarrowPhase", OIMO.ERR_INHERITANCE);
	},
	removeProxy: function(){
		OIMO.err("NarrowPhase", OIMO.ERR_INHERITANCE);
	},
	computeManifolds: function(){
		this.manifolds = []; // Reset array
		this.collectManifolds();
	},
	collectManifolds: function(){
		OIMO.err("NarrowPhase", OIMO.ERR_INHERITANCE);
	},
	addPair: function(p1, p2){
		this.pairs.push(new OIMO.Pair(p1, p2));
	}
};
