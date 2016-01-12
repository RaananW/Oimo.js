/**
 * A bounding box that encloses shapes.
 * @author lo-th
 * @author xprogram
 */
OIMO.BoundingBox = function(){
	this.min = new OIMO.Vec3;
	this.max = new OIMO.Vec3;
};
OIMO.BoundingBox.prototype = {
	constructor: OIMO.BoundingBox,

	merge: function(box){
		this.expandByPoint(box.min).expandByPoint(box.max);
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
		var mn = this.min;
		var mx = this.max;

		return (
			pt.x >= mn.x && pt.x <= mx.x &&
			pt.y >= mn.y && pt.y <= mx.y &&
			pt.z >= mn.z && pt.z <= mx.z
		);
	},
	containsBox: function(box){
		return this.containsPoint(box.min) && this.containsPoint(box.max);
	},
	containsSphere: function(sphere){
		return this.containsBox(sphere.getBoundingBox());
	},
	containsCylinder: function(cylinder){
		return this.containsBox(cylinder.getBoundingBox());
	},
	overlaps: function(box){
		return this.containsPoint(box.min) || this.containsPoint(box.max);
	},
	getCenter: function(){
		return new OIMO.Vec3().add(this.min).add(this.max).divideScalar(2);
	},
	getWidth: function(){
		return this.max.x - this.min.x;
	},
	getHeight: function(){
		return this.max.y - this.min.y;
	},
	getDepth: function(){
		return this.max.z - this.min.z;
	},
	getFarthestPoint: function(){
		var c = this.getCenter();
		return (c.distanceTo(this.min) > c.distanceTo(this.max)) ? this.max : this.min;
	},
	getBoundingSphere: function(){
		var c = this.getCenter();
		return new OIMO.BoundingSphere(c, c.distanceTo(this.getFarthestPoint()));
	},
	getBoundingCylinder: function(){
		var a = this.getCenter(), p = this.getFarthestPoint();
		var r = Math.sqrt((p.x - a.x) * (p.x - a.x) + (p.z - a.z) * (p.z - a.z));
		return new OIMO.BoundingCylinder(a, r, this.getHeight());
	}
};
