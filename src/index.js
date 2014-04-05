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

	var _ = require('lodash'),
		$ = require('jquery');

	var buildEl = require('./__archetypo/build-el');

	$.prototype.archetypo = function archetypo(options) {
		return buildEl(this, options);
	};

	$.prototype.view = function view(name) {
		return this.data('views')[name];
	};

	$.prototype.subviews = function subviews(selector, name) {
		var $subs = this.find(selector);

		// return wrapped object
		return _($subs).map(function (sub) {
			return $(sub).view(name);
		});
	};

});
