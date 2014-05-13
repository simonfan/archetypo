define('__archetypo/parse/value',['require','exports','module'],function (require, exports, module) {
	

	// sample value string: "1! method(literal/path/to/somewhere, $argumentToBeScopeEvaluated)"
	var whitespace = '\\s*',
		priority   = '(?:(\\d*)!)?',
		word       = '([\\w$\\-]*)',
		argString  = '\\(' + whitespace + '(.*)' + whitespace + '\\)',
		whatever   = '(.*)';


	var invocationRegExpString = [
			// any starting whitespaces
			whitespace,
			// either
			'(?:',
				// the optional priority tag
				priority, whitespace,
				// method(argString)
				word, whitespace,
				argString,
				'|',
				// some unparsed value
				word,
			')' + whitespace
		].join(''),
		// /\s*(?:(?:(\d*)!)?\s*([\w$\-]*)\s*\(\s*(.*)\s*\)|([\w$\-]*))\s*/
		invocationRegExp       = new RegExp(invocationRegExpString);



	/**
	 * Prepare the string to be evaluated by scope.evaluate(argString);
	 * For now, basically add brackets.
	 * Future modifications should be added here.
	 *
	 * @method  buildArgsString
	 * @private
	 * @param  {String} str [description]
	 * @return {String}     [description]
	 */
	function buildArgsString(str) {
		return '[' + str + ']';
	}



	/**
	 * Parses the match returned object (an array)
	 * and returns better structured data.
	 *
	 * @method  parseArgsStringMatch
	 * @param  {[type]} match [description]
	 * @return {[type]}       [description]
	 */
	function parseArgsStringMatch(match) {
		// the response object
		var res = {};

		if (match) {
		// [0] = full matched string
		// [1] = PRIORITY TAG
		// [2] = METHOD NAME
		// [3] = ARGUMENTS STRING
		// [4] = LITERAL VALUE


			if (match[2]) {

				// it is a value that must be invocation
				// before assignment
				res.type = 'invocation';
				res.priority = (match[1] === '') ? '0' : match[1];
				res.method = match[2];
				res.value  = buildArgsString(match[3]);

			} else if (match[4]) {

				// it is a value that will be immediately available
				res.type = 'literal';
				res.value = match[4];

			}

		} else {
			// empty value
			res.type = 'empty';
		}

		return res;
	}


	// sample value string: "[$priorityNo!] method(literal, $evaluated, {$arg3, key: $arg4})"
	module.exports = function parseArchValue(str) {

		var invocationMatch = str.match(invocationRegExp);

		return parseArgsStringMatch(invocationMatch);
	};
});

define('__archetypo/helpers',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	exports.camelCase = function camelCase(str) {
		return str.toLowerCase().replace(/-(.)/g, function (match, capture1) {
			return capture1.toUpperCase();
		});
	};
});

define('__archetypo/build/evaluate/invoke',['require','exports','module','q','_q','lodash','../../helpers'],function (require, exports, module) {
	

	var q  = require('q'),
		_q = require('_q'),
		_  = require('lodash');

	var helpers = require('../../helpers');

	/**
	 *
	 * Invokes a single method
	 *
	 * @method invokeSingle
	 * @private
	 * @param invocation {Object} { value: v, method: m }
	 * @param prop {String}
	 */
	function invokeSingle(invocation, prop) {

		// [1] create a deferred object to be returned.
		var deferred = q.defer();

		// with evaluation
		// [2.1] execute evaluation
		var method = helpers.camelCase(invocation.method);
		var res = this.invoke(method, invocation.value);

		// [2.2] check evaluation returns
		if (q.isPromise(res)) {
			// [2.2.1] it is a promise, thus, ASYNCHRONOUS
			res.then(deferred.resolve);
		} else {
			// [2.2.2] it is not a prmoise, thus, SYNCHRONOUS
			deferred.resolve(res);
		}

		// return promise no matter what
		return deferred.promise;
	}



	/**
	 * Runs the invocations for a group of invocations.
	 *
	 * @method invokeGroup
	 * @param  {[type]} invocations [description]
	 * @return {[type]}             [description]
	 */
	function invokeGroup(invocations) {

		var deferred = q.defer();

		_q.mapValues(invocations, invokeSingle, this)
			.done(_.bind(function (results) {

				// assign results to the archetypo object
				this.assign(results);

				deferred.resolve();
			}, this));

		return deferred.promise;
	}


	/**
	 *
	 * Evaluates the invocations parsed from the el into modules.
	 * Returns a promise for all properties evaluated.
	 *
	 * @method archInvoke
	 * @private
	 */
	module.exports = function archInvoke(invocations) {

		var deferred = q.defer();

		// [1] get priority numbers and sort them
		//     undefined priorities get sorted to the end of the array
		//     as a default behaviour of Array.sort.
		var priorities = _.unique(_.pluck(invocations, 'priority')).sort(function (a, b) {
			return a - b;
		});

		// [2] group invocations into priority groups
		var priorityGroups = _.map(priorities, function (priority) {

			return _.pick(invocations, function (d, k) {
				return d.priority === priority;
			});
		});

		// [3] run invocations by group
		_q.each(priorityGroups, invokeGroup, this)
			.done(function () {
				deferred.resolve();
			});

		return deferred.promise;
	};
});

