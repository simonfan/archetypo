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

	describe('archetypo data-evaluation', function () {

		beforeEach(function () {

			// emulate an archetypo instantiation
			this.fakeArchetypo = Object.create(archetypo.prototype);
			_.assign(this.fakeArchetypo, {
				el: $('#data-evaluation'),
			});

		})

		it('archData()', function () {

			var data = this.fakeArchetypo.archData();

			// invocations:

			data.something.should.eql({
				type    : 'invocation',
				priority: 1,
				value   : '[path/to/module]',
				method  : 'load',
			})

			data.anotherThing.should.eql({
				type    : 'invocation',
				priority: 0,
				method  : 'fake-method',
				value   : '[path/to/module, path.to.property]'
			});

			// values:

			data.valueLiteral.should.eql({
				type : 'value',
				value: 'no starting or trailing whitespaces'
			});

			data.valueEvaluated.should.eql({
				type: 'value',
				value: '{ a: $scopeValue, b: bLiteralValue }'
			});
		});


		it('archEvaluate(archData)', function (done) {
			// STUBS
			this.fakeArchetypo.load = function (pathToModule) {
				pathToModule.should.eql('path/to/module');
			};

			this.fakeArchetypo.fakeMethod = function (arg1, arg2) {
				arg1.should.eql('path/to/module');

				arg2.should.eql('path.to.property');
			};

			this.fakeArchetypo.scopeValue = 'some scope value';
			// STUBS


			// GET DATA
			var data = this.fakeArchetypo.archData(),
			// RUN EVALUATION
				evaluation = this.fakeArchetypo.archEvaluate(data);

			// DO CHECKINGS
			evaluation.done(function (scope) {


				scope.valueLiteral.should.eql('no starting or trailing whitespaces');

				scope.valueEvaluated.should.eql({
					a: 'some scope value',
					b: 'bLiteralValue',
				});

				done()
			});
		});
	});
});
