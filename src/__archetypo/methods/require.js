define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	exports.require = function archRequire(modname) {

		var deferred = q.defer();

		require([modname], deferred.resolve);

		return deferred.promise;
	};

	/**
	 * Requires a module and invokes it.
	 * @method summon
	 * @param  {[type]} modname [description]
	 * @param  {[type]} args    [description]
	 * @return {[type]}         [description]
	 */
	exports.summon = function archSummon(modname /*, arg1, aarg2 */) {

		var args = Array.prototype.slice.call(arguments, 1);

		// if summoned with no arguments, pass the scope itself as the argument.
		args = (args && args.length > 0) ? args : [this];

		return this.require(modname).then(_.bind(function (fn) {

			fn.apply(this, args);

		}, this));

	};



	exports.load = function archLoad(modname, path) {

	};

	exports.r = exports.require;
	exports.l = exports.load;
	exports.s = exports.summon;
});
