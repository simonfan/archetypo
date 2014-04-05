define(function (require, exports, module) {


	var modelDock = require('model-dock');

	module.exports = modelDock.extend({
		initialize: function initialize(options) {

			this.initializeBackboneView(options);

			this.$el.append(options.template);
			this.initializeModelDock(options);

			this.set('title', 'lalalalala');
			this.set('body', 'body qwe qwe')
		},

		map: {
			title: '[data-attribute="title"]',
			body: '[data-attribute="body"]'
		},

		events: {
			'click li': 'nav'
		},

		nav: function () {
			alert('nav')
		}
	})

});
