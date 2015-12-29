OIMO.SimpleGroupPhase = function(detail){
	OIMO.GroupPhase.call(this, detail);
};
OIMO.SimpleGroupPhase.prototype = Object.create(OIMO.GroupPhase.prototype);
OIMO.SimpleGroupPhase.prototype.constructor = OIMO.SimpleGroupPhase;

OIMO.SimpleGroupPhase.prototype.addProxy = function(proxy){
	this.proxies.push(proxy);
};
OIMO.SimpleGroupPhase.prototype.removeProxy = function(proxy){
	this.proxies.splice(this.proxies.indexOf(proxy), 1);	
};
OIMO.SimpleGroupPhase.prototype.computePairs = function(){
	/*
	 * What we are doing:
	 * We are using an optimized version of brute force collision
	 * detection to group and check AABB proxies merged together.
	 * That's just the concept.
	 */
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

	i = gr.length;

	// Check each group for collision (using brute-force)
	while(i--){
		c = gr[i];
		j = gr.length;

		while(j--){
			d = gr[j];

			if(OIMO.GroupUtils.detectCollision(c, d))
				this.addPair(c, d);
		}
	}
};
