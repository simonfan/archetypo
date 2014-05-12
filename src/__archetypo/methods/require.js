define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	function archRequire(modname) {

		var deferred = q.defer();

		require([modname], deferred.resolve);

		return deferred.promise;
	};

	function archRequireFn(modnameAndArgs, done) {

		// [1] parse mod name out


	};

	exports.require = archRequire;
	exports.requireFn = archRequireFn;
});
