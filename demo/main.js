define(function (require, exports, module) {

	var $ = require('jquery'),
		archetypo = require('archetypo');


	archetypo($('#app'))
		.done(function (app) {
			console.log(app);
		});

});
