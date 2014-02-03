(function(name, factory) {

	var deps = ['../src/__archetypo/eventemitter/index', 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(eventemitter, should) {
	'use strict';

	describe('Archetypo.eventemitter', function () {

		it('works', function () {
			var emitter = eventemitter(),
				control = false;

			emitter.on('some-event', function (data) {
				control = data;
			});

			emitter.emit('some-event', 'some-value');


			control.should.eql('some-value');

		});
	});
});
