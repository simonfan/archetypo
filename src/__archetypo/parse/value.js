define(function (require, exports, module) {
	'use strict';

	// sample value string: "1! method(literal/path/to/somewhere, $argumentToBeScopeEvaluated)"
	var whitespace = '\\s*',
		priority   = '(?:(\\d*)!)?',
		word       = '([\\w$.\\-]*)',
		argString  = ':' + whitespace + '(.*)' + whitespace,
		whatever   = '(.*)';



	// sample invocation: "method: literalArg, $evaluatedArg, { $another, $evaluated }"

	var invocationRegExpString = [
			// any starting whitespaces (not captured)
			'^', whitespace,
			// the optional priority tag
			priority, whitespace,
			// either
			'(?:',
				// method(argString)
				word, whitespace,
				argString,
				'|',
				// anything but invocation
				'(.*?)',
			')',
			// any trailing whitespaces (not captured)
			whitespace, '$'
		].join(''),
		// /^\s*(?:(?:(\d*)!)?\s*([\w$.\-]*)\s*:\s*(.*)\s*|(?:(\d*)!)?(.*?))\s*$/
		invocationRegExp = new RegExp(invocationRegExpString);

//	console.log(invocationRegExp)

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

	/**
	 * Parses the match returned object (an array)
	 * and returns better structured data.
	 *
	 * @method  parseArgsStringMatch
	 * @param  {[type]} match [description]
	 * @return {[type]}       [description]
	 */
	function parseArgsStringMatch(match) {
		// the response object
		var res = {};

		if (match) {
		// [0] = full matched string
		// [1] = PRIORITY TAG
		// [2] = METHOD NAME
		// [3] = ARGUMENTS STRING
		// [4] = LITERAL VALUE


			if (match[2]) {

				// it is a value that must be invocation
				// before assignment
				res.type     = 'invocation';
				res.priority = (match[1] === '') ? '0' : match[1];
				res.method   = match[2];
				res.value    = buildArgsString(match[3]);

			} else if (match[4]) {

				// it is a value that will be immediately available
				res.type     = 'value';
				res.priority = match[1]
				res.value    = match[4];

			}

		} else {
			// empty value
			res.type = 'empty';
		}

		return res;
	}


	// sample value string: "[$priorityNo!] method(literal, $evaluated, {$arg3, key: $arg4})"
	module.exports = function parseArchValue(archValue) {

		if (_.isString(archValue)) {
			// parse it.
			var invocationMatch = archValue.match(invocationRegExp);

			return parseArgsStringMatch(invocationMatch);
		} else {


			console.log(archValue)

			// literal (probably boolean)
			return {
				type : 'value',
				value: archValue,
			};
		}
	};
});
