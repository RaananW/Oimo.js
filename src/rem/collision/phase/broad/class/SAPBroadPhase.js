/**
 * A sweep and prune algorithm for checking possible
 * pairs by rearranging 3 arrays of shapes so that
 * the closest ones are displayed correctly to check.
 * @author lo-th
 * @author xprogram
 */
OIMO.SAPBroadPhase = function(){
	OIMO.BroadPhase.call(this);
};
OIMO.SAPBroadPhase.prototype = Object.create(OIMO.BroadPhase.prototype);
OIMO.SAPBroadPhase.prototype.constructor = OIMO.SAPBroadPhase;

OIMO.SAPBroadPhase.prototype.collectPairs = function(){
	var swx = [], swy = [], swz = []; // Three sweep axis
	var arr = this.shapes, l = arr.length;
	var s1, s2, r1, r2;
	var i, j;

	i = l;
	while(i--)
		swx[i] = arr[i].boundingCenter.x;

	swx.sort(OIMO.ARR_NUMBERS_UP);

	i = l;
	while(i--)
		swy[i] = arr[i].boundingCenter.y;

	swy.sort(OIMO.ARR_NUMBERS_UP);

	i = l;
	while(i--)
		swz[i] = arr[i].boundingCenter.z;

	swz.sort(OIMO.ARR_NUMBERS_UP);

	// And finally... collision detection!
	i = l;
	while(i--){
		j = l;
		s1 = arr[i];

		while(j--){
			s2 = arr[j];

			if(s1 === s2)
				continue;

			if(!this.intersectTestX(s1, s2))
				break;

			if(!this.intersectTestY(s1, s2))
				break;
	
			if(!this.intersectTestZ(s1, s2))
				break;

			this.addPair(s1, s2);
		}
	}
};
