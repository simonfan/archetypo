define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	exports.require = function archRequire(modname) {

		var deferred = q.defer();

		require([modname], deferred.resolve);

		return deferred.promise;
	};

	exports.summon = function archSummon(modname, args) {

		// if summoned with no arguments, pass the scope itself as the argument.
		args = (args && args.length > 0) ? args : [this];

		return this.require(modname).then(_.bind(function (fn) {

			// invoke with empty partialized arguments.
			return this.invoke(fn, [], args);

		}, this));

	};
});
