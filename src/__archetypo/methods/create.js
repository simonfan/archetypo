define(function (require, exports, module) {
	'use strict';

	////////////////////////
	// archetypo creation //
	////////////////////////
	var scope = require('scope');

	/**
	 * Override the original scope's create method.
	 * Replace it with an sub archetypo creating method.
	 *
	 * @method create
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	exports.create = function createSubArchetypo(data) {

		var arch = scope.prototype.create.call(this, data);
		arch.archInit();
		return arch;
	};
});
