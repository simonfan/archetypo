(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'archetypo',
		// dependencies for the test
		deps = [mod, 'should', 'jquery'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(archetypo, should, $) {
	'use strict';

	describe('archetypo basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (testdone) {

			archetypo($('#app'))
				.done(function (scope) {


				//	console.log($('#list-display').archetypo());
					testdone();
				});

		});
	});
});
