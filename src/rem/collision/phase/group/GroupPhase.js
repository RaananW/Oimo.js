/**
 * Class for a group phase implementation, a
 * phase before broad phase to narrow down even
 * more the collision checking.
 */
OIMO.GroupPhase = function(detail){
	this.groupSize = detail;
};
OIMO.GroupPhase.prototype = {
	constructor: OIMO.GroupPhase,

	computePairs: function(){
		OIMO.err("GroupPhase", OIMO.ERR_INHERITANCE);
	}
};
