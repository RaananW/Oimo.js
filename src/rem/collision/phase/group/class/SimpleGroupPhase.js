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
	var i, j, c, d, gr;

	this.pairs = [];

	// Create groups with given shape proxies
	this.computeGroups();

	gr = this.groups;
	i = gr.length;

	// Check each group for collision (using brute-force)
	while(i--){
		c = gr[i];
		j = gr.length;

		while(j--){
			d = gr[j];

			if(this.isAvailablePair(c, d) && c.aabb.intersects(d.aabb))
				this.addPair(c, d);
		}
	}
};
