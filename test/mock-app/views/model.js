define(function (require, exports, module) {

	var _ = require('lodash'),
		dockableView = require('dockable-view'),
		archetypoView = require('archetypo-view');

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/model.html');



	var modelView = dockableView.extend(archetypoView.prototype).extend({

		initialize: function (options) {
			_.bindAll(this, 'showFruit');

			this.initializeBackboneView(options);

			this.register(options);
			this.render(options)

			dockableView.prototype.initialize.call(this, options);
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
	})

	app.builder('model', modelView);
});
