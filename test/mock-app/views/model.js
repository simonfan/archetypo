define(function (require, exports, module) {

	var _ = require('lodash');

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/model.html');

	app.builder('model', {

		initialize: function () {
			_.bindAll(this, 'showFruit');

			app.builder('view', 'default').prototype.initialize.apply(this, arguments);
		},

		html: html,


		docks: {
			data: {
			//	name: 'data',

				property: 'data',

				map: {
					id: '[data-attribute="id"]',
					name: '[data-attribute="name"]',
					color: '[data-attribute="color"]',
				},

				stringifiers: {
					name: function (name) {
						return 'The fruit\'s name is ' + name;
					}
				},

				parsers: {

				}
			}
		},

		events: {
			'click .lalala': 'showFruit',
		},

		showFruit: function (event) {
			app.navigate('model', this.$el.data(), { trigger: true });
		}
	});
});
