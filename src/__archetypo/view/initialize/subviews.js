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
		var $subs = this.$el.find('[data-arch-view], [data-view]');

		// [2]
		// Instantiate the sub-views
		_.each($subs, _.bind(function instantiateSubview(el) {

				// wrap el in jqObject
			var $el = $(el),
				// retrieve data
				data = $el.data();


			// retrieve the view names
			var vNames = data.archView || data.view;
			// split and remove empty values
			vNames = _.isString(vNames) ? vNames.split(/\s+/) : [];
			vNames = _.compact(vNames);

			// loop through each of the view names
			_.each(vNames, _.bind(function (vName, index) {

				if (!data['instantiated_' + vName]) {
					var view = app.builder('view', vName);

					// set el and app on the data object.
					var options = _.extend(data, {
						el: $el,
						ancestorView: this,
					});

					// instantiate the view.
					view(options);

					// set arch-instantiated to true
					$el.data('instantiated_' + vName, true);
				}

			}, this));
		}, this));

	};

});
