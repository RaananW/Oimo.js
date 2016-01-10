/**
 * A shape is used to detect collisions of bodies.
 * The default is a tetrahedron. All of the parameters
 * are in world space.
 * @author saharan
 * @author lo-th
 * @author xprogram
 */
OIMO.Shape = function(p0, p1){
	var i, p, t, that = this;
	var v1, v2, v3;
	var verts = p0 || [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]];
	var indices = p1 || [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]];

	function prepare(vector){
		vector.index = that.vertices.push(vector) - 1;
	}

	function make(a, b, c){
		that.faces.push(new OIMO.Face(a, b, c));
	}

	// Setup data
	this.vertices = [];
	this.faces = [];
	i = verts.length;

	while(i--)
		prepare(new OIMO.Vec3(verts[i][0], verts[i][1], verts[i][2]));

	this.vertices.reverse();

	// Reset data
	i = indices.length;
	t = this.vertices;

	while(i--)
		make(t[indices[i][0]].index, t[indices[i][1]].index, t[indices[i][2]].index);

	this.faces.reverse();

	// Body & shape data
	this.id = OIMO.id();
	this.body = null;
	this.contacts = [];

	// Simulation data
	this.aabb = new OIMO.AABB;
	this.density = 1;
	this.boundingRadius = this.aabb.getRadius();
};
OIMO.Shape.prototype = {
	constructor: OIMO.Shape,

	setupMassInfo: function(out){
		var i, t, r, vs = this.vertices;
		var m = 0, mass = 0, inertia = 0;
		var pos = _shape_setupMassInfo_v7;
		var v1 = _shape_setupMassInfo_v4, v2 = _shape_setupMassInfo_v5, v3 = _shape_setupMassInfo_v6;
		i = vs.length;

		while(i--){
			t = this.faces[i];

			r = vs[t.a];
			v1.set(r.x, r.y, r.z);

			r = vs[t.b];
			v2.set(r.x, r.y, r.z);

			r = vs[t.c];
			v3.set(r.x, r.y, r.z);

			// Calculate approximated mass using tetra formula based off vertices
			// From: http://www.ditutor.com/vectors/volume_tetrahedron.html
			m = 0.1666 * OIMO.mix(
				_shape_setupMassInfo_v1.subVectors(v2, v1),
				_shape_setupMassInfo_v2.subVectors(v3, v1),
				_shape_setupMassInfo_v3.subVectors(pos, v1)
			);

			// Calculate approximated inertia value using tetra formula (regular tetra formula)
			// From: http://www.calctown.com/calculators/moment-of-inertia-of-tetrahedron
			inertia += 0.05 * m * OIMO.pow(v1.distanceTo(pos), 2);

			// Add extra tetra mass
			mass += m;
		}

		out.mass = mass * this.density;
		out.inertia.set(inertia, 0, 0, 0, inertia, 0, 0, 0, inertia);
	},
	computeAABB: function(){
		this.aabb.setFromPoints(this.vertices).expandByScalar(OIMO.AABB_PROX);
	},
	scale: function(radius){
		var i = this.vertices.length;

		while(i--)
			this.vertices[i].multiplyScalar(radius);

		// Calculate broadphase data
		this.boundingRadius *= radius;
		this.computeAABB();
	},
	getCenter: function(){
		var p = this.faces;
		var i = p.length;
		var f = new OIMO.Vec3;
	
		while(i--)
			f.add(p[i].getCentroid());
	
		f.divideScalar(p.length);
		return f;
	}
};

var _shape_setupMassInfo_v1 = new OIMO.Vec3;
var _shape_setupMassInfo_v2 = new OIMO.Vec3;
var _shape_setupMassInfo_v3 = new OIMO.Vec3;
var _shape_setupMassInfo_v4 = new OIMO.Vec3;
var _shape_setupMassInfo_v5 = new OIMO.Vec3;
var _shape_setupMassInfo_v6 = new OIMO.Vec3;
var _shape_setupMassInfo_v7 = new OIMO.Vec3;
