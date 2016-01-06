/**
 * A shape is used to detect collisions of bodies.
 * @author saharan
 * @author lo-th
 */
OIMO.Shape = function(verts, faces){
	var i, t;
	i = faces.length;

	// Check if faces are valid inputs
	while(i--){
		t = faces[i];

		if(t[0] === t[1] || t[1] === t[2] || t[0] === t[2]){
			OIMO.err("Shape", "You cannot have a triangle with identical vertices.");
			return;
		}
	}

	this.id = OIMO.id();

	// Body data
	this.body = null;
	this.contacts = [];

	// Position data
	this.positionWorld = new OIMO.Vec3;

	// Rotation data
	this.rotationWorld = new OIMO.Mat3;
	this.rotationLocal = new OIMO.Mat3;

	// Simulation data
	this.aabb = new OIMO.AABB;
	this.vertices = verts;
	this.faces = faces;

	// Mass data
	this.density = 1;
};
OIMO.Shape.prototype = {
	constructor: OIMO.Shape,

	setupMassInfo: function(out){
		var i, t, vs = this.vertices, r, m = 0;
		var v1 = new OIMO.Vec3, v2 = new OIMO.Vec3, v3 = new OIMO.Vec3;
		var c1, c2, c3;

		while(i--){
			t = this.faces[i];

			r = vs[t[0]];
			v1.set(r[0], r[1], r[2]);

			r = vs[t[1]];
			v2.set(r[0], r[1], r[2]);

			r = vs[t[1]];
			v3.set(r[0], r[1], r[2]);

			// Calculate approximated mass using tetra formula based off vertices
			// From: http://www.ditutor.com/vectors/volume_tetrahedron.html
			m += 0.1666 * OIMO.mix(
				_shape_setupMassInfo_v1.subVectors(v2, v1),
				_shape_setupMassInfo_v2.subVectors(v3, v1),
				_shape_setupMassInfo_v3.subVectors(OIMO.Vec3.ZERO, v1)
			);
		}

		out.mass = m * this.density;
		out.inertia.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
	},
	computeAabb: function(){
		this.aabb.setFromPoints(this.vertices).expandByScalar(OIMO.AABB_PROX);
	}
};

var _shape_setupMassInfo_v1 = new OIMO.Vec3;
var _shape_setupMassInfo_v2 = new OIMO.Vec3;
var _shape_setupMassInfo_v3 = new OIMO.Vec3;
