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

	describe('archetypo methods', function () {

		it('load', function (done) {
			var arch = archetypo({
				el: $('#methods-load')
			});

			// run tests after done
			arch.done(function () {



				// basic load, just the same as archetypo.require()
				arch.loadTest.id.should.eql('load-test');
				arch.loadTest.value.should.eql('load-test-value');

				// retrieve the property
				arch.loadPropertyTest.should.eql('load-test-property');

				// retrieve a deep property
				arch.loadDeepPropertyTest.should.eql('load-test-deep-property');


				// multiple remote modules
				arch.loadMultiModule.should.eql([
					{ id: 'load-test-1' },
					{ id: 'load-test-2' }
				]);

				// multiple remote modules pluck
				arch.loadMultiModuleId.should.eql(['load-test-1', 'load-test-2']);

				done();
			});
		});

		it('summon', function () {
			var arch = archetypo({
				el: $('#methods-summon')
			});
		});
	});
});
