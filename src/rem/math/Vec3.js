/**
 * A 3D vector.
 * @author lo-th
 * @author xprogram
 */
OIMO.Vec3 = function(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};
OIMO.Vec3.prototype = {
	constructor: OIMO.Vec3,

	set: function(x, y, z){
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		return this;
	},
	setX: function(x){
		this.x = x;
		return this;
	},
	setY: function(y){
		this.y = y;
		return this;
	},
	setZ: function(z){
		this.z = z;
		return this;
	},
	copy: function(v){
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	},
	clone: function(){
		return new this.constructor(this.x, this.y, this.z);
	},
	add: function(v){
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	},
	addVectors: function(a, b){
		return this.set(a.x + b.x, a.y + b.y, a.z + b.z);
	},
	addScalar: function(s){
		this.x += s;
		this.y += s;
		this.z += s;
		return this;
	},
	sub: function(v){
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	},
	subVectors: function(a, b){
		return this.set(a.x - b.x, a.y - b.y, a.z - b.z);
	},
	subScalar: function(s){
		this.x -= s;
		this.y -= s;
		this.z -= s;
		return this;
	},
	multiply: function(v){
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	},
	multiplyVectors: function(a, b){
		return this.set(a.x * b.x, a.y * b.y, a.z * b.z);
	},
	multiplyScalar: function(s){
		this.x *= s;
		this.y *= s;
		this.z *= s;
		return this;
	},
	divide: function(v){
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
		return this;
	},
	divideVectors: function(v){
		return this.set(a.x / b.x, a.y / b.y, a.z / b.z);
	},
	divideScalar: function(s){
		if(s){
			this.x /= s;
			this.y /= s;
			this.z /= s;
		} else {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		}

		return this;
	},
	toString: function(){
		return "Vec3[" + this.x.toFixed(4) + "," + this.y.toFixed(4) + "," + this.z.toFixed(4) + "]";
	},
	lengthSq: function(){
		return this.dot(this);
	},
	length: function(){
		return OIMO.sqrt(this.lengthSq());
	},
	dot: function(v){
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	normalize: function(){
		return this.divideScalar(this.length());
	},
	equals: function(v){
		return this.x === v.x && this.y === v.y && this.z === v.z;
	},
	invert: function(){
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	}
};
