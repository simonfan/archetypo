define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * \s*      -> any (*) number of whitespace characters
	 * (?:      -> start non-capturing group of options
	 *  (        -> start KEY&VALUE-REFERENCE capturing group
	 *   [^:]+?   -> match anything but colon ([^:]) at least once (+) non-greedy (?)
	 *  )        -> close KEY&VALUE-REFERENCE capturing group
	 *  |        -> or
	 *  (?:      -> start KEY-ONLY & VALUE-REFERENCE-ONLY non-capturing group
	 *   (        -> start KEY-ONLY capturing group
	 *    [^:]+?   -> match anything but colon ([^:]) at least once (+) non-greedy (?)
	 *   )        -> close KEY-ONLY capturing group
	 *   :        -> match the colon (KEY:VALUE separator)
	 *   (        -> start VALUE-REFERENCE capturing group
	 *    .+?      -> match anything (.) at least once (+) non-greedy (?)
	 *   )        -> close VALUE-REFERENCE capturing group
	 *  )        -> close KEY-ONLY & VALUE-REFERENCE-ONLY non-capturing group
	 * )        -> close non-capturing group of options
	 * \s*      -> match any number (*) of whitespace characters (\s)
	 * (?:,|$)  -> until the comma or end of string
	 */
	var keyMatcher = /\s*(?:([^:]+?)|(?:([^:]+):(.+?)))\s*(?:,|$)/g;
	function parseObjectArg(str) {

		var res = {},
			keyMatch;

		while (keyMatch = keyMatcher.exec(str)) {

			// [0] full matched string
			// [1] captured KEY & VALUE-REFERENCE
			// [2] captured KEY-ONLY
			// [3] captured VALUE-REFERENCE-ONLY

			if (keyMatch[1]) {
				res[keyMatch[1]] = keyMatch[1];

			} else if (keyMatch[2]) {
				res[keyMatch[2]] = keyMatch[3];
			}

		}

		return res;

	}


	/**
	 * \s*            -> any number of whitespaces
	 *  (?:            -> start non-capturing group
	 *   (              -> start capturing group for PLAIN argument
	 *    [A-Za-z$_]     -> match alphabet and $_ characters
	 *    .*?            -> followed by whatever any number of times non-greedy
	 *   )              -> close capturing group for PLAIN argument
	 *   |              -> OR
	 *   \{             -> match "{"
	 *   \s*            -> followed by any number of whitespace characters
	 *   (              -> start capturing group for OBJECT argument
	 *    .*?            -> match anything any number of times non-greedy
	 *   )              -> close capturing group for OBJECT argument
	 *   \s*            -> followed by any number of whitespace characters
	 *   \}             -> match "}"
	 *  )              -> close non-capturing group
	 *  \s*            -> followed by any number of whitespace characters
	 *  (?:,|$)        -> until a comma or the end of the string.
	 */
	var argMatcher = /\s*(?:([A-Za-z$_].*?)|\{\s*(.*?)\s*\})\s*(?:,|$)/g;
	module.exports = function parseArguments(str) {
		// results
		var res = [],
			argMatch;

		while (argMatch = argMatcher.exec(str)) {

			// [0] the matched string
			// [1] captured PLAIN arg
			// [2] captured OBJECT arg

			if (argMatch[1]) {
				// PLAIN
		//		console.log('PLAIN: ' + argMatch[1]);

				res.push(argMatch[1]);

			} else if (argMatch[2]) {
				// OBJECT
		//		console.log('OBJECT: ' + argMatch[2]);

				res.push(parseObjectArg(argMatch[2]));
			}
		}

		return res;
	};
});
