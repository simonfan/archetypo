(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'archetypo',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(archetypo, should) {
	'use strict';

	describe('archetypo error-handling', function () {

		it('reuqirejs not-found', function (testdone) {

			var $notFound = $('#not-found');

			var notFoundArchetypo = archetypo.extend({
				error: function (err) {

					console.log(err)

					testdone();

				}
			})

			var arch = notFoundArchetypo({ el: $notFound });

		});
	});
});
