define(function (require, exports, module) {
	'use strict';

	///////////////////////////
	// loading and summoning //
	///////////////////////////
	var _    = require('lodash'),
		q    = require('q'),
		deep = require('deep');

	/**
	 * A more intelligent 'require'.
	 * Requires the module and returns the property required.
	 *
	 * @param  {[type]} modname  [description]
	 * @param  {[type]} property [description]
	 * @return {[type]}          [description]
	 */
	exports.load = function archLoad(modname, property) {


		var deferred = q.defer();

		if (!property) {
			// simple require
			require([modname], deferred.resolve);
		} else {
			// require property
			require([modname], function (mod) {
				// use deep getter.
				// and solve using the response.
				deferred.resolve(deep.get(mod, property));
			});
		}

		return deferred.promise;
	};

	/**
	 * Tries to find the method on the scope.
	 * If the method is available on the scope,
	 * invokes the method using this scope.
	 *
	 * If the method is not available,
	 * try to load it remotely and invoke after
	 * the module has been loaded.
	 *
	 * @method summon
	 * @param  {[type]} modname [description]
	 * @param  {[type]} args    [description]
	 * @return {[type]}         [description]
	 */
	exports.summon = function archSummon(modname /*, arg1, aarg2 */) {

		var args = Array.prototype.slice.call(arguments, 1);

		// if summoned with no arguments, pass the scope itself as the argument.
		args = (args && args.length > 0) ? args : [this];

		// [1] check if the

		return this.load(modname).done(_.bind(function (fn) {

			fn.apply(this, args);

		}, this));

	};

	// shorteners
	exports.l = exports.load;
	exports.s = exports.summon;


	////////////////////////
	// archetypo creation //
	////////////////////////
	var scope = require('scope');

	/**
	 * Override the original scope's create method.
	 * Replace it with an sub archetypo creating method.
	 *
	 * @method create
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	exports.create = function createSubArchetypo(data) {

		var subArchetypo = scope.prototype.create.call(this, data);

		subArchetypo.archInit();

		return subArchetypo;
	};
});
