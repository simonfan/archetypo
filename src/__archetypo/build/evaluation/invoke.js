define(function (require, exports, module) {
	'use strict';

	var q    = require('q'),
		deep = require('deep');

	var aux = require('../../auxiliary');




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
	function retrieveMethodFn(scope, methodName) {

		var methodFn = scope.evaluate('$' + aux.camelCase(methodName));

		if (_.isFunction(methodFn)) {
			// return a immetiately resolved
			// promise
			return q(methodFn);
		} else {
			// return the promise for the loaded module
			return scope.load(methodName);
		}
	}


	/**
	 *
	 * Invokes a single method
	 *
	 * @method invoke
	 * @private
	 * @param invocation {Object} { value: v, method: m }
	 * @param prop {String}
	 */
	module.exports = function invoke(scope, invocation, prop) {

		// with evaluation
		// [2.1] execute evaluation

		// [2.2] retrieve the function to be invoked by evaluation
		//       (instead of by object property lookup as scope.invoke does by default)
		//       That is done in order to be capable of getting deep methods. (scope.property.method)

		return retrieveMethodFn(scope, invocation.method).then(function (methodFn) {


			var args = scope.evaluate(invocation.value),
				// invoke
				res  = methodFn.apply(scope, args);

			return q.isPromise(res) ? res : q(res);
		});
	}
});
