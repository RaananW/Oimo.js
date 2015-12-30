var OIMO = (function(){
	var OIMO = OIMO || {
		REVISION: 1,
		EPSILON: 0.0001,
		ERR_INHERITANCE: "Inheritance error.",

		// Math functions
		abs: Math.abs,
		acos: Math.acos,
		cos: Math.cos,
		asin: Math.asin,
		sin: Math.sin,
		tan: Math.tan,
		atan: Math.atan,
		atan2: Math.atan2,
		min: Math.min,
		max: Math.max,
		pow: Math.pow,
		sqrt: Math.sqrt,
		random: Math.random,

		// Array sorting
		ARR_NUMBERS_UP: function(a, b){
			return a - b;
		},
		ARR_NUMBERS_DOWN: function(a, b){
			return b - a;
		},

		// Pool functions
		alloc: function(C){
			if(!_pool[C].length)
				_pool[C] = [new C];

			return _pool[C].pop();
		},
		free: function(obj){
			var C = obj.constructor;
			_pool[C][_pool[C].length] = obj;
		}
	};

	// Private definitions
	var _pool = {};

	return OIMO;
})();
