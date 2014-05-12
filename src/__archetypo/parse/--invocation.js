define(function (require, exports, module) {
	'use strict';

	var parseArchArguments = require('./arguments');


	/**
	 * ^        -> string start
	 * (?:      -> start non-capturing group (#processor:)
	 *  (        -> start first capturing group (#processor)
	 *   .*?      -> anything (.) any number of times (*) non greedily (?)
	 *  )        -> close first capturing group (#processor)
	 *  \s*:\s* -> ':', the 'processor' divider, prefixed or suffixed by any number of whitespaces (\s*)
	 * )        -> close non-capturing group (#/processor:)
	 * ?        -> make non-capturing group (#processor:) optional
	 * (        -> start second capturing group (#value)
	 *  .*$      -> anything (.) any number of times (*) greedily until the end of the string ($)
	 * )        -> close second capturing group (/#value)
	 */
//	var invocationMatcher = /^(?:(.*?)\s*:\s*)?(.*)$/;
	var invocationMatcher = /(.*?)\((.*?)\)/;


	// sample invocation string: "method(literal, $evaluated, {$arg3, key: $arg4})"
	module.exports = function parseArchInvocation(str) {
		var match = str.match(invocationMatcher);

		if (match) {
		// [0] = full matched string
		// [1] = methodName
		// [2] = argumentsString
			return {
				method: match[1],
				args:   parseArchArguments(match[2]),
			};

		} else {
			return {};
		}
	}
});
