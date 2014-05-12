define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q'),
		_q = require('_q');

	/**
	 * Builds the Fn of a given namespace.
	 *
	 *
	 */
	function invokeFn(nsData, nsSlug) {
		// 'this' = archetypo object

		console.log('invokeFn');
		console.log(nsData);

		// [0] buildDefer
		var invokeFnDeferred = q.defer();


		// [2.1] get Fn
		var fn = nsData.fn;

		if (!_.isFunction(fn)) {
			throw new Error('There is no function(fn) for ' + nsSlug + ' namespace.');
		}

		// [2.2] build options (just remove the fn from processed)
		var options = _.create(nsData);
		options.fn = void(0);

		// [2.3] invoke fn
		// args: [options]
		//  ctx: this.el
		var invocation = fn.call(this.el, options);

		// [2.4] check if the invocation returned a promise.
		if (q.isPromise(invocation)) {
			// [2.5] if so, resolve the buildDefer when that promise is done
			invocation.done(invokeFnDeferred.resolve);
		} else {
			// [2.6] otherwise, resolve the buildDefer immediately with the invocation itself.
			invokeFnDeferred.resolve(invocation);
		}


		// [3] return the promise
		return invokeFnDeferred.promise;
	};


	/**
	 * Build-step
	 * BUILD STEPS TAKE NO ARGUMENTS.
	 * They should be understood as partial steps running within the main builder's context.
	 * Builds the Fns of ALL the namespaces found on this archetypo object
	 *
	 */
	module.exports = function invokeAllFns() {
		// 'this' = archetypo object




		console.log('invokeAllFns invoked');

		// [0] buildDefer
		var invokeAllFnsDeferred = q.defer();

		console.log('!!!')
		console.log(this.scope.namespaces);

		var invocations = _q.mapValues(this.scope.namespaces, _.bind(invokeFn, this));


		invocations.done(_.bind(function (results) {

			// [3.1] save the fnResults to 'this.fns';
			this.fns = results;

			// [3.2] resolve the invokeAllFnsDeferred
			//       with undefined value.
			invokeAllFnsDeferred.resolve();
		}, this));

		// [4] return buildDefer promise
		return invokeAllFnsDeferred.promise;
	};

});
