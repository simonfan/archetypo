define(function (require, exports, module) {

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/collection.html')

	app.builder('collection', {
		html: html,
	});
});
