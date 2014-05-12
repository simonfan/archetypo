define(function (require, exports, module) {
	'use strict';

	var regexp = require('./regexp');

	/**
	 * Prepare the string to be evaluated by scope.evaluate(argString);
	 * For now, basically add brackets.
	 * Future modifications should be added here.
	 *
	 * @method  buildArgsString
	 * @private
	 * @param  {String} str [description]
	 * @return {String}     [description]
	 */
	function buildArgsString(str) {
		return '[' + str + ']';
	}

	// sample value string: "method(literal, $evaluated, {$arg3, key: $arg4})"
	exports.single = function parseArchValue(str) {
		// the response object
		var res = {};


		var match = str.match(regexp.invocationRegExp);


		if (match) {
		// [0] = full matched string
		// [1] = METHOD NAME
		// [2] = ARGUMENTS STRING
		// [3] = LITERAL VALUE


			if (match[1]) {

				// it is a value that must be evaluated
				// before assignment
				res.type = 'evaluated';
				res.method = match[1];
				res.value  = buildArgsString(match[2]);

			} else if (match[3]) {

				// it is a value that will be immediately available
				res.type = 'literal';
				res.value = match[3];

			}

		} else {
			// empty value
			res.type = 'empty';
		}

		return res;
	};


	// sample values string: "moduleA({ arg1: $arg1, $el }) moduleC moduleB($el, { title: Bananas No More })"
	var valuesSplitter = /()/
	/**
	 * Parses multiple invocations.
	 *
	 * @method multiple
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	exports.multiple = function parseArchValues(str) {
			// response
		var res = {},
			valuesRegExp = new RegExp(regexp.invocationsRegExpString, 'g'),
			match;

		while (match = valuesRegExp.exec(str)) {

		}

	};
});
