define(function (require, exports, module) {

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/collection.html')

	app.constructor('view', 'collection', {
		html: html,
	});
});
