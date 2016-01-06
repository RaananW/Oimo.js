var OIMO = (function(){
	var OIMO = OIMO || {
		REVISION: 1,
		EPSILON: 0.0001,
		AABB_PROX: 0.05, // Error margin for AABB
		ERR_INHERITANCE: "Inheritance error.",
		errorBox: null,

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
		mix: function(v1, v2, v3){
			return v1.dot(v2.cross(v3));
		},

		// Array sorting
		ARR_NUMBERS_UP: function(a, b){
			return a - b;
		},
		ARR_NUMBERS_DOWN: function(a, b){
			return b - a;
		},

		// Array methods
		arem: function(arr, o){
			var i = arr.length;
		
			while(i--){
				if(arr[i] === o){
					arr[i] = arr.pop();
					return i;
				}
			}

			return -1;
		},
		atake: function(arr, i){
			var r = arr[i];
			arr[i] = arr.pop();
			return r;
		},

		// Extra utils
		err: function(obj, msg){
			var message = "[OIMO] " + obj + ": " + msg;

			if(OIMO.errorBox)
				OIMO.errorBox.innerHTML += message;
			else if(console && console.toString() === "[object Console]")
				console.error(message);
		},
		id: (function(){
			var _id = 0;
			return function(){
				return _id++;
			};
		})()
	};

	return OIMO;
})();
