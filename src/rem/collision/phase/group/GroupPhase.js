/**
 * Class for a group phase implementation, a
 * phase before broad phase to narrow down even
 * more the collision checking.
 * @author xprogram
 */
OIMO.GroupPhase = function(detail){
	OIMO.CollisionPhase.call(this);

	this.groupSize = detail;
};
OIMO.GroupPhase.prototype = Object.create(OIMO.CollisionPhase.prototype);
OIMO.GroupPhase.prototype.constructor = OIMO.GroupPhase;
