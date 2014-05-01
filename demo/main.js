define(function (require, exports, module) {

	var $ = require('jquery'),
		archetypo = require('archetypo');

	$('#app').archetypo()
		.done(function ($el) {

			var $mainNav = $el.find('#main-nav');

			console.log($mainNav.archetypo());

			console.log('ready!')
		});

});
