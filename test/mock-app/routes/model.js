define(function (require, exports, module) {



	// view constructors that this route requires in order to operate.
	require('/test/mock-app/views/collection.js');
	require('/test/mock-app/views/display.js');
	require('/test/mock-app/views/model.js');
	require('/test/mock-app/views/nav.js');

	// the app.
	var app = require('/test/mock-app/app.js');

	var database = require('/test/mock-app/database/collection.js');

	// route definition
	app.route('model/:id', 'model', function (id) {
		// the model view
		var view = app.view('model-display');

		view.data.attach(database.get(id));
	});
});
