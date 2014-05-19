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
	 * Requires the module and partializes
	 * the function with arguments passed as the second invocation arg.
	 * USAGE:
	 * data-some-fn="require-and-partialize(module/path, [literal, $ev, { $ev }])"
	 * data-another-fn="require-and-partialize(module/path, {$arg})"
	 *
	 * @method requireAndPartialize
	 * @param  {[type]} modname [description]
	 * @param  {[type]} args    [description]
	 * @return {[type]}         [description]
	 */
	exports.requireAndPartialize = function archRequireAndPartialize(modname, args) {
		return this.require(modname).then(_.bind(function (fn) {
			return this.partial(fn, args);

		}, this));

	};

	exports.requireAndInvoke = function archRequireAndInvoke(modname, args) {
		return this.require(modname).then(_.bind(function (fn) {

			// invoke with null partialized arguments.

			return this.invoke(fn, [], args);

		}, this));

	};
});
