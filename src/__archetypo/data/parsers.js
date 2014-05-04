define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');


	var helpers = require('./helpers');


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


	// either *Fn
	// or exactly 'fn'
	var archNamespaceRe = /arch([A-Z].*)?(?:Fn|Scope)$/,
		archFnRe    = /arch(.*)(?:Fn$)/,
		archScopeRe = /(Scope$|^scope$)/;



	exports.namespaces = function archNamespaces(prefix, data) {

		var namespaces = [],
			// build the regular expression
			namespaceRe = helpers.namespaceRe(prefix);

		_.each(data, function (value, key) {

			var nsMatch = namespaceRe.exec(key);

			if (nsMatch) {

				// if the namespace is 'undefined' or an empty string,
				// default it to 'main'
				var namespace = nsMatch[1] || '';

				// put it in the array
				namespaces.push(namespace);
			}

		});

		return namespaces;
	};

	// returns the arch functions
	exports.fns = function archFns(data) {

		var fns = {};

		return _.each(data, function (value, key) {
			if (archFnRe.test(key)) {
				// if the key has the Arch function format

					// remove the function portion
					// to get the name of the scopr
				var namespace = key.replace(archFnRe, '');

				// namespace
				namespace = namespace ? namespace : 'main';

				fns[namespace] = value;

			}
		});

	};


	exports.args = function archArgs(namespace, data) {

		data = exports.pickPrefixed(namespace, data)

	};
});
