define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash')

	/**
	 * ^arch      -> the prefix
	 * (?!Fn)     -> lookahead to see if 'Fn' comes
	 * ([A-Z].*?) -> match anything that starts with an Uppercase letter (NON-GREEDY)
	 * [A-Z].*    -> untinll another Uppercase letter appears, followed by whatever untill the end of the strng (GREEDY)

	 * Capture1: namespace
	 * Capture2: property
	 */
	var namespace = /^arch([A-Z].*?)?([A-Z].*$)/;

	/**
	 * Creates a Regular Expression to capture namespace.
	 *
	 *
	 */
	exports.namespaceRe = function namespaceRe(prefix) {
		return new RegExp('^' + prefix + '([A-Z].*)?(?:!Fn$)');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 *
	 *
	 */
	exports.lowercaseFirst = function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};


	function prefixRe(prefix) {
		return _.isString(prefix) ? new RegExp('^' + prefix) : prefix;
	}


	function pickRe(re, data) {
		return _.pick(data, function (v, k) {
			return re.test(k);
		});
	};

	function rmPrefix(prefix, str) {
		var re = prefixRe(prefix),
			unprefixed = str.replace(re, '');

		return exports.lowercaseFirst(unprefixed);
	};

	exports.pickPrefixed = function pickPrefixed(prefix, data) {
		var re = prefixRe(prefix);

		return _.transform(data, function (result, value, key) {

			// if the key has the prefix
			if (re.test(key)) {
				// remove the prefix
				key = rmPrefix(prefix, key);

				// and set value on results
				result[key] = value;
			}
		});

	};
});
