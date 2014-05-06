//     subject
//     (c) simonfan
//     subject is licensed under the MIT terms.

define("subject",["lodash"],function(t){var i={initialize:function(){}},e=function(){};return e.prototype=i,e.proto=function(i,e){return t.isObject(i)?t.assign(this.prototype,i):this.prototype[i]=e,this},e.protoMerge=function(i,e){if(t.isString(i)){var o=this.prototype[i],n=t.assign({},o,e);this.proto(i,n)}else t.each(i,t.bind(function(t,i){this.protoMerge(i,t)},this))},e.extend=function(i,e,o){var n,r;t.isFunction(i)?(n=t.assign({},e,{initialize:i}),r=o):t.isObject(i)&&(n=i||{},r=o);var p,s=this;return p=function(){var t=Object.create(p.prototype);return t.initialize.apply(t,arguments),t},t.assign(p,s,r),p.prototype=Object.create(s.prototype),p.prototype.constructor=p,p.proto(n),p.__super__=s.prototype,p},e.extend.bind(e)});
define('__archetypo/data/parse',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

/*

{
	archFn: 'path-to-main-function',
	archOpDock: 'require:path-to-main-dock',
	archOpId: 'some-id',

	archInteractionFn: 'path-to-interaction-view',
	archInteractionOpDock: 'require:path-to-interaction-dock',


	archCssFn: 'path-to-css-view',
	archCssOpDock: 'require:path-to-css-dock',
}


*/

	/**
	 * ^arch      -> prefix
	 * (          -> start first capturing group (#namespace)
	 *  [A-Z]      -> any Uppercase letter
	 *  .*?        -> followed by any character (.) any number of times (*) non greedily (?)
	 * )          -> close first capturing group (/#namespace)
	 * ?          -> let the first capturing group be optional
	 * (          -> start the second capturing group (#property)
	 *  [A-Z]      -> any Uppercase letter
	 *  .*$        -> followed by anything any number of times until the end of the string
	 * )          -> close the second capturing group (#property)

	 * first-capturing-group:  namespace
	 * second-capturing-group: property
	 */
// deprecated:	var keyParserRegExp = /^arch([A-Z].*?)?([A-Z].*$)/;

	var keyParserRegExp = /^archSomeFn([A-Z].*$)/;

	/**
	 * Creates a Regular Expression to capture property name.
	 *
	 *
	 */
	function buildKeyParser(prefix) {
		return new RegExp('^' + prefix + '([A-Z].*$)');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 */
	function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	/**
	 * Returns the string with the first letter to uppercase.
	 */
	function uppercaseFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}



	/**
	 * ^        -> string start
	 * (?:      -> start non-capturing group (#processor:)
	 *  (        -> start first capturing group (#processor)
	 *   .*?      -> anything (.) any number of times (*) non greedily (?)
	 *  )        -> close first capturing group (#processor)
	 *  \s*:\s* -> ':', the 'processor' divider, prefixed or suffixed by any number of whitespaces (\s*)
	 * )        -> close non-capturing group (#/processor:)
	 * ?        -> make non-capturing group (#processor:) optional
	 * (        -> start second capturing group (#value)
	 *  .*$      -> anything (.) any number of times (*) greedily until the end of the string ($)
	 * )        -> close second capturing group (/#value)
	 */
	var valueParserRegExp = /^(?:(.*?)\s*:\s*)?(.*)$/;
//	var valueParserRegExp = /^(?:(.*?):)?(.*?)\((.*?)\)$/;
	function parseValue(value) {
		var res = value.match(valueParserRegExp);

		return {
			processor: res[1],
			value:     res[2]
		};
	}


	/**
	 *
	 * Removes the prefix from a given set of data.
	 *
	 *
	 */
	function parsePrefixedData(prefix, data) {

		// [1] build keyParser RegExp
		var keyParser = buildKeyParser(prefix);

		// [2] loop through data properties
		return _.transform(data, function (results, value, key) {

			// [2.1] parse the key
			var parsedKey = key.match(keyParser);
			// [2.2] if key matches the parser, it means it has archData
			if (parsedKey) {

				// [3] parsedKey is an array contanining
				//  0: the full key string
				//  1: the unprefixedKey name (may not be undefined)
				//
				// set results accordingly

				// [4] get unprefixedKey
				var unprefixedKey = lowercaseFirst(parsedKey[1]);

				// [5] set
				results[unprefixedKey] = parseValue(value);

			} // else it is a common data attribute, so ignore

		});
	}



	// parses the fns
//	var fnKeyParser = /^arch([A-Z].*?)Fn$/;
	function parseNamespaces(prefix, data) {

		var fnKeyParser = new RegExp('^' + prefix + '([A-Z].*?)?Fn$');

		var results = [];

		_.each(data, function (value, key) {
			var parsedKey = key.match(fnKeyParser);

			if (parsedKey) {

				// make sure namespace is a string.
				// it defaults to '', the local namespace
				var namespace = parsedKey[1] || '';

				results.push(lowercaseFirst(namespace));
			}
		});

		return results;
	}


	/**
	 *
	 *
	 * RETURNS:
	 * {
	 *     namespace: {
	 *         evaluator: {
	 *             prop: 'v',
	 *             prop1: 'v1'
	 *         }
	 *     },
	 *     namespace1: {
	 *         evaluator: {
	 *             property: 'value',
	 *             prop2:    'value',
	 *         },
	 *         evaluator1: {
	 *             prop1: 'v1',
	 *             prop2: 'v2'
	 *         }
	 *     }
	 * }
	 *
	 *	{
	 *		$namespace: {
				$property: {
					evaluator: $evaluatorNamr,
					value:     $value
				}
			}
		}
	 */
	/**
	 * options: {
	 *     prefix: 'arch'	// global prefix
	 *     namespaces: ['someNamespace', 'anotherNamespace']
	 * }
	 *
	 */
	module.exports = function parseArchData(data, options) {

		var archPrefix = options.prefix;

		// [1] parse out the namespaces available
		var namespaces = parseNamespaces(archPrefix, data);


		// [2] join the namespaces with those passed in at options
		namespaces = _.union(namespaces, options.namespaces);



		// [3] build results
		var results = {};
		_.each(namespaces, function (namespace) {

			// [3.1] build the prefix
			var namespacePrefix = archPrefix + uppercaseFirst(namespace);

			// [3.2] get the data available for the namespace
			var namespaceData = parsePrefixedData(namespacePrefix, data);

			// [3.3] ignore data that has no contents.
			if (_.size(namespaceData) > 0) {
				results[namespace] = namespaceData;
			}
		});


		return results;
	};

	// make parseNamespaces available.
	exports.namespaces = parseNamespaces;

	// make parseValue available
	exports.value = parseValue;
});

