(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'archetypo',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'text!/test/sub-archetypo/collection.html'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(archetypo, should, $, collectionHTML) {
	'use strict';

	describe('archetypo sub-archetypo', function () {
		beforeEach(function () {

			var $collection = this.$collection = $(collectionHTML).appendTo($('body'));

		});

		it('is fine (:', function (testdone) {

			// instantiate the archetypo right on the collection html

			var arch = archetypo({
				el      : this.$collection,

				// pass the testdone as an option
				testdone: testdone,
			});
		});
	});
});
