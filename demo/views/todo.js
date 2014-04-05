define(function (require, exports, module) {


	var backbone = require('lowercase-backbone');

	module.exports = backbone.view.extend({
		initialize: function initialize(options) {

			this.initializeBackboneView(options);

			console.log(options)

		},

		events: {
			'click li': 'nav'
		},

		nav: function () {
			alert('nav')
		}
	})

});
