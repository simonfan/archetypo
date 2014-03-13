define(function (require, exports, module) {

	var _ = require('lodash');

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/model.html');

	app.constructor('view', 'model', {

		initialize: function () {
			_.bindAll(this, 'alert');

			app.constructor('view', 'default').prototype.initialize.apply(this, arguments);
		},

		html: html,


		docks: {
			model: {
				name: 'data',

				map: {
					id: '[data-attribute="id"]',
					name: '[data-attribute="name"]',
					color: '[data-attribute="color"]',
				},

				stringifiers: {
					name: function (name) {
						return 'The fruit\'s name is ' + name;
					}
				}
			}
		},

		events: {
			'click .lalala': 'alert',
		},

		alert: function (event) {


			alert(this.$el.data('message'));

		}
	});
});
