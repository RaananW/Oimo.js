/**
 * A bounding sphere that encloses shapes.
 * @author xprogram
 */
OIMO.BoundingSphere = function(center, radius){
	this.center = center || new OIMO.Vec3;
	this.radius = radius || 0;
};
OIMO.BoundingSphere.prototype = {
	constructor: OIMO.BoundingSphere,

	merge: function(sphere){
		this.radius = Math.max(this.center.distanceTo(sphere.center) + sphere.radius, this.radius);
		return this;
	},
	setFromPoints: function(pts){
		var i = pts.length;

		while(i--)
			this.expandByPoint(pts[i]);

		return this;
	},
	expandByPoint: function(p){
		this.radius = Math.max(this.center.distanceTo(p), this.radius);
		return this;
	},
	expandByScalar: function(s){
		this.radius += s;
		return this;
	},
	containsPoint: function(){
	
	},
	getBoundingBox: function(){
	
	},
	getBoundingCylinder: function(){
		return new OIMO.BoundingCylinder(this.center, this.radius, this.radius * 2);
	}
};
