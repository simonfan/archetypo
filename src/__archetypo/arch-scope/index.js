//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define(function (require, exports, module) {
	'use strict';

	var $     = require('jquery'),
		scope = require('scope');

	var nonEnum = { enumerable: false };

	var archetypo = module.exports = scope.extend();

	// methods related to archetypo-creation
	archetypo.assignProto(require('./methods'), nonEnum);


	// define a jquery plugin fn
	$.prototype.archetypo = function jqArchetypo() {

		// check if archetypo is defined on this element
		var arch = this.data('archetypo');

		if (arch) {
			return arch;
		} else {
			return archetypo({ el: this });
		}
	};
});
