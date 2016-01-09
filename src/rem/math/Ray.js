/**
 * A ray class from THREE.
 * @author bhouston
 * @author xprogram
 */
OIMO.Ray = function(o, d){
	this.origin = o;
	this.direction = d; // Normalized
};
OIMO.Ray.prototype = {
	constructor: OIMO.Ray,

	intersectTriangle: function(a, b, c, backfaceCulling, optionalTarget){
			var diff = _ray_intersectTriangle_diff;
			var edge1 = _ray_intersectTriangle_edge1;
			var edge2 = _ray_intersectTriangle_edge2;
			var normal = _ray_intersectTriangle_normal;

			edge1.subVectors(b, a);
			edge2.subVectors(c, a);
			normal.crossVectors(edge1, edge2);

			var DdN = this.direction.dot(normal);
			var sign;

			if(DdN > 0){
				if(backfaceCulling)
					return null;

				sign = 1;
			} else if(DdN < 0){
				sign = -1;
				DdN = -DdN;
			} else {
				return null;
			}

			diff.subVectors(this.origin, a);
			var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));

			// b1 < 0, no intersection
			if(DdQxE2 < 0)
				return null;

			var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));

			// b2 < 0, no intersection
			if(DdE1xQ < 0)
				return null;

			// b1+b2 > 1, no intersection
			if(DdQxE2 + DdE1xQ > DdN)
				return null;

			// Line intersects triangle, check if ray does.
			var QdN = -sign * diff.dot(normal);

			// t < 0, no intersection
			if(QdN < 0)
				return null;

			return this.at(QdN / DdN, optionalTarget);
		};
	}
};

var _ray_intersectTriangle_diff = new OIMO.Vec3();
var _ray_intersectTriangle_edge1 = new OIMO.Vec3();
var _ray_intersectTriangle_edge2 = new OIMO.Vec3();
var _ray_intersectTriangle_normal = new OIMO.Vec3();
