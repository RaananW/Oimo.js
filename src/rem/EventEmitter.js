/**
 * Class for object that emits events.
 * @author xprogram
 */
OIMO.EventEmitter = function(){
	this._eventListeners = {};
};
OIMO.EventEmitter.prototype = {
	constructor: OIMO.EventEmitter,

	on: function(nm, code){
		var f = this._eventListeners;

		if(!f.hasOwnProperty(nm))
			f[nm] = [];

		f[nm].push(code);
	},
	emit: function(nm){
		var f = this._eventListeners;
		var i, params = Array.prototype.splice.call(arguments, 0, 1);

		if(f.hasOwnProperty(nm)){
			i = f[nm].length;

			while(i--)
				f[nm][i].apply(this, params);
		}
	}
};

OIMO.EventEmitter.make = function(obj){
	obj.prototype.on = this.prototype.on;
	obj.prototype.emit = this.prototype.emit;
};
