define(function (require, exports, module) {
	'use strict';

	var _          = require('lodash'),
		jqMetaData = require('jquery-meta-data');

	var parseArchValue = require('../parse/value');

	/**
	 * Reads arch data from the element.
	 * Uses jquery-meta-data plugin.
	 *
	 * @method archData
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	exports.archData = function archData() {

		var args = _.toArray(arguments);

		var options = args.shift() || {};

		_.defaults(options, this.archDataOptions);

		args.unshift(options);

		return this.el.metaData.apply(this.el, args);
	};

	/**
	 * The default options to be passed to jquery meta data.
	 * Override this if you wish to modify the data reading/parsing.
	 *
	 * @property archDataOptions
	 * @type {Object}
	 */
	exports.archDataOptions = {
		prefix : 'arch',
		parse  : parseArchValue,
		replace: false,
	};
});
