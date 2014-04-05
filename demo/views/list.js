define(function (require, exports, module) {

	var backbone = require('lowercase-backbone');

	module.exports = backbone.view.extend({
		events: {
			'click li': 'nav'
		},

		nav: function () {
			alert('nav')
		}
	})


});
