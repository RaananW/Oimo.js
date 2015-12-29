/**
 * Class for a group phase implementation, a
 * phase before broad phase to narrow down even
 * more the collision checking.
 * @author xprogram
 */
OIMO.GroupPhase = function(detail){
	OIMO.CollisionPhase.call(this);

	this.groups = [];
	this.groupSize = detail;
};
OIMO.GroupPhase.prototype = Object.create(OIMO.CollisionPhase.prototype);
OIMO.GroupPhase.prototype.constructor = OIMO.GroupPhase;

OIMO.GroupPhase.prototype.computeGroups = function(){
	var i, j, m, c, ac, d, ad, f, bd, nr, pl, ck, gr, bodies = this.proxies;

	i = bodies.length;
	nr = []; // Array of distances
	bd = []; // Array of AABBs to add to group
	gr = []; // Array of proxy groups
	pl = {}; // Object reference to AABBs from a distance

	while(i--){
		c = bodies[i];
		ac = c.aabb;
		j = bodies.length;
		m = this.groupSize;

		if(c.isGrouped)
			continue;

		bd.push(c);
		while(j--){
			d = bodies[j];
			ad = d.aabb;
			ck = ac.center.distanceTo(ad.center);

			// Cannot collide with itself
			if(c === d)
				continue;

			nr.push(ck);
			pl[ck] = d; // Store index for later use
		}

		// Sort array to quickly get the nearest AABBs
		nr.sort(OIMO.ARR_NUMBERS_UP);

		// Add the nearest AABBs to the new group
		while(m--){
			if(!nr.length)
				break;

			f = pl[nr.shift()];
			f.isGrouped = true;
			bd.push(f);
		}

		gr.push(new OIMO.GroupProxy(bd));
	}

	this.groups = gr;
};
