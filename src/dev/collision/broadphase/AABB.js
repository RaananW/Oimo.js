/**
 * An axis-aligned bounding box.
 * @author saharan
 * @author lo-th
 */
OIMO.AABB = function(minX, maxX, minY, maxY, minZ, maxZ){
	this.minX = minX || 0;
	this.maxX = maxX || 0;
	this.minY = minY || 0;
	this.maxY = maxY || 0;
	this.minZ = minZ || 0;
	this.maxZ = maxZ || 0;

	// For your own vector definiton, you don't use it alot... which is why I put this
	this.min = new OIMO.Vec3(this.minX, this.minY, this.minZ);
	this.max = new OIMO.Vec3(this.maxX, this.maxY, this.maxZ);
};

OIMO.AABB.prototype = {
    constructor: OIMO.AABB,

    init:function(mnX, mxX, mnY, mxY, mnZ, mxZ ){
		this.minX = mnX || 0;
		this.maxX = mxX || 0;
		this.minY = mnY || 0;
		this.maxY = mxY || 0;
		this.minZ = mnZ || 0;
		this.maxZ = mxZ || 0;
    },

    /**
     * Set this AABB to the combined AABB of aabb1 and aabb2.
     * @param aabb1
     * @param aabb2
     */
    combine: function(aabb1, aabb2){
		this.minX = (aabb1.minX < aabb2.minX) ? aabb1.minX : aabb2.minX;
		this.maxX = (aabb1.maxX > aabb2.maxX) ? aabb1.maxX : aabb2.maxX;
		this.minY = (aabb1.minY < aabb2.minY) ? aabb1.minY : aabb2.minY;
		this.maxY = (aabb1.maxY > aabb2.maxY) ? aabb1.maxY : aabb2.maxY;
		this.minZ = (aabb1.minZ < aabb2.minZ) ? aabb1.minZ : aabb2.minZ;
		this.maxZ = (aabb1.maxZ > aabb2.maxZ) ? aabb1.maxZ : aabb2.maxZ;
    },

    /**
     * Get the surface area.
     * @return
     */
	surfaceArea:function(){
		var h=this.maxY-this.minY;
		var d=this.maxZ-this.minZ;
		return 2*((this.maxX-this.minX)*(h+d)+h*d);
	},

    /**
     * Get whether the AABB intersects with the point or not.
     * @param x
     * @param y
     * @param z
     * @return whether there was a collision or not
     */
	intersectsWithPoint: function(x, y, z){
		return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY && z >= this.minZ && z<= this.maxZ;
	}
}
