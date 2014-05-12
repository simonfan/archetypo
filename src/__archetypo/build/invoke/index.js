define(function (require, exports, module) {
	'use strict';

	var q  = require('q');


	var parseArchValue = require('../../parse/value');

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
	var invocationsRegExp = new RegExp(regexp.invocationsRegExpString, 'g');

	module.exports = function archInvoke() {
		var deferred = q.defer();

		var invocationsString = this.el.data('archetypo'),
			// parse out the invocations
			invocations = parseArchValue.multiple(invocationsString);


		return deferred;
	};
});
