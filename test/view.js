define(['archetypo', 'should', 'jquery', 'mock-app/loader.js', 'text!/test/mock-app/templates/main.html'], function(archetypo, should, $, app, mainHtml) {
	'use strict';

	describe('archetypo view', function () {
		beforeEach(function () {
			this.$main = $(mainHtml).appendTo($('body'));
		});

		afterEach(function () {
			app.navigate('/test', { trigger: true });
		});

		it('multiple view definition', function (done) {

			// [2] Start stuff!
			app.start({ el: this.$main, pushState: true });

			setTimeout(function (argument) {
				app.navigate('model', { id: 1 }, { trigger: true });
			}, 400);

			setTimeout(done, 1000);
		});
	});
});
