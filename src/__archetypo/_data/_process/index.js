define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q'),
		_q = require('_q');

	var processProperty = require('./property');

	// process the data of a given namespace.
	function processNamespaceData(nsSlug, nsData, options) {

		// set defaultProperties
		_.extend(nsData, options.defaultProperties);

		return _q.mapValues(nsData, function (value, property) {

			return processProperty(property, value, options);

		}, this);

	}


	/**
	 *
	 *
	 */
	module.exports = function processArchData(archData, options) {

		// returns promise for the fully processed archData
		return _q.mapValues(archData, function (nsData, nsSlug) {

			return processNamespaceData(nsSlug, nsData, options);

		}, this);

	};

});
