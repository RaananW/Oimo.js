/**
 * An axis-aligned bounding box.
 * @author lo-th
 * @author xprogram
 */
OIMO.AABB = function(){
	this.min = new OIMO.Vec3;
	this.max = new OIMO.Vec3;
};
OIMO.AABB.prototype = {
	constructor: OIMO.AABB,

	merge: function(aabb){
		this.expandByPoint(aabb.min);
		this.expandByPoint(aabb.max);
		return this;
	},
	setFromPoints: function(pts){
		var i = pts.length;

		while(i--)
			this.expandByPoint(pts[i]);

		return this;
	},
	expandByPoint: function(pt){
		this.min.min(pt);
		this.max.max(pt);
		return this;
	},
	expandByScalar: function(s){
		this.min.addScalar(-s);
		this.max.addScalar(s);
		return this;
	},
	containsPoint: function(pt){
		return (
			pt.x >= this.min.x && pt.x <= this.max.x &&
			pt.y >= this.min.y && pt.y <= this.max.y &&
			pt.z >= this.min.z && pt.z <= this.max.z
		);
	},
	containsBox: function(box){
		return this.containsPoint(box.min) && this.containsPoint(box.max);
	},
	overlaps: function(box){
		return this.containsPoint(box.min) || this.containsPoint(box.max);
	},
	getCenter: function(){
		return new OIMO.Vec3().add(box.min).add(box.max).divideScalar(2);
	},
	getFarthestPoint: function(){
		return (this.getCenter().distanceTo(this.min) < this.getCenter().distanceTo(this.max)) ? this.max : this.min;
	},
	getRadius: function(){
		return this.getCenter().distanceTo(this.getFarthestPoint()));
	}
};
