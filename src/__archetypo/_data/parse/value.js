define(function (require, exports, module) {
	'use strict';


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
	var valueMatcher = /^(?:(.*?)\s*:\s*)?(.*)$/;
//	var valueMatcher = /^(?:(.*?):)?(.*?)\((.*?)\)$/;

	function parseValue(v) {
		var vMatch = v.match(valueMatcher);

		if (vMatch) {
		// [0] = matched string
		// [1] = method
		// [2] = value
			return {
				method: vMatch[1],
				value:  vMatch[2],
			}
		} else {
			return {};
		}
	}
});
