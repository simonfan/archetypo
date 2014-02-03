//     Archetypo
//     (c) simonfan
//     Archetypo is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Archetypo
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');


	var Archetypo = module.exports = function Archetypo() {

	};


	Archetypo.model = require('./__archetypo/model/index');
});
