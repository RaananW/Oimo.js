/**
 * A contact chain is a link between multiple contacts.
 * This will ensure more proper solving within stacks.
 * @author xprogram
 */
OIMO.ContactChain = function(){
	this.chain = {}; // A list of bodies
	this.contacts = {}; // A list of grouped bodies
};
OIMO.ContactChain.prototype = {
	constructor: OIMO.ContactChain,

	set: function(arr){
		var i = arr.length;

		while(i--)
			this.chain[arr[i].id] = arr[i];

		return this;
	}
};
