function __main(argument) {

	var dock = 'main-dock',
		map  = 'main-map',
		fn   = function mainFn(options) {};


	// result:
	mainFn({
		dock: 'main-dock',
		map:  'main-map'
	})

	function css() {
		var dock = 'css-dock',
			map  = 'css-map';

		// result:
		mainFn({
			dock: 'css-dock',
			map:  'css-map'
		})
	}

	function data() {
		var dock = 'data-dock',
			map  = 'data-map';

		// result:
		mainFn({
			dock: 'data-dock',
			map:  'data-map'
		});
	}

}
