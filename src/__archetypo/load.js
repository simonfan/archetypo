define(function (require, exports, module) {

	var _ = require('lodash'),
		q = require('q');


	/**
	 * The real loader.
	 *
	 * @method load
	 * @private
	 */
	function load(names, locations) {
		var defer = q.defer();

		// locations default to the names themselves.
		locations = locations || names;

		require(locations, function () {
			defer.resolve(_.zipObject(names, arguments));
		});

		return defer.promise;
	};



	/**
	 *
	 *
	 * @method load
	 * @param $el {jq Object}
	 * @param modules {Array}
	 */
	exports.modules = function modules($el, modules) {

		var data = $el.data();

		// filter valid names and locations
		var validNames = [],
			locations = [];

		_.each(modules, function (prop) {
			var location = data[prop];

			if (_.isString(location)) {
				validNames.push(prop);
				locations.push(location);
			}
		});

		return load(validNames, locations);
	};





	/**
	 * Converts a string into an array.
	 *
	 * @method tokenize
	 * @param str
	 */
	var whitespaces = /\s+/;
	function tokenize(str) {
		return _.isString(str) ? str.split(whitespaces) : [];
	};

	/**
	 * Loads the builders defined in $el.
	 *
	 * @method load.builders
	 *
	 */
	exports.builders = function loadBuilders($el) {
		// retrieve the builder names
		var builders = tokenize($el.data('builder'));

		return load(builders);
	};
});
