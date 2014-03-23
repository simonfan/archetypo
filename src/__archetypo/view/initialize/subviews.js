/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	module.exports = function render(options) {

		var app = options.app;

		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var $subs = this.$el.find('[data-builder]');

		// [2]
		// Instantiate the sub-views
		_.each($subs, _.bind(function instantiateSubview(el) {

				// wrap el in jqObject
			var $el = $(el),
				// retrieve data
				data = $el.data();


			// retrieve the view names
			var builderNames = data.builder;
			// split and remove empty values
			builderNames = _.isString(builderNames) ? builderNames.split(/\s+/) : [];
			builderNames = _.compact(builderNames);

			// loop through each of the view names
			_.each(builderNames, _.bind(function (builderName, index) {

				if (!data['instantiated_' + builderName]) {
					var view = app.builder(builderName);

					// set el and app on the data object.
					var options = _.extend(data, {
						el: $el,
						ancestorView: this,
						app: app,
					});

					// instantiate the view.
					view(options);

					// set arch-instantiated to true
					$el.data('instantiated_' + builderName, true);
				}

			}, this));
		}, this));

	};

});
