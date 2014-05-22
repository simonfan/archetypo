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

	describe.skip('archetypo scope', function () {

		it('is fine (:', function (done) {

			var app = archetypo({
				el: $('#root')
			});

			app.done(function () {
				done();
			});
		});
	});
});