define('__archetypo/build/evaluate/index',['require','exports','module','lodash','q','jquery-meta-data','../../parse/value','./invoke'],function (require, exports, module) {
	

	var _              = require('lodash'),
		q              = require('q'),
		jqueryMetaData = require('jquery-meta-data');

		// parse the value string into { evaluator: 'evaluator', value: 'value'}
	var parseArchValue = require('../../parse/value'),
		// invoke methods
		archInvoke     = require('./invoke');

	/**
	 *
	 * Evaluates the data parsed from the el into modules.
	 * Returns a promise for all properties evaluated.
	 *
	 * @method archEvaluate
	 * @private
	 */
	module.exports = function archEvaluate() {

		var deferred = q.defer();

		// [1] get the arch-meta-data
		var data = this.el.metaData({
			prefix:  'arch',
			parse:   parseArchValue,
	//		replace: true,
		});

		// [2] set literal data properties
		var literals = _.pick(data, function (d) {
			return d.type === 'literal';
		});
		this.assign(literals);

		// [3] invoke methods
		var invocations = _.pick(data, function (d) {
			return d.type === 'invocation';
		});

		archInvoke.call(this, invocations).done(function () {
			deferred.resolve();
		});

		// [4] return the promise
		return deferred.promise;
	};
});

define('__archetypo/build/sub/index',['require','exports','module','q','_q','jquery'],function (require, exports, module) {
	

	var q  = require('q'),
		_q = require('_q'),
		$  = require('jquery');

	/**
	 * Checks whether there are sub archetypos to build.
	 * @return {[type]} [description]
	 */
	module.exports = function archSubs() {
		var deferred = q.defer();

		// [1]
		// find all elements within this element
		// that have an 'data-archetypo' attribute defined.
		var subEls = this.el.find('[data-archetypo]');

		// [2]
		// Instantiate the sub-views
		_q.map(subEls, function (el) {

			el = $(el);

			var elArchetypo = el.data('archetypo');

			// [0] check if the element already has an archetypo
			//     and only build if it has NOT
			if (!elArchetypo) {

				var subArchetypo = this.createSubArchetypo({ el: el });

				// return the promise
				return subArchetypo.done;
			} else {
				return elArchetypo.done;
			}

		}, this)
			.done(function () {

				// resolve with 0 arguments.
				deferred.resolve();
			});

		// [4] return the promise
		return deferred.promise;
	};
});

define('__archetypo/methods/require',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');

	function archRequire(modname) {

		var deferred = q.defer();

		require([modname], deferred.resolve);

		return deferred.promise;
	}

	function archRequireFn(modname, args) {

		return this.require(modname).then(_.bind(function (fn) {
			return this.partial(fn, args);

		}, this));

	}

	exports.require = archRequire;
	exports.requireFn = archRequireFn;
});

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define('archetypo',['require','exports','module','lodash','jquery','scope','q','./__archetypo/build/evaluate/index','./__archetypo/build/sub/index','./__archetypo/methods/require'],function (require, exports, module) {
	

	var _              = require('lodash'),
		$              = require('jquery'),
		scope          = require('scope'),
		q              = require('q');


		// reads and evaluates the data asynchronously
	var archEvaluate   = require('./__archetypo/build/evaluate/index'),
		// builds sub
		archSub    = require('./__archetypo/build/sub/index');


	var archetypo = module.exports = scope.extend({

		/**
		 *
		 * @method initialize
		 * @param properties {Object}
		 *
		 */
		initialize: function initialize() {
			// scope initialize will assign all properties
			// of the first argument to the 'this' object.
			scope.prototype.initialize.apply(this, arguments);

			this.initializeArchetypo();
		},

		initializeArchetypo: function initializeArchetypo() {

			// replace the original archetypo value with
			// the archetypo object.
			this.el.data('archetypo', this);

			// [1] get reference to the el.
			var el = this.el;
			if (!el) { throw new Error('No el on archetypo.'); }

			// [2] create a deferred object to
			//     be resolved only when this archetypo is completely built.
			var deferred = q.defer();
			this.done = deferred.promise;

			// [3] read and evaluate the data using the scope methods
			archEvaluate.call(this)
				.then(_.bind(archSub, this))
				.done(_.partial(deferred.resolve, this));
		},

		createSubArchetypo: function createSubArchetypo(data) {

			var subArchetypo = this.create(data);

			subArchetypo.initializeArchetypo();

			return subArchetypo;
		},

		/**
		 * Options for the jquery-meta-data reader.
		 *
		 * @property jqMetaDataOptions
		 * @type Object
		 */
		jqMetaDataOptions: {
			prefix:  'arch',
		//	parse:   parseArchValue,
			replace: true,
		},

	}, { enumerable: false });

	// methods related to require
	archetypo.assignProto(require('./__archetypo/methods/require'));


});

