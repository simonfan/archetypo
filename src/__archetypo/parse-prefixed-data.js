define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	module.exports = function parsePrefixedData($el, prefix) {

		// [0] make sure the prefix is a RegExp
		prefix = _.isString(prefix) ? new RegExp('^' + prefix) : prefix;

		// [1] get data from $el
		var data = $el.data(),
			// [2] create var for unprefixedData
			unprefixedData = {};

		// [3] loop through the data.
		_.each(data, function (value, key) {

			// if the key is a builder name,
			// AND the value is a valid module path,
			// add it.
			if (prefix.test(key)) {

				// remove prefix
				var unprefixedKey = key.replace(prefix, '');
				unprefixedKey = unprefixedKey.charAt(0).toLowerCase() + unprefixedKey.slice(1);

				// set value
				unprefixedData[unprefixedKey] = value;
			}
		});


		return unprefixedData;
	};

});
