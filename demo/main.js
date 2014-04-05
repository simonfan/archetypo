define(function (require, exports, module) {

	var $ = require('jquery'),
		archetypo = require('archetypo');

	$('[archetypo]').archetypo({
		loadable: ['template']
	})
	.then(function ($el) {
		console.log('ready!')
	});

});
