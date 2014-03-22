/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		dockableView = require('dockable-view');

	var registry = require('../registry/index');

	// view initialization steps
	var render = require('./initialize/render'),
		register = require('./initialize/register'),
		subviews = require('./initialize/subviews');

	/**
	 * The view builder. It is basically a Backbone.View
	 *
	 * @class view
	 * @constructor
	 * @param options {Object}
	 */
	var archView = module.exports = dockableView.extend(function archView(options) {

		arguments[0] = options || {};

		var args = Array.prototype.slice.call(arguments);


		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.
		// render is ASYNC
		this.render(options)
			.then(_.bind(function () {

				// [2] Invoke dockable-view.
				//     MUST come afte render.
				dockableView.prototype.initialize.apply(this, args);

				// [3] Start subviews
				subviews.apply(this, args);

			}, this));


		// [4] Register view (synchornously)
		register.apply(this, args);
	});

	archView.proto({

		/**
		 * Renders the view and returns promise.
		 *
		 * @method render
		 *
		 */
		render: render,


		/**
		 * Selects the view objcets that descend from this view.
		 *
		 * @methos selectViews
		 * @param selector {Object|[String]}
		 */
		views: function selectViews(selector) {
			if (_.isString(selector)) {
				// single, by id
				return this.registry.descendantItems({ id: selector }).take(1).toArray()[0];
			} else {
				// multiple
				return this.registry.descendantItems(selector);
			}
		},
	});
});
