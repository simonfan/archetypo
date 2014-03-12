define(function (require, exports, module) {



	// views that this route requires in order to operate.
	require('/test/mock-app/views/collection.js');
	require('/test/mock-app/views/display.js');
	require('/test/mock-app/views/model.js');
	require('/test/mock-app/views/nav.js');

	// the app.
	var app = require('/test/mock-app/app.js'),
		// the model view
		view = app.instance('view', 'model-display');

	var database = require('/test/mock-app/database/collection.js');

	// route definition
	app.route('/model/:id', 'model', function () {

		console.log(view);

		view.docks.model.attach(database.get(1));
	});
});
