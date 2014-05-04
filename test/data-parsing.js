define(['/src/__archetypo/data/helpers.js', 'should'],
function(helpers                          ,  should ) {
	'use strict';

	describe('archetypo parsePrefixedData', function () {
		beforeEach(function () {
			this.raw = {
				arch:        'path/to/main',
				archOptDock: 'path/to/main/dock',
				archOptMap:  'path/to/main/map',

				archCss:        'path/to/css',
				archCssOptDock: 'path/to/css/dock',
				archCssOptMap:  'path/to/css/map',

				invalidData: 'lalalalalala',
			};
		});

		afterEach(function () {});

		it('unprefixData - remove given prefix and lowercase the starting letter of property', function () {

			var data = helpers.pickPrefixed('arch', this.raw);

			data.should.eql({
				'':        'path/to/main',
				optDock: 'path/to/main/dock',
				optMap:  'path/to/main/map',

				css:        'path/to/css',
				cssOptDock: 'path/to/css/dock',
				cssOptMap:  'path/to/css/map'
			});

		});
	});
});
