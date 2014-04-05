/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	module.exports = function buildSub($el, options) {

		console.log('sub')

		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var subs = $el.find('[data-builder]');

		// [2]
		// Instantiate the sub-views
		var defers = _.map(subs, function (sub) {
			$(sub).archetypo(options);
		}, this);

		return q.all(defers);
	};

});
