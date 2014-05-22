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

	describe('archetypo data-parsing', function () {
		it('value parsing', function () {

			// emulate an archetypo instantiation
			var fakeArchetypo = Object.create(archetypo.prototype);
			_.assign(fakeArchetypo, {
				el: $('#data-parsing')
			});

			var data = fakeArchetypo.archData();

			data.something.should.eql({
				type    : 'invocation',
				priority: 1,
				value   : '[path/to/module.js]',
				method  : 'require',
			})

			data.anotherThing.should.eql({
				type    : 'invocation',
				priority: 0,
				method  : 'load',
				value   : '[path/to/module, path.to.property]'
			});

			data.invocation.should.eql({
				type    : 'invocation',
				priority: undefined,
				method  : 'summon',
				value   : '[path/to/summoned, $something, { $something, $anotherThing }]'
			});

			data.literal.should.eql({
				type : 'literal',
				value: 'trimmed-and-continuous-literal-value'
			});
		});
	});
});
