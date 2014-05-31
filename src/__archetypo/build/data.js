define(function (require, exports, module) {
	'use strict';

	var _          = require('lodash'),
		jqMetaData = require('jquery-meta-data');

	var parseArchValue = require('../parse/value');



	/**
	 * The default options to be passed to jquery meta data.
	 * Override this if you wish to modify the data reading/parsing.
	 *
	 * @property archDataOptions
	 * @type {Object}
	 */
	var archDataOptions = {
		prefix : 'arch',
		parse  : parseArchValue,
		replace: false,
	};

	/**
	 * Reads arch data from the element.
	 * Uses jquery-meta-data plugin.
	 *
	 * @method archData
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	module.exports = function archData($el, options) {
		_.defaults(options, archDataOptions);

		// read meta data.
		return $el.metaData(options);
	};

});
