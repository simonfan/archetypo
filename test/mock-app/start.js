define(function (require, exports, module) {

	require('/test/mock-app/views/collection.js');
	require('/test/mock-app/views/display.js');
	require('/test/mock-app/views/model.js');
	require('/test/mock-app/views/nav.js');

	var app = require('/test/mock-app/app.js');

	return app;
});