//     Q
//     (c) simonfan
//     Q is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Q
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('_q',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');


	exports.each = function qEach(obj, fn, ctx) {

	};

	exports.map = function qMap(obj, fn, ctx) {
		var promises = _.map.apply(_, arguments);

		return q.all(promises);
	};

	exports.mapValues = function qMapValues(obj, fn, ctx) {
		var keys     = _.keys(obj),
			promises = _.map.apply(_, arguments);

		return q.all(promises).then(function (results) {
			return _.zipObject(keys, results);
		});
	};
});

define('__archetypo/data/process/property',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Runs the logic for retrieving the processor function
	 *
	 *
	 */
	function retrievePropertyProcessor(propertyName, valueData, options) {


		// [1] get processor
		// [1.1] get the name of the processor.
		var processor = valueData.processor || _.find(options.defaultProcessors, function (processor, regexpStr) {
			var re = new RegExp(regexpStr);

			return re.test(propertyName);
		});


		// [2] if there is a processor defined...
		if (processor) {

			if (_.isString(processor)) {
				// [2.1] the processor defined is a string
				//       try to fetch it from the processors hash
				processor = options.processors[processor];

				// [2.1.1] throw error if no processor was found
				//         in order to make debugging (and life) easier..
				//         throw error if no processor function is found
				if (!processor) {
					throw new Error('No processor named ' + processor + ' was found. Make sure it exists');
				}

				// [2.1.2] happily return the processor :)
				return processor;

			} else {
				// [2.2] the processor defined is a function already.
				//       just return it :]
				return processor;
			}

		} else {

			// no processor
			return false;
		}

	}

	/**
	 *
	 *
	 * @method processProperty
	 * @private
	 * @param valueData {Object}
	 *     @param value {String}
	 *     @param [processor] {String|Undefined}
	 * @param propertyName {String}
	 */
	module.exports = function processProperty(propertyName, valueData, options) {

		console.log('processProperty invoked on ' + propertyName);

		// [1] build the deferred object
		var processPropertyDeferred = q.defer();


		// [2] evaluate value
		console.log(valueData.value);
		var value = options.evaluator.call(options.context, valueData.value);
		console.log('1!!!!!!!!!!!! ' + propertyName)
		console.log(value);

		// [3] get processor
		// [3.1] get the name of the processor.
		var processor = retrievePropertyProcessor.apply(this, arguments);


		// [4] if there is a processor defined,
		//     go on and do the processing
		if (processor) {

			// [4.2] invoke processor
			// [4.3] check argument length of processor
			if (processor.length === 1) {
				// [4.4] one argument
				// args: [value]
				//  ctx: options.context

				// resolve the defer IMMEDIATELY with the evaluation return value
				processPropertyDeferred.resolve(processor.call(options.context, value));

			} else if (processor.length === 2) {
				// [4.5] two arguments
				// args: [value, processPropertyDeferred.resolve]
				//  ctx: options.context

				// pass the processPropertyDeferred object to the processor
				processor.call(options.context, value, processPropertyDeferred.resolve);
			}


		} else {
			// [5] if no processor was defined,
			//     just return the value
			processPropertyDeferred.resolve(value);
		}

		// [6] always return the promise
		return processPropertyDeferred.promise;
	};
});

