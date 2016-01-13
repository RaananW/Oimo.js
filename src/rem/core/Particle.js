/**
 * A particle that can belong to a body, liquid
 * or gaz.
 * @author xprogram
 */
OIMO.Particle = function(){
	this.position = new OIMO.Vec3;

	this.intersects = function(p){
		return this.position.distanceTo(p.position) <= 0.0002;
	};
};
