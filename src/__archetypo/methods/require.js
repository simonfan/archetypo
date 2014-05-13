define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	function archRequire(modname) {

		var deferred = q.defer();

		require([modname], deferred.resolve);

		return deferred.promise;
	}

	function archRequireFn(modname, args) {

		return this.require(modname).then(_.bind(function (fn) {
			return this.partial(fn, args);

		}, this));

	}

	exports.require = archRequire;
	exports.requireFn = archRequireFn;
});
