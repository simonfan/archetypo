/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	module.exports = function render() {

		var app = this.app();

		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var $subs = this.$el.find('[data-arch-view]');

		// [2]
		// Instantiate the sub-views.
		_.each($subs, _.bind(function instantiateSubview(el) {

				// wrap el in jqObject
			var $el = $(el),
				// retrieve data
				data = $el.data(),
				// the arch-view constructor
				view = app.constructor('view', data.archView);

			// set el and app on the data object.
			var options = _.extend(data, {
				el: $el,
				ancestorView: this,
			});

			// instantiate the view.
			view(options);

		}, this));

	};

});
