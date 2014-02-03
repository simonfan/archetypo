(function(name, factory) {

	var deps = ['../src/__archetypo/model/index', 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(model, should) {
	'use strict';

	describe('Archetypo.model', function () {
		beforeEach(function () {

			this.fruit = model({
				name: 'Apple',
				colors: ['red', 'green']
			});

		});

		it('emits events on change', function () {
			var control = false;

			this.fruit.on('change', function (model) {
				control = model.get('name');
			});

			this.fruit.set('name', 'Not Apple!')

			control.should.eql('Not Apple!');
		});

	});
});
