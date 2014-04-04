define(function (require, exports, module) {

	var archView = require('archetypo-view');

	module.exports = archView.extend({
		events: {
			'click li': 'nav'
		},

		nav: function () {
			alert('nav')
		}
	})

});
