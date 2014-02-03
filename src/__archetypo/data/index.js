/**
 * @module archetypo
 * @submodule data
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var model = require('./model/index'),
		collection = require('./collection/index');

	var data = module.exports = function data(d) {

		if (_.isArray(d)) {
			return model.apply(this, arguments);
		} else if (_.isObject(d)) {
			return collection.apply(this, arguments);
		}
	};

	data.model = model;
	data.collection = collection;

	/**
	 * Proxy to the real extend methods.
	 * 
	 * @method extend
	 * @param what {String}
	 */
	data.extend = function extend(what) {

		var base = this[what],
			args = Array.prototype.slice.call(arguments);

		args.shift();

		return base.extend.apply(base, args);
	};
});
