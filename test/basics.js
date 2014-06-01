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


	var assert = {};

	assert.eql = function shouldEql(v1, v2, message) {
		should(v1).eql(v2, message);
	};


	assert.is = function isObject(v, type, message) {

		return should(v).be.type(type, message);
	};



	describe('archetypo basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (testdone) {

			archetypo($('#app'), {
					rootScope: assert
				})
				.done(function (scope) {


				//	console.log($('#list-display').archetypo());
					testdone();
				});

		});
	});
});
