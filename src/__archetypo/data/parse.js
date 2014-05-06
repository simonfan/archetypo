define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

/*

{
	archFn: 'path-to-main-function',
	archOpDock: 'require:path-to-main-dock',
	archOpId: 'some-id',

	archInteractionFn: 'path-to-interaction-view',
	archInteractionOpDock: 'require:path-to-interaction-dock',


	archCssFn: 'path-to-css-view',
	archCssOpDock: 'require:path-to-css-dock',
}


*/

	/**
	 * ^arch      -> prefix
	 * (          -> start first capturing group (#namespace)
	 *  [A-Z]      -> any Uppercase letter
	 *  .*?        -> followed by any character (.) any number of times (*) non greedily (?)
	 * )          -> close first capturing group (/#namespace)
	 * ?          -> let the first capturing group be optional
	 * (          -> start the second capturing group (#property)
	 *  [A-Z]      -> any Uppercase letter
	 *  .*$        -> followed by anything any number of times until the end of the string
	 * )          -> close the second capturing group (#property)

	 * first-capturing-group:  namespace
	 * second-capturing-group: property
	 */
// deprecated:	var keyParserRegExp = /^arch([A-Z].*?)?([A-Z].*$)/;

	var keyParserRegExp = /^archSomeFn([A-Z].*$)/;

	/**
	 * Creates a Regular Expression to capture property name.
	 *
	 *
	 */
	function buildKeyParser(prefix) {
		return new RegExp('^' + prefix + '([A-Z].*$)');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 */
	function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	/**
	 * Returns the string with the first letter to uppercase.
	 */
	function uppercaseFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}



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
	var valueParserRegExp = /^(?:(.*?)\s*:\s*)?(.*)$/;
//	var valueParserRegExp = /^(?:(.*?):)?(.*?)\((.*?)\)$/;
	function parseValue(value) {
		var res = value.match(valueParserRegExp);

		return {
			processor: res[1],
			value:     res[2]
		};
	}


	/**
	 *
	 * Removes the prefix from a given set of data.
	 *
	 *
	 */
	function parsePrefixedData(prefix, data) {

		// [1] build keyParser RegExp
		var keyParser = buildKeyParser(prefix);

		// [2] loop through data properties
		return _.transform(data, function (results, value, key) {

			// [2.1] parse the key
			var parsedKey = key.match(keyParser);
			// [2.2] if key matches the parser, it means it has archData
			if (parsedKey) {

				// [3] parsedKey is an array contanining
				//  0: the full key string
				//  1: the unprefixedKey name (may not be undefined)
				//
				// set results accordingly

				// [4] get unprefixedKey
				var unprefixedKey = lowercaseFirst(parsedKey[1]);

				// [5] set
				results[unprefixedKey] = parseValue(value);

			} // else it is a common data attribute, so ignore

		});
	}



	// parses the fns
//	var fnKeyParser = /^arch([A-Z].*?)Fn$/;
	function parseNamespaces(prefix, data) {

		var fnKeyParser = new RegExp('^' + prefix + '([A-Z].*?)?Fn$');

		var results = [];

		_.each(data, function (value, key) {
			var parsedKey = key.match(fnKeyParser);

			if (parsedKey) {

				// make sure namespace is a string.
				// it defaults to '', the local namespace
				var namespace = parsedKey[1] || '';

				results.push(lowercaseFirst(namespace));
			}
		});

		return results;
	}


	/**
	 *
	 *
	 * RETURNS:
	 * {
	 *     namespace: {
	 *         evaluator: {
	 *             prop: 'v',
	 *             prop1: 'v1'
	 *         }
	 *     },
	 *     namespace1: {
	 *         evaluator: {
	 *             property: 'value',
	 *             prop2:    'value',
	 *         },
	 *         evaluator1: {
	 *             prop1: 'v1',
	 *             prop2: 'v2'
	 *         }
	 *     }
	 * }
	 *
	 *	{
	 *		$namespace: {
				$property: {
					evaluator: $evaluatorNamr,
					value:     $value
				}
			}
		}
	 */
	/**
	 * options: {
	 *     prefix: 'arch'	// global prefix
	 *     namespaces: ['someNamespace', 'anotherNamespace']
	 * }
	 *
	 */
	module.exports = function parseArchData(data, options) {
		console.log('parseArchData');
		console.log(options.namespaces);


		var archPrefix = options.prefix;

		// [1] parse out the namespaces available
		var namespaces = parseNamespaces(archPrefix, data);


		// [2] join the namespaces with those passed in at options
		namespaces = _.union(namespaces, options.namespaces);



		// [3] build results
		var results = {};
		_.each(namespaces, function (namespace) {

			// [3.1] build the prefix
			var namespacePrefix = archPrefix + uppercaseFirst(namespace);

			// [3.2] get the data available for the namespace
			var namespaceData = parsePrefixedData(namespacePrefix, data);

			// [3.3] ignore data that has no contents.
			if (_.size(namespaceData) > 0) {
				results[namespace] = namespaceData;
			}
		});


		return results;
	};

	// make parseNamespaces available.
	exports.namespaces = parseNamespaces;

	// make parseValue available
	exports.value = parseValue;
});
