/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		dockableView = require('dockable-view');

	var subViews = require('./sub-views');

	/**
	 * The view builder. It is basically a Backbone.View
	 *
	 * @class view
	 * @constructor
	 * @param options {Object}
	 */
	var archView = module.exports = dockableView.extend(function archView(options) {

		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.

		// [1.1] retrieve AND normalize the element object
		this.$el = _.isObject(options.$el) ? options.$el : _.isObject(options.el) ? options.el : $('<div></div>');

		var html = options.html || this.html;
		if (html) {
			// [1.2] place
			this.$el.html(html);
		}

		// [2] Find and instantiate sub-views.
		var app = options.app || this.app;
		subViews(app, this.$el);

		// [3] Save view on app.
		var id = this.$el.data('arch-id') || this.$el.prop('id') || this.cid;
		app.view(id, this);

		// [4] Invoke dockable-view.
		dockableView.prototype.initialize.apply(this, arguments);
	});
});
