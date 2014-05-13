define(function (require, exports, module) {
	'use strict';

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
