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

	var _              = require('lodash'),
		$              = require('jquery'),
		scope          = require('scope'),
		q              = require('q');


		// reads and evaluates the data asynchronously
	var archRead   = require('./__archetypo/build/read/index'),
		// invokes whatever needs to be invoked asynchronously
		archInvoke = require('./__archetypo/build/invoke/index'),
		// builds sub
		archSub    = require('./__archetypo/build/sub/index');


	var archetypo = scope.extend({

		/**
		 *
		 * @method initialize
		 * @param properties {Object}
		 *
		 */
		initialize: function initializeArchetypo(properties) {
			// scope initialize will assign all properties
			// of the first argument to the 'this' object.
			scope.prototype.initialize.apply(this, arguments);


			// [1] get reference to the el.
			var el = this.el;
			if (!el) { throw new Error('No el on archetypo.'); }

			// [2] create a deferred object to
			//     be resolved only when this archetypo is completely built.
			var deferred = q.defer();
			this.done = deferred.promise;

			// [3] read and evaluate the data using the scope methods
			archRead.call(this)
				.then(_.bind(archInvoke, this))
				.then(_.bind(archSub, this))
				.done(_.bind(function () {

					// replace the original archetypo value with
					// the archetypo object.
					this.el.data('archetypo', this);

					// resolve with the archetypo
					deferred.resolve(this);

				}, this));

		},

		/**
		 * Options for the jquery-meta-data reader.
		 *
		 * @property jqMetaDataOptions
		 * @type Object
		 */
		jqMetaDataOptions: {
			prefix:  'arch',
			parse:   parseArchValue,
			replace: true,
		},

	}, { enumerable: false });

	// methods related to require
	archetypo.assignProto(require('./__archetypo/methods/require'));


});
