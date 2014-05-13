define(function (require, exports, module) {

	var backbone = require('lowercase-backbone');

	module.exports = backbone.view.extend({

		initialize: function initializeNav(options) {

			backbone.view.prototype.initialize.call(this, options);

			console.log('initialize nav')
			console.log(options);
		},

		events: {
			'click [data-to]': 'nav'
		},

		nav: function (e) {
			var $target = $(e.target);

			alert($target.data('to'));

//			return false;
		}
	})

});
