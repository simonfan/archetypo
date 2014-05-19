//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define(function (require, exports, module) {
	'use strict';

	var _     = require('lodash'),
		$     = require('jquery'),
		scope = require('scope'),
		q     = require('q');


		// reads and evaluates the data asynchronously
	var archEvaluate = require('./__archetypo/build/evaluate/index'),
		// builds sub
		archSub      = require('./__archetypo/build/sub/index');



	var nonEnum = { enumerable: false };

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

			this.archInit();
		},

		/**
		 * @method archInit description]
		 * @return {[type]} [description]
		 */
		archInit: function archInit() {

			// replace the original archetypo value with
			// the archetypo object.
			this.el.data('archetypo', this);

			// [1] get reference to the el.
			var el = this.el;
			if (!el) { throw new Error('No el on archetypo.'); }

			// [2] create a deferred object to
			//     be resolved only when this archetypo is completely built.
			var deferred = q.defer();
			this.promise = deferred.promise;
			this.done    = _.bind(deferred.promise.done, deferred.promise);

			// [3] read and evaluate the data using the scope methods
			archEvaluate.call(this)
				.then(_.bind(archSub, this))
				.done(_.partial(deferred.resolve, this));
		},

		/**
		 * The jquery-selector string that
		 * selects elements that are within the archetypo scope chain.
		 *
		 * @property archSelector description]
		 * @type {String}
		 */
		archSelector: '[data-archetypo]'

	}, nonEnum);

	// methods related to archetypo-creation
	archetypo.assignProto(require('./__archetypo/methods/create'), nonEnum);

	// methods related to require
	archetypo.assignProto(require('./__archetypo/methods/require'), nonEnum);

	// methods related to data reading
	archetypo.assignProto(require('./__archetypo/methods/data'), nonEnum);

	// methods related to data evaluation
	archetypo.assignProto(require('./__archetypo/methods/eval'), nonEnum);
});
