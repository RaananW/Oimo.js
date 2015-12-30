/**
 * Class for a group-phase proxy.
 * @author xprogram
 */
OIMO.GroupProxy = function(list){
	var aabb = OIMO.alloc(OIMO.AABB), i, l = list.length;

	this.proxies = list;

	for(i = 0; i < l; i++){
		aabb.merge(list[i]);
	}

	this.aabb = aabb;
};
