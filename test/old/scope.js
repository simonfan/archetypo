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

	describe('archetypo scope', function () {

		it('is fine (:', function (testdone) {

			var app = archetypo({
				el: $('#scope')
			});

			app.ready(function () {

				var root = $('#scope').data('archetypo');

				root.v1.should.eql('root-v1');
				root.v2.should.eql('root-v2');
				root.v3.should.eql('root-v3');
				root.v4.should.eql('root-v4');


				var branch1 = $('#scope-1').data('archetypo');

				branch1.v1.should.eql('root-v1');
				branch1.v2.should.eql('branch-1-v2');
				branch1.v3.should.eql('branch-1-v3');
				branch1.v4.should.eql('root-v4');


				var branch11 = $('#scope-1-1').data('archetypo');

				branch11.v5.should.eql('branch-1-v5');


				testdone();
			});
		});
	});
});
