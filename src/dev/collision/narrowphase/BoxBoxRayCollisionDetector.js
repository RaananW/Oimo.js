OIMO.BoxBoxRayCollisionDetector = function(){
	OIMO.CollisionDetector.call(this);
};
OIMO.BoxBoxRayCollisionDetector.prototype = Object.create(OIMO.CollisionDetector.prototype);
OIMO.BoxBoxRayCollisionDetector.prototype.constructor = OIMO.BoxBoxRayCollisionDetector;

OIMO.BoxBoxRayCollisionDetector.prototype.detectCollision = function(sh1, sh2, manifold){
	var vec3_1 = new OIMO.Vector3().fromArray(sh1.position.elements);
	var vec3_2 = new OIMO.Vector3().fromArray(sh1.position.elements);
	var intersect = new OIMO.Ray(vec3_1, vec3_2.normalize()).intersectBox(sh1.aabb);

	if(intersect !== null){
		manifold.addPoint(intersect);
	}
};
