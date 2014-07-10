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
	module.exports = function archData($el, options) {

		// read meta data.
		return $el.metaData({
			prefix : options.namespace,
			parse  : parseArchValue,
			replace: false
		});
	};

});
