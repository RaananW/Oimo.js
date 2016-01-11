/**
 * A bounding cylinder that encases shapes.
 * @author xprogram
 */
OIMO.BoundingCylinder = function(center, radius, height){
	this.center = center || new OIMO.Vec3;
	this.radius = radius || 0;
	this.height = height || 0;
};
OIMO.BoundingCylinder.prototype = {
	constructor: OIMO.BoundingCylinder,

	expandByScalar: function(s){
		this.radius += s;
		this.height += s;

		return this;
	},
	expandByPoint: function(p){
		if(this.containsPoint(p)){
			var a = this.center;
			this.radius = Math.sqrt((p.x - a.x) * (p.x - a.x) + (p.z - a.z) * (p.z - a.z));
			this.height += Math.abs(p.y - this.height);
		}

		return this;
	},
	containsPoint: function(b){
		var a = this.center;
		var cm = 0.5 * this.height + a.y;
		var mc = cm - this.height;
		var c1 = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.z - a.z) * (b.z - a.z)) <= this.radius + cylinder.radius;
		var c2 = (cm >= b && mc <= b) || (cm >= b && mc <= b);

		return c1 && c2;
	},
	overlaps: function(cylinder){
		var a = this.center;
		var b = cylinder.center;
		var cm = 0.5 * this.height + a.y;
		var mc = cm - this.height;
		var dm = 0.5 * cylinder.height + b.y;
		var md = dm - cylinder.height;
		var c1 = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.z - a.z) * (b.z - a.z)) <= this.radius + cylinder.radius;
		var c2 = (cm >= dm && mc <= dm) || (cm >= md && mc <= md);

		return c1 && c2;
	}
};
