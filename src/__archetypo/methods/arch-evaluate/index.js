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
	function evaluateGroup(raw) {

		var deferred = q.defer();

		// [2] set value raw properties
		var values = _.reduce(raw, function (res, d, key) {

			if (d.type === 'value') {
				// if the type of the value is 'value',
				// evaluate the value.
				res[key] = this.evaluate(d.value);
			}

			return res;

		}, {}, this);
		this.assign(values);

		// [3] invoke methods
		var invocations = _.pick(raw, function (d) {
			return d.type === 'invocation';
		});

		_q.mapValues(invocations, invoke, this)
			.done(_.bind(function (results) {

				// assign results to the archetypo object
				this.assign(results);

				deferred.resolve();
			}, this));

		return deferred.promise;
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

	/**
	 *
	 * Evaluates the data parsed from the el into modules.
	 * Returns a promise for all properties evaluated.
	 *
	 * @method archEvaluate
	 * @private
	 */
	exports.archEvaluate = function archEvaluate(raw) {

		var deferred = q.defer();

		// [1] get priority numbers and sort them
		//     undefined priorities get sorted to the end of the array
		//     as a default behaviour of Array.sort.
		var priorities = _.unique(_.pluck(raw, 'priority')).sort(function (a, b) {
			return a - b;
		});

		// [2] group evaluations into priority groups
		var priorityGroups = _.map(priorities, function (priority) {

			return _.pick(raw, function (d, k) {
				return d.priority === priority;
			});
		});

		// [3] run evaluations by group
		_q.each(priorityGroups, evaluateGroup, this)
			.done(_.partial(deferred.resolve, this));

		return deferred.promise;
	};
});
