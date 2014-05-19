define(function (require, exports, module) {

	var $ = require('jquery'),
		archetypo = require('archetypo');


	var arch = window.arch = archetypo({
		el: $('#app'),
	});

	arch.done(function (app) {

		console.log('this should be the last log, after everything is done!')
	});

});
