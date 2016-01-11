/**
 * Base class for all body types. It takes
 * an object of parameters.
 * @author lo-th
 * @author schteppe
 * @author xprogram
 */
OIMO.Body = function(params){
	OIMO.EventEmitter.call(this);
	OIMO.Shell.call(this, params);

	// Basic data
	this.name = "";
	this.world = null;
	this.parent = null;
	this.material = params.material || new OIMO.Material;

	// Shape data
	this.shape = params.shape || new OIMO.Shape;

	// Velocity (both types)
	this.velocity = params.velocity || new OIMO.Vec3;
	this.angularVelocity = params.angularVelocity || new OIMO.Vec3;

	// Vectors to compute in solver
	this.force = new OIMO.Vec3;
	this.impulse = new OIMO.Vec3;
	this.torque = new OIMO.Vec3;

	// Mass data
	this.mass = params.mass || 0;
	this.invMass = NaN;

	// Inertia data
	this.inertia = new OIMO.Mat3;
	this.invInertia = new OIMO.Mat3;
	this.invInertiaWorld = new OIMO.Mat3;

	// Sleep data
	this.useSleep = true;
	this.sleeping = false;
	this.sleepDelay = 0.1;

	// Soft body data
	this.stiffness = params.stiffness || Infinity;

	// Melting body data
	this.meltSpeed = params.meltSpeed || 0;
	this.meltPoint = params.meltPoint || 0;
	this.produceLiquids = params.produceLiquids || false;
	this.droppedLiquids = [];

	// Collision data
	this.produceForces = true;
	this.boundingBox = new OIMO.BoundingBox;
	this.boundingSphere = new OIMO.BoundingSphere;
	this.boundingCylinder = new OIMO.BoundingCylinder;

	// Link data
	this.links = [];

	if(params.velocity)
		this.velocity.copy(params.velocity);

	if(params.angularVelocity)
		this.angularVelocity.copy(params.angularVelocity);

	this.updateMassDetails();
};
OIMO.Body.prototype = {
	constructor: OIMO.Body,

	awake: function(){
		this.sleeping = false;
		this.emit("awake");
		return this;
	},
	sleep: function(){
		this.sleeping = true;
		this.velocity.setZero();
		this.angularVelocity.setZero();
		this.emit("sleep");
		return this;
	},
	dispose: function(){
		this.world.removeBody(this);
		return this;
	},
	intersectTest: function(type, shape){
		switch(type){
			case OIMO.TEST_SPHERE:
				return this.boundingSphere.overlaps(shape.boundingSphere);
			break;
			case OIMO.TEST_BOX:
				return this.boundingBox.overlaps(shape.boundingBox);
			break;
			case OIMO.TEST_CYLINDER:
				return this.boundingCylinder.overlaps(shape.boundingCylinder);
			break;
			case OIMO.TEST_CAPSULE:
				return this.boundingCapsule.overlaps(shape.boundingCapsule);
			break;
			default:
				return null;
			break;
		}
	},
	computeBounds: function(){
		this.boundingBox.setFromPoints(this.shape.vertices).expandByScalar(OIMO.BOUNDS_PROX);
		this.boundingSphere.setFromPoints(this.shape.vertices).expandByScalar(OIMO.BOUNDS_PROX);
		this.boundingCylinder.setFromPoints(this.shape.vertices).expandByScalar(OIMO.BOUNDS_PROX);
		this.boundingCapsule.setFromPoints(this.shape.vertices).expandByScalar(OIMO.BOUNDS_PROX);

		return this;
	},
	applyForce: function(f, p){
		if(this.type !== OIMO.BODY_DYNAMIC)
			return;

		this.force.add(f);
		this.torque.add(_body_applyForce_v1.crossVectors(p, f).clone());

		return this;
	},
	applyCentralForce: function(f){
		this.applyForce(f, _body_applyCentralForce_v1);
		return this;
	},
	updateInertiaWorld: function(override){ // From cannon.js
		var ir = this.invInertiaLocal;
		var mat3_1 = _body_updateInertiaWorld_m1, mat3_2 = _body_updateInertiaWorld_m2;

		// Only update when the diagonal entries are different
		if((ir.x !== ir.y && ir.y !== ir.z) || override){
			mat3_1.setFromQuaternion(this.rotation).transpose(mat3_2).scale(ir);
			this.invInertiaWorld.multiplyMatrices(mat3_1, mat3_2);
		}
	},
	integrate: function(dt){ // From cannon.js
		var pos = this.position, rot = this.rotation, lvel = this.velocity, avel = this.angularVelocity;
		var g = this.invMass * dt, f = this.force, t = this.torque;
		var lfac = this.linearFactor, afac = this.angularFactor, hdt = dt * 0.5;
		var ax = avel.x * afac.x, ay = avel.y * afac.y, az = avel.z * afac.z, bx = rot.x, by = rot.y, bz = rot.z, bw = rot.w;

		// Update velocity (linear)
		lvel.x += f.x * g * lfac;
		lvel.y += f.y * g * lfac;
		lvel.z += f.z * g * lfac;

		// Update velocity (angular)
		var e = this.invInertiaWorld.elements;
		var tx = torque.x * afac.x, ty = torque.y * afac.y, tz = torque.z * afac.z;
		avel.x += dt * (e[0] * tx + e[1] * ty + e[2] * tz);
		avel.y += dt * (e[3] * tx + e[4] * ty + e[5] * tz);
		avel.z += dt * (e[6] * tx + e[7] * ty + e[8] * tz);

		// Update position
		this.prevPosition.copy(pos);
		pos.x += lvel.x * dt;
		pos.y += lvel.y * dt;
		pos.z += lvel.z * dt;

		// Update rotation
		this.prevRotation.copy(rot);
		rot.x += hdt * (ax * bw + ay * bz - az * by);
		rot.y += hdt * (ay * bw + az * bx - ax * bz);
		rot.z += hdt * (az * bw + ax * by - ay * bx);
		rot.w += hdt * (-ax * bx - ay * by - az * bz);

		// Update extra information
		this.updateInertiaWorld();
		this.updateShape();
	},
	updateShape: function(){
		var sh = this.shape;

		sh.translate(_body_updateShape_v1.subVectors(this.position, this.prevPosition));
		sh.rotate(_body_updateShape_quat.subQuats(this.rotation, this.prevRotation));

		return this;
	},
	updateMassDetails: function(){
		var I = this.inertia;
		var fixed = this.fixedRotation;
		var halfExtents = new OIMO.Vec3;
		var target = new OIMO.Vec3;

		this.computeBounds();
		halfExtents.subVectors(this.boundingBox.max, this.boundingBox.min).divideScalar(2);

		var e = halfExtents;
		target.x = 0.0833 * mass * (2 * e.y * 2 * e.y + 2 * e.z * 2 * e.z);
		target.y = 0.0833 * mass * (2 * e.x * 2 * e.x + 2 * e.z * 2 * e.z);
		target.z = 0.0833 * mass * (2 * e.y * 2 * e.y + 2 * e.x * 2 * e.x);
		this.inertia.set(target.x, 0, 0, 0, target.y, 0, 0, 0, target.z);

		this.invInertia.set(
			I.x > 0 && !fixed ? 1.0 / I.x : 0,
			I.y > 0 && !fixed ? 1.0 / I.y : 0,
			I.z > 0 && !fixed ? 1.0 / I.z : 0
		);

		this.updateInertiaWorld(true);
	}
};

var _body_addShape_v1 = new OIMO.Vec3;
var _body_addShape_quat = new OIMO.Quat;
var _body_applyForce_v1 = new OIMO.Vec3;
var _body_applyCentralForce_v1 = new OIMO.Vec3;
var _body_updateInertiaWorld_m1 = new OIMO.Mat3;
var _body_updateInertiaWorld_m2 = new OIMO.Mat3;
var _body_updateShape_v1 = new OIMO.Vec3;
var _body_updateShape_quat = new OIMO.Quat;
