define(['archetypo', 'should', 'jquery', 'mock-app/start.js', 'text!/test/mock-app/templates/main.html'], function(archetypo, should, $, app, mainHtml) {
	'use strict';

	describe('archetypo view', function () {
		beforeEach(function () {
			this.$main = $(mainHtml).appendTo($('body'));
		});

		afterEach(function () {
			app.navigate('/test');
		});

		it('multiple view definition', function (done) {

			// [2] Start stuff!
			app.build(this.$main)
				.start({ pushState: true });

			app.navigate('model/1', { trigger: true });

			setTimeout(done, 1000);
		});
	});
});
