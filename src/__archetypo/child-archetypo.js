/**
 * Magic happens here.
 *
 * The scope chain is continued via the subArchetypo/create method.
 * It lets scopes be inherited.
 *
 *
 *
 */

define(function (require, exports, module) {
	'use strict';

	////////////////////////
	// archetypo creation //
	////////////////////////
	var scope = require('scope');


	/**
	 * THESE TWO METHODS WILL BE BOUND TO THE
	 * ARCHETYPO OBJECT ON INITIALIZATION.
	 */

	/**
	 * Override the original scope's create method.
	 * Replace it with an sub archetypo creating method.
	 *
	 * @method create
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	module.exports = function createChildArchetypo(data) {

/**
		console.log('createChildArchetypo');
		console.log(this)
		console.log('createChildArchetypo')

*/
		var arch = this.create(data);
		arch.archInit();

		return arch;
	};
});
