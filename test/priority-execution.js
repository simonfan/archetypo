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

	describe.skip('archetypo priority-execution', function () {
		beforeEach(function (done) {
			done();
		});

		it('runs methods prefixed with "!" before other methods.', function (done) {

			var arch = archetypo({
				el: $('#priority')
			});


			arch.done(function () {
				done()
			});

		});
	});
});
