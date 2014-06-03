define(function (require, exports, module) {
	'use strict';

	var _  = require('lodash'),
		q  = require('q'),
		_q = require('_q');

	var invoke = require('./invoke');

	/**
	 * @method evaluateGroup
	 * @param  {[type]} raw [description]
	 * @return {[type]}             [description]
	 */
	function evaluateGroup(scope, raw) {

		// [2] set value raw properties
		var values = _.reduce(raw, function (res, d, key) {
			if (d.type === 'value') {
				// if the type of the value is 'value',
				// evaluate the value.
				res[key] = scope.evaluate(d.value);
			}

			return res;

		}, {});
		scope.assign(values);

		// [3] invoke methods
		var invocations = _.pick(raw, function (d) {
			return d.type === 'invocation';
		});

		return _q.mapValues(invocations, function (invocation, key) {

				// invoke using the scope.
				return invoke(scope, invocation, key);

			})
			// after invocations are done,
			// assign their results to the scope.
			.then(function (results) {

				// assign results to the archetypo object
				scope.assign(results);

				// return scope as response.
				return scope;
			});
	}


	/**
	 * EVALUATION ORDER
	 *
	 * [1] PRIORITAIRE EVALUATED VALUES
	 *     Values that are evaluated (prefixed by "method:") and
	 *     prefixed by ! (or 0!, 1!, *!)
	 *
	 * [2] NON-EVALUATED VALUES
	 *     Values not prefixed by "method:" are first evaluated,
	 *     thus they cannot reference values on the same scope,
	 *     only those on parent scopes (inherited)
	 *
	 * [3] NON-PRIORITAIRE EVALUATED VALUES
	 *     Values that are evaluated (prefixed by "method:") and
	 *     not prefixed by !
	 */



	function parseEvaluationGroups(scope, raw) {
		// [1] get priority numbers and sort them
		//     undefined priorities get sorted to the end of the array
		//     as a default behaviour of Array.sort.
		var priorities = _.unique(_.pluck(raw, 'priority')).sort(function (a, b) {
			return a - b;
		});

		// [2] create evaluation methods to be run according to priority
		var evaluationGroups = _.map(priorities, function (priority) {

			var group = _.pick(raw, function (d, k) {
				return d.priority === priority;
			});

			// return a bound AND partialized function
			return _.partial(evaluateGroup, scope, group);
		});

		return evaluationGroups;
	}

	/**
	 * [evaluateGroups description]
	 * @param  {[type]} groups [description]
	 * @return {[type]}        [description]
	 */
	function evaluateGroups(groups) {
		// return promise for own evaluation to be done.
		return _.reduce(groups, function (sofar, next, index) {
			return sofar.then(next);
		}, q());
	}

	/**
	 *
	 * Evaluates the data parsed from the el into modules.
	 * Returns a promise for all properties evaluated.
	 *
	 * @method archEvaluate
	 * @private
	 */
	module.exports = function archEvaluate($parent, scope, raw) {

		// parse out the evaluation order and groupings
		var evaluationGroups = parseEvaluationGroups(scope, raw);


		// create a var to hold the promise for the parente evaluation ready
		var parentEvaluation = $parent ?
			// get the parent evaluation promise
			$parent.data('archetypo-evaluation-promise') :
			// immediately resolved promise
			q(true);

		// [3] run evaluations by group in sequence
		return parentEvaluation.then(_.partial(evaluateGroups, evaluationGroups));
	};
});
