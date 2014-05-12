define(function (require, exports, module) {
	'use strict';

	// sample value string: "method(literal/path/to/somewhere, $argumentToBeScopeEvaluated)"
	var whitespace = '\\s*',
		method     = '([\\w$\\-]*)',
		argString  = '\\(' + whitespace + '(.*)' + whitespace + '\\)',
		whatever   = '(.*)';

	var invocationRegExpString = '(?:' + method + whitespace + argString + '|' + whatever + ')',
		invocationRegExp       = new RegExp(invocationRegExpString);

	exports.invocationRegExpString = invocationRegExpString;
	exports.invocationRegExp       = invocationRegExp;
});
