(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'jquery-scope',
		// dependencies for the test
		deps = [mod, 'should', 'text!/test/fixture.html'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(JqueryScope, should, fixture) {
	'use strict';

	describe('JqueryScope basics', function () {
		beforeEach(function () {

			var $root = this.$root = $(fixture).appendTo($('body'));


			// properties to be checked
			var properties = this.properties = {};

			properties.modules = ['a', 'b', 'c', 'd'];

			properties.options = ['option1', 'option2', 'option3'];


			this.archData = {
				el: 'eval:this',
				option1: 'root-1',
				option2: 'root-2',
				option3: 'require:/path-to-bananas',
				a: 'require:/path-to-module-a(el)',
				b: 'require:/path-to-module-b({ el, dock:option1, option2 })',
				c: 'require:/path-to-module-c({ el, option2 }, option3)'
			};

		});

		it('root', function () {


			var $root = this.$root;


			var keyMatcher = /\s*(?:([^:]+?)|(?:([^:]+):([^:]+?)))\s*(?:,|$)/g;
			function parseObjectArg(str) {

				console.log(str);

				var res = {},
					keyMatch;

				while (keyMatch = keyMatcher.exec(str)) {

					// [0] full matched string
					// [1] captured KEY & VALUE-REFERENCE
					// [2] captured KEY
					// [3] captured VALUE-REFERENCE

					if (keyMatch[1]) {
						res[keyMatch[1]] = keyMatch[1];

					} else if (keyMatch[2]) {
						res[keyMatch[2]] = keyMatch[3];
					}

				}

				console.log(res);

				return res;

			}



			var argMatcher = /\s*(?:([A-Za-z$_].*?)|\{\s*(.*?)\s*\})\s*(?:,|$)/g;
			function parseArguments(str) {
				// results
				var res = [],
					argMatch;

				while (argMatch = argMatcher.exec(str)) {

					// [0] the matched string
					// [1] captured SIMPLE arg
					// [2] captured OBJECT arg

					if (argMatch[1]) {
						// SIMPLE
				//		console.log('SIMPLE: ' + argMatch[1]);

						res.push(argMatch[1]);

					} else if (argMatch[2]) {
						// OBJECT
				//		console.log('OBJECT: ' + argMatch[2]);

						res.push(parseObjectArg(argMatch[2]));
					}
				}

				return res;
			}


			var valueMatcher = /^(?:(.*?):)?(.*?)\((.*?)\)$/;

			function parseValue(v) {
				var vMatch = v.match(valueMatcher);

				if (vMatch) {


				// [0] = matched value
				// [1] = method
				// [2] = value
				// [3] = arguments

					var args = parseArguments(vMatch[3]);

					return {
						method: vMatch[1],
						value:  vMatch[2],
						args:   args,
					}
				} else {
					return {};
				}
			}


			var root = $root.scope('[data-arch]', {
				// meta-data options

				// the data prefix
				prefix: 'arch',
				// parser
				parse: parseValue
			});

			root.evaluate(this.properties.modules, { format: 'object'})
				.should.eql({
					a: 'require:/path-to-module-a(el)',
					b: 'require:/path-to-module-b({ el, dock:option1, option2 })',
					c: 'require:/path-to-module-c({ el, option2 }, option3)',
					d: undefined
				});

			root.evaluate(this.properties.options, { format: 'object' })
				.should.eql({
					option1: 'root-1',
					option2: 'root-2',
					option3: 'require:/path-to-bananas'
				});

		});

		it('branch-1', function () {

			var branch1 = $('#branch-1').scope('[data-arch]');

			branch1.evaluate(this.properties.require, { format: 'object' })
				.should.eql({
					archRequireA: '/path-to-module-a',
					archRequireB: '/path-to-module-b',
					archRequireC: '/path-to-module-c',
					archRequireD: undefined
				});

			branch1.evaluate(this.properties.invoke, { format: 'object' })
				.should.eql({
					archA: 'branch-1-a',
					archB: '',
					archC: '',
					archD: undefined
				});

			branch1.evaluate(this.properties.optionsB, { format: 'object' })
				.should.eql({
					archBOpt1: 'branch-1-b-v1',		// own
					archBOpt2: 'root-b-v2',			// inherited
					archBOpt3: 'branch-1-b-v3'		// own
				});

			branch1.evaluate(this.properties.optionsC, { format: 'object' })
				.should.eql({
					archCOpt1: 'branch-1-c-v1',		// own
					archCOpt2: 'branch-1-c-v2',		// own
				});
		});

		it('branch-1-1', function () {

			var branch11 = $('#branch-1-1').scope('[data-arch]');

			branch11.evaluate(this.properties.require, { format: 'object' })
				.should.eql({
					archRequireA: '/path-to-module-a',
					archRequireB: '/path-to-module-b',
					archRequireC: '/path-to-module-c',
					archRequireD: undefined
				});

			branch11.evaluate(this.properties.optionsC, { format: 'object' })
				.should.eql({
					archCOpt1: 'branch-1-c-v1',		// own
					archCOpt2: 'branch-1-c-v2',		// own
				});
		});
	});
});
