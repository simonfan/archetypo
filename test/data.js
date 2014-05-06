define(['parseArchData', 'processArchData', 'should', 'lodash', 'q'],
function(parseArchData , processArchData  ,  should , _       ,  q ) {
	'use strict';

	describe('archetypo parsePrefixedData', function () {
		beforeEach(function () {


			this.raw = {

				// unnamespaced: they are for local use only
				archFn: 'path/to/local/fn',
				archDock: 'require: local-arch-dock',               // allow for whitespace
			//	archMap:  'requireAndInvoke: local-arch-map',

				// the data namespace
				archDataFn:        'dataFunc',
				archDataDock:      'require: path/to/main/dock',               // allow for whitespace
				archDataMap:       'requireAndInvoke: path/to/main/map',

				// the css namespace
				archCssFn:         'cssFunc',
				archCssDock:       'require : path/to/css/dock',
				archCssPlainValue: 'plain-text',

				// no fn explicitly declared for this guy.
				// the 'outer' namespace must have
				// a fn defined in the outer scope
				archOuterDock:     'require:somevalue',
				archOuterId:       'outerid',


				// this guy will get into no namespace, but the local one
				archInvalidProp: 'lalala',

				// this guy will be completely ignored.
				invalidData:       'lalalalalala',
			};
		});

		afterEach(function () {});




		it('parseArchData', function () {

			var raw = this.raw;

			var archData = parseArchData(raw, {
				prefix: 'arch',
				namespaces: ['outer']
			});

			// ''
			_.keys(archData['']).should.eql([
				'fn', 'dock', 'dataFn', 'dataDock', 'dataMap', 'cssFn', 'cssDock',
				'cssPlainValue', 'outerDock', 'outerId', 'invalidProp'
			]);

			// css
			archData.css.should.eql({
				fn: {
					processor: void(0),
					value:     'cssFunc',
				},

				dock: {
					processor: 'require',
					value:     'path/to/css/dock',
				},
				plainValue: {
					processor: void(0),
					value:     'plain-text',
				}
			});

			// data
			archData.data.should.eql({
				fn: {
					processor: void(0),
					value:     'dataFunc',
				},

				dock: {
					processor: 'require',
					value:     'path/to/main/dock',
				},

				map: {
					processor: 'requireAndInvoke',
					value:     'path/to/main/map'
				},
			})

			// outer
			archData.outer.should.eql({
				dock: {
					processor: 'require',
					value:     'somevalue',
				},

				id: {
					processor: void(0),
					value:     'outerid',
				}
			})

		});











		it('processArchData', function (done) {


			var paths = {
				// unnamespaced: they are for local use only
				fn: 'path/to/main/fn',
				dock: 'path/to/main/dock',
				map: 'path/to/main/map',

				cssFn: 'path/to/css/fn',
				cssDock: 'path/to/css/dock',
				cssMap: 'path/to/css/map',

				dataFn: 'path/to/data/fn',
				dataDock: 'path/to/data/dock',
				dataMap: 'path/to/data/map',
			};

			var raw = {
				// unnamespaced: they are for local use only
				archFn: paths.fn,
				archDock: 'require: ' + paths.dock,               // allow for whitespace
				archMap:  'requireAndInvoke:' + paths.map,

				archCssFn: paths.cssFn,
				archCssDock: 'require:' + paths.cssDock,

				// outer, no fn explicitly defined
				archDataDock: 'require: ' + paths.dataDock,

				invalidData: 'qweqweqew',
			};

			// parse the data into archData
			var archData = parseArchData(raw, { prefix: 'arch' });


			var processingContext = {
				id: 'fake-jq-object'
			};

			// process the archData
			var process = processArchData(archData, {

				// the context all processors will be invoked on
				context: processingContext,

				// all values will be passed through this method.
				evaluator: function (value) {
					if (value === 'this') {
						return this;
					} else {
						return value;
					}
				},

				// the processors keyed by processor name
				processors: {
					require: function (value, done) {

						// make assertion
						this.should.eql(processingContext);

						var res = 'required ' + value;

						setTimeout(_.partial(done, res), 600);
					},

					requireAndInvoke: function (value, done) {


						// make assertion
						this.should.eql(processingContext);

						var res = 'required and invoked ' + value;

						setTimeout(_.partial(done, res), 600);

					},
				},

				// the default processors for the properties
				defaultProcessors: {
					'(fn|.*?Fn$)': 'require',
				}
			});



			////////////////////////////////////////////

			process.done(function (processed) {


				// copy shallow and compare. (the processed object has prototype stuff);
				var expected = {
					'': {
						fn:   'required ' + paths.fn,
						dock: 'required ' + paths.dock,
						map:  'required and invoked ' + paths.map,

						cssFn: 'required ' + paths.cssFn,
						cssDock: 'required ' + paths.cssDock,

						dataDock: 'required ' + paths.dataDock
					},

					css: {
						fn: 'required ' + paths.cssFn,
						dock: 'required ' + paths.cssDock,

					}
				};


				console.log('is')
				console.log(processed)
				console.log('expected');
				console.log(expected);

				processed[''].should.eql(expected['']);

				done();

			})
		});
	});
});
