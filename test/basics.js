(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'archetypo',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'lodash'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(archetypo, should, $, _) {
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


			// set some default archetypo options
			archetypo.setDefaults({
				prefix: 'prefix',
				selector: '[data-prefix]'
			});

			var scopeData = _.extend(assert, {

				// invocations will be stored here
				invocations: {
					navView           : 0,
					collectionView    : 0,
					collectionItemView: 0,
					itemFullView      : 0,
					itemThumbnailView : 0,
				}

			});

			archetypo($('#app'), scopeData)
				.done(function (scope) {


					console.log('archetypo done')

					// [1] verify invocation collectionViewunt
					scope.invocations.navView.should.eql(1, 'navView should have been invoked once');
					scope.invocations.collectionView.should.eql(1, 'collectionView should have been invoked once');
					scope.invocations.collectionItemView.should.eql(3, 'collectionItemView should have been invoked thrice');
					scope.invocations.itemFullView.should.eql(1, 'itemFullView should have been invoked once');
					scope.invocations.itemThumbnailView.should.eql(3, 'itemThumbnailView should have been invoked thrice')


					// [2] verify that parent scopes were untouched by inner scopes.

					testdone();
				});

		});
	});
});
