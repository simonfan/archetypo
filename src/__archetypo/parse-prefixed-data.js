define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	module.exports = function parsePrefixedData($el, prefix) {

		// [0] create the regexp
		var prefixRegExp = new RegExp('^' + prefix);

		// [1] get data from $el
		var data = $el.data(),
			// [2] create var for unprefixedData
			unprefixedData = {};

		// [3] loop through the data.
		_.each(data, function (value, key) {

			// if the key is a builder name,
			// AND the value is a valid module path,
			// add it.
			if (value && prefixRegExp.test(key)) {

				// remove prefix
				var unprefixedKey = key.replace(prefix, '');
				unprefixedKey = unprefixedKey.charAt(0).toLowerCase() + unprefixedKey.slice(1);

				// make sure unprefixedKey is not an empty string
				unprefixedKey = unprefixedKey ? unprefixedKey : 'main';

				// set value
				unprefixedData[unprefixedKey] = value;
			}
		});


		return unprefixedData;
	};

});
