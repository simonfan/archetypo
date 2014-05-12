/**
 * AMD module.
 *
 * @module archetypo
 */

define(function (require, exports, module) {
	'use strict';

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
