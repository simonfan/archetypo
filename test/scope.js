(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'archetypo',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'text!/test/scope/app.html'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(archetypo, should, $, appHtml) {
	'use strict';

	describe('archetypo scope', function () {
		beforeEach(function (done) {

			this.$app = $(appHtml).appendTo($('body'));

			done();
		});

		it('is fine (:', function (done) {

			var app = archetypo({
				el: this.$app
			});

			app.done(function () {
				console.log('app done');

					done();
			});
		});
	});
});
