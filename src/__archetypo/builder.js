define(function (require, exports, module) {

	var q = require('q');

	/**
	 * Either defines or retrieves a builder function.
	 *
	 * @method builder
	 * @param type {String}
	 * @param name {String}
	 * @param [extensions] {Object}
	 */
	exports.builder = function defineOrGetBuilder(name, builder) {

		if (arguments.length === 1) {

			return this.getBuilder(name);

		} else if (arguments.length === 2) {

			return this.defineBuilder(name, builder);

		}
	};

	exports.defineBuilder = function defineBuilder(name, builder) {
		// define a builder
		this.builders[name] = builder;

		// return
		return this;
	};

	exports.getBuilder = function getBuilder(name) {

		var defer = q.defer();

		// retrieve a builder.
		var builder = this.builders[name];

		if (builder) {
			// resolve immediately
			defer.resolve(builder);
		} else {
			// require, then resolve
			require([name], function (builder) {
				console.log(builder);

				defer.resolve(builder);
			});
		}

		return defer.promise;
	};


})
