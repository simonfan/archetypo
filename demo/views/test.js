define(function (require, exports, module) {

	var backbone = require('lowercase-backbone');

	module.exports = backbone.view.extend({

		initialize: function initializeNav(options) {

			backbone.view.prototype.initialize.call(this, options);

			console.log('TESTTESTTEST')
			console.log(options);

			console.log(options.bananaColor)
		},
	})

});
