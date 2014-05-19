define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');


		// invoke methods
	var archInvoke = require('./invoke');

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
		var data = this.archData();

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
