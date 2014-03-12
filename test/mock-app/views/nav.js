define(function (require, exports, module) {

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/nav.html')

	app.constructor('view', 'nav', {
		html: html,
	});
});
