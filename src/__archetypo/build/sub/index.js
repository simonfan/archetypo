define(function (require, exports, module) {
	'use strict';

	var q  = require('q');

	/**
	 * Invokes a single method.
	 *
	 *
	 */
	function invokeSingle(data) {

	}

	// invocation string example: "method method2 method3"

	/**
	 * Checks out what is to be invoked on current archetypo object,
	 * runs invocations and returns promise for whenever the thing is ready.
	 *
	 * @method archInvoke
	 * @private
	 * @param data {Object} {key: { value: v, method: m }}
	 */
	module.exports = function archInvoke() {
		var deferred = q.defer();


		var invocations = this.el.data('archetypo');

		return deferred;
	};
});