define('__archetypo/data/process/index',['require','exports','module','lodash','q','_q','./property'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q'),
		_q = require('_q');

	var processProperty = require('./property');

	// process the data of a given namespace.
	function processNamespaceData(nsSlug, nsData, options) {

		// set defaultProperties
		_.extend(nsData, options.defaultProperties);

		return _q.mapValues(nsData, function (value, property) {

			return processProperty(property, value, options);

		}, this);

	}


	/**
	 *
	 *
	 */
	module.exports = function processArchData(archData, options) {

		// returns promise for the fully processed archData
		return _q.mapValues(archData, function (nsData, nsSlug) {

			return processNamespaceData(nsSlug, nsData, options);

		}, this);

	};

});

define('__archetypo/build/build-namespaces',['require','exports','module','lodash','q','../data/parse','../data/process/index'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');

		// arch data parser
	var parseArchData = require('../data/parse'),
		// arch data processor
		processArchData = require('../data/process/index');

	/**
	 * Build-step
	 * Builds the namespaces of the archetypo object.
	 *
	 *
	 */
	module.exports = function buildNamespaces() {

		console.log('buildNamespaces invoked');
		console.log(this.scope.availableNames);

		// [0] buildNamespacesDeferred object
		var buildNamespacesDeferred = q.defer();




		// [1] get the archData
		var archData = parseArchData(this.el.data(), {
			prefix: this.prefix,
			namespaces: this.scope.availableNames
		});



		// [2] process archData
		// [2.1] build processing options
		var processingOptions = {
			context:           this.el,
			evaluator:         this.evaluator,
			processors:        this.processors,
			defaultProcessors: this.defaultProcessors,
			defaultProperties: this.defaultProperties,
		};

		// [2.2] process
		var process = processArchData(archData, processingOptions);

		// [3] when the data has been processed, create the namespaces
		process.done(_.bind(function (processedArchData) {

			// [3.1] loop through processedArchData
			//       and build a namespace for each.
			_.each(processedArchData, function (nsData, nsSlug) {
				this.scope.build(nsSlug, nsData);
			}, this);

			console.log('namespaces built')

			// resolve with no arguments
			buildNamespacesDeferred.resolve();

		}, this));


		// return promise
		return buildNamespacesDeferred.promise;
	};

});

