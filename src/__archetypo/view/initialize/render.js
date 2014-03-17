/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	module.exports = function render(options) {
		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.

		// [1.1] retrieve AND normalize the element object
		this.$el = _.isObject(options.$el) ? options.$el : options.el;

		var html = options.html || this.html;
		if (html) {
			// [1.2] place
			this.$el.html(html);
		}
	};

});
