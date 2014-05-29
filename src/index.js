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


	// the subArchetypo build routine
	var _buildSubs      = require('./__archetypo/build/subs'),
		_childArchetypo = require('./__archetypo/child-archetypo');


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

			this.archInit()
				.then(_.bind(function () {

					var promise = _buildSubs.call(this);

					this.ready = _.bind(promise.done, promise);

				}, this));
		},

		/**
		 * @method archInit description]
		 * @return {[type]} [description]
		 */
		archInit: function archInit(noSubs) {

			// childArchetypo is always bound to this
			// archetypo object
			this.childArchetypo = _.bind(_childArchetypo, this);

			// [1] get reference to the el.
			var el = this.el;
			if (!el || el.length === 0 || !(el instanceof $)) {
				throw new Error('No el on for archetypo constructor.');
			}


			// replace the original archetypo value with
			// the archetypo object.
			this.el.data('archetypo', this);

			console.log('arch init');
			console.log(this.el.data('archetypo'));

			// [2] read and evaluate the data using the scope methods
			// [2.1] archData
			var archData = this.archData();

			// [2.2] evaluate
			var promise = this.archEvaluate(archData);

			// [2.3] build subs unless defined not to do so.
			if (!noSubs) {
				promise = promise.then(_.bind(_buildSubs, this));
			}

			// handle failures
			promise.fail(this.error);



			// [3] method to set a callback for when the promise is done.
			//     be resolved only when this archetypo is completely built.

			//     use another name, for q not to get confused about the
			//     archetypo object being a promise.
			this.promise = promise;
			this.ready   = _.bind(promise.done, promise);

			return promise;
		},

		/**
		 * The jquery-selector string that
		 * selects elements that are within the archetypo scope chain.
		 *
		 * @property archSelector description]
		 * @type {String}
		 */
		archSelector: '[data-archetypo]',


		/**
		 * The error handler to be called for any error that happens.
		 * during archetypo building.
		 *
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		error: function error(e) {
			console.log('Archetypo error handler. Override for better behaviour.')
			console.log(e.message);
			throw e;
		},

	}, nonEnum);

	// methods related to data reading
	archetypo.assignProto(require('./__archetypo/methods/data'), nonEnum);

	// methods related to data evaluation
	// this is a special evaluation, as it parses the data and runs defined invocations.
	archetypo.assignProto(require('./__archetypo/methods/arch-evaluate/index'), nonEnum);

	// methods related to archetypo-creation
	archetypo.assignProto(require('./__archetypo/methods/index'), nonEnum);


	// define a jquery plugin fn
	$.prototype.archetypo = function jqArchetypo() {

		// check if archetypo is defined on this element
		var arch = this.data('archetypo');

		if (arch) {
			return arch;
		} else {
			return archetypo({ el: this });
		}
	};
});