define('__archetypo/build/build-invoke-fns',['require','exports','module','lodash','q','_q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q'),
		_q = require('_q');

	/**
	 * Builds the Fn of a given namespace.
	 *
	 *
	 */
	function invokeFn(nsData, nsSlug) {
		// 'this' = archetypo object

		console.log('invokeFn');
		console.log(nsData);

		// [0] buildDefer
		var invokeFnDeferred = q.defer();


		// [2.1] get Fn
		var fn = nsData.fn;

		if (!_.isFunction(fn)) {
			throw new Error('There is no function(fn) for ' + nsSlug + ' namespace.');
		}

		// [2.2] build options (just remove the fn from processed)
		var options = _.create(nsData);
		options.fn = void(0);

		// [2.3] invoke fn
		// args: [options]
		//  ctx: this.el
		var invocation = fn.call(this.el, options);

		// [2.4] check if the invocation returned a promise.
		if (q.isPromise(invocation)) {
			// [2.5] if so, resolve the buildDefer when that promise is done
			invocation.done(invokeFnDeferred.resolve);
		} else {
			// [2.6] otherwise, resolve the buildDefer immediately with the invocation itself.
			invokeFnDeferred.resolve(invocation);
		}


		// [3] return the promise
		return invokeFnDeferred.promise;
	};


	/**
	 * Build-step
	 * BUILD STEPS TAKE NO ARGUMENTS.
	 * They should be understood as partial steps running within the main builder's context.
	 * Builds the Fns of ALL the namespaces found on this archetypo object
	 *
	 */
	module.exports = function invokeAllFns() {
		// 'this' = archetypo object




		console.log('invokeAllFns invoked');

		// [0] buildDefer
		var invokeAllFnsDeferred = q.defer();

		console.log('!!!')
		console.log(this.scope.namespaces);

		var invocations = _q.mapValues(this.scope.namespaces, _.bind(invokeFn, this));


		invocations.done(_.bind(function (results) {

			// [3.1] save the fnResults to 'this.fns';
			this.fns = results;

			// [3.2] resolve the invokeAllFnsDeferred
			//       with undefined value.
			invokeAllFnsDeferred.resolve();
		}, this));

		// [4] return buildDefer promise
		return invokeAllFnsDeferred.promise;
	};

});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/build/build-subs',['require','exports','module','lodash','jquery','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	/**
	 *
	 *
	 * STEPS TAKE NO ARGUMENTS
	 *
	 */
	module.exports = function buildSubs() {

		console.log('buildSubs invoked')

		var buildSubsDeferred = q.defer();

		// [1]
		// find all elements within this element
		// that have an 'data-archetypo' attribute defined.
		var subEls = this.el.find('[data-archetypo]');

		// [2]
		// Instantiate the sub-views
		var subArchetypoPromises = _.map(subEls, function (el) {

			el = $(el);

			var elArchetypo = el.data('archetypo');

			// [0] check if the element already has an archetypo
			//     and only build if it has NOT
			if (!_.isObject(elArchetypo)) {


				// constructor is a reference to the
				// archetypo constructor that is available through
				// subject extension module. :)
				var subArchetypo = this.constructor(el, this.options);

				// return the promise
				return subArchetypo.promise;
			} else {
				return elArchetypo.promise;
			}

		}, this);

		// [3] resolve the buildSubsDeferred object
		//     when all the subArchetypoPromises are done
		q.all(subArchetypoPromises)
			.done(function () {

				// resolve with 0 arguments.
				buildSubsDeferred.resolve();
			});

		// [4] return the promise
		return buildSubsDeferred.promise;
	};

});

/**
 * AMD module.
 *
 * @module archetypo
 */

define('__archetypo/build/index',['require','exports','module','lodash','jquery','q','./build-namespaces','./build-invoke-fns','./build-subs'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	var buildNamespaces = require('./build-namespaces'),
		buildInvokeFns     = require('./build-invoke-fns'),
		buildSubs       = require('./build-subs');

	/**
	 * This is mostly a script invoker.
	 * It invokes
	 *    -namespace builder,
	 *    -fns builder
	 *
	 * @method build
	 *
	 */
	module.exports = function build() {
		// 'this' = archetypo object
		var archetypo = this;

		// [0] create a deferred object
		var buildDeferred = q.defer();

		// [1] asynchronous: build namespaces
		buildNamespaces.call(this)
		// [2] asynchronous: build fns
			.then(_.bind(buildInvokeFns, this))
		// [3] asynchronous: build subs
			.then(_.bind(buildSubs, this))
			.done(function (/* no args */) {
				buildDeferred.resolve(archetypo);
			});

		// [4] return the promise
		return buildDeferred.promise;
	};

});

