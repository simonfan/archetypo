/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Does all the dirty stuff.
	 *
	 * @method _render
	 * @private
	 *
	 */
	function _render(options) {

		// create a deferred object
		var defer = q.defer();

		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.

		// [1.1] retrieve AND normalize the element object
		this.$el = _.isObject(options.$el) ? options.$el : options.el;

		var data = this.$el.data();

		// [2] retrieve html
		if (data.html) {
			// async resolution

			// if a html data property is set on
			// the html element,
			// assume it is a module name.
			require(['text!' + data.html], _.bind(function (html) {

				this.$el.html(html);

			}, this));

		} else {

			// immediate resolution
			var html = options.html || this.html;

			if (html) {
				this.$el.html(html);

				defer.resolve();
			}
		}

		// return promise no matter what.
		return defer.promise;
	};



	/**
	 * Verifies for cached render call.
	 *
	 * @method render
	 * @param options
	 */
	module.exports = function render(options) {

		if (!this.renderPromise) {
			// render was not called yet,
			// so call it, set the promise and return

			this.renderPromise = _render.apply(this, arguments);
		}

		// always return the promise.
		return this.renderPromise;
	}

});
