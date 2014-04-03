define(function (require, exports, module) {

	var dockableView = require('dockable-view');

	var app = require('/test/mock-app/app.js');

	var html = require('text!/test/mock-app/templates/collection.html')

	app.builder('collection', dockableView.prototype);




});