define('__archetypo/scope-manager',['require','exports','module','lodash','subject'],function (require, exports, module) {
	

	var _ = require('lodash'),
		subject = require('subject');


	module.exports = subject({
		initialize: function initializeNamespaces(options) {

			// reference to the parent namespaces object
			// ATTENTION: refer not to the parent archetypo object,
			//            but to the parent namespaces object.
			this.parent = options.parent;

			this.namespaces = {};

			this.availableNames = this.parent ? _.clone(this.parent.availableNames) : [];
		},

		get: function getNamespace(slug) {

			var ns = this.namespaces[slug];

			if (!ns) {
				ns = this.parent.namespaces.get(slug);
			}

			return ns;
		},

		build: function buildNamespace(slug, data) {

			var ns;

			if (this.parent && _.isObject(this.parent.get(slug))) {
				// there is a parent namespace
				ns = _.create(this.parent.get(slug));
			} else {
				// no parent namespace
				this.availableNames.push(slug);
				ns = {};
			}

			// set data
			_.extend(ns, data);

			// save ns
			this.namespaces[slug] = ns;

			// return this
			return this;
		},
	});

});

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define('archetypo',['require','exports','module','lodash','jquery','subject','q','./__archetypo/build/index','./__archetypo/scope-manager'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		subject = require('subject'),
		q = require('q');

	// internal
	var build = require('./__archetypo/build/index'),
		scopeManager = require('./__archetypo/scope-manager');

	/**
	 * The archetypo object
	 *
	 *
	 */
	var archetypo = module.exports = subject({

		prefix: 'arch',

		/**
		 *
		 *
		 * Hash to hold all functions.
		 *
		 */
		fns: {

		},


		/**
		 * This method evaluates the value string
		 * It is called upon any value string.
		 *
		 * The default version returns the jq-object if value === 'this'
		 *
		 * @method evaluator
		 * @param value
		 */
		evaluator: function evaluate(value) {
			if (value === 'this') {
				return this;
			} else {
				return value;
			}
		},

		/**
		 * Hash holding processors to be called for evaluation
		 *
		 * Processors are 'argument-length-aware' functions.
		 * If the processor function takes ...
		 *     1 argument : [value]       (synchronous)
		 *     2 arguments: [value, done] (asynchronous)
		 *
		 * @property processors
		 * @type Object
		 */
		processors: {
			require: function archRequire(modulePath, done) {

				console.log('required ' + modulePath);

				require([modulePath], function (module) {
					done(module);
				});
			}
		},

		/**
		 * Hash holding the default processors for each archProperty.
		 *
		 * @property defaultProcessors
		 * @type Object
		 */
		defaultProcessors: {
			fn: 'require',
		},

		/**
		 * Hash holding the default properties
		 * and their values (pre-evaluated and pre-processed)
		 *
		 * @property defaultProperties
		 * @type Object
		 */
		defaultProperties: {
			el: {
				processor: void(0),
				value: 'this',
			},
		},

		/**
		 *
		 * @param el {jq-object}
		 * @param options
		 *     @param processors {Object}
		 *     @param defaultProcessors {Object}
		 */
		initialize: function initializeArchetypo(el, options) {

			options = options || {};

			// [0] el reference.
			// [0.1] save the archetypo object to the el
			el.data('archetypo', this);
			// [0.2] save reference to the el on archetypo object
			//////////////////////////////////////////////////////////////
			// OBS:  YES, circular reference... will this bring issues? //
			//////////////////////////////////////////////////////////////
			this.el = el;


			// [1] ancestor chain
			// [1.1] get closest ancestor that has data-archetypo
			var ancestorArchetypoEl = el.parent().closest('[data-archetypo]');

			// [1.2] get the archetypo object from ancestor and keep reference to it.
			/**
			 * Reference to the nearest archetypo ascendant.
			 *
			 * @property parent
			 * @type archetypo-object
			 */
			this.parent = ancestorArchetypoEl.data('archetypo');


			// [2] extend some options
			// [2.1] extensions
			_.each(
				_.pick(options, ['processors', 'defaultProcessors']),
				function (extensions, key) {
					_.extend(this[key], extensions);
				}, this);

			// [2.2] direct values
			this.evaluator = options.evaluator || this.evaluator;


			// [3] build a namespace manager
			this.scope = scopeManager({
				// parent refers not to the archetypo object parent
				// but to the scope manager of the parent
				parent: this.parent ? this.parent.scope : false
			});

			// [4] invoke build
			/**
			 * Promise to be resolved only when the view is ready.
			 *
			 * @property promise
			 * @type q-promise-object
			 */
			this.promise = build.call(this);

		},

		/**
		 * Retrieves a namespace object.
		 *
		 * @method namespace
		 * @param slug {String}
		 */
		namespace: function getNamespace(slug) {
			return this.namespaces[slug];
		},
	});




	// PLUGIN AREA //


	/**
	 * Retrieves a single archetypo from the $el.
	 *
	 * @method getArchetypo
	 * @private
	 */
	function getArchetypo($el, name) {

		name = name || 'main';

		// direct view
		return $el.data(storage)[name];
	}

	/**
	 * Invokes the archetypo builder on the element
	 *
	 * @method buildArchetypo
	 * @private
	 */
	function buildArchetypo($el, options) {
		options = options || {};

		// set default options
		_.defaults(options, defaultOptions);

		// if the storage option is set,
		// reset the storage string
		storage = options.storage = options.storage || storage;

		// build up
		return buildEl($el, options);
	}


	$.prototype.archetypo = function archetypo() {

		var initialized = this.data('__archetypo-initialized');

		if (initialized && (arguments.length === 0 || _.isString(arguments[0]))) {
			// get the main archetypo
			return getArchetypo(this, arguments[0]);

		} else {

			// set archetypo as initialized
			this.data('__archetypo-initialized', true);

			return buildArchetypo(this, arguments[0]);
		}
	};

});

