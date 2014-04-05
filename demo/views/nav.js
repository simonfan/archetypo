define(function (require, exports, module) {

	var backbone = require('lowercase-backbone');

	module.exports = backbone.view.extend({
		events: {
			'click [data-to]': 'nav'
		},

		nav: function (e) {
			var $target = $(e.target);

			alert($target.data('to'));
		}
	})

});
