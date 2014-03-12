/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');


	/**
	 * Finds sub views within a $parent
	 * and instantiates them.
	 *
	 * @method subViews
	 * @private
	 * @param app {app Object}
	 * @param $parent {jq Object}
	 */
	module.exports = function subViews(app, $parent) {

		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var $subs = $parent.find('[data-arch-view]');

		// [2]
		// Instantiate the sub-views.
		_.each($subs, _.bind(function subView(el) {

				// wrap el in jqObject
			var $el = $(el),
				// retrieve data
				data = $el.data(),
				// the arch-view constructor
				view = app.constructor('view', data.archView);

			// set el and app on the data object.
			data.el = $el;
			data.app = app;

			// instantiate the view.
			view(data);

		}, this));

	};
});
