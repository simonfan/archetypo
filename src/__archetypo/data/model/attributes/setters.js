/**
 * @module archetypo
 * @submodule model-attributes-setters
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');

	/**
	 * Set values emitting change events if required.
	 *
	 * @methos set
	 * @param attribute {String|Object}
	 * @param value {*}
	 * @param options {Object}
	 */
	exports.set = function set(attribute, value, options) {

		if (_.isString(attribute)) {

			// only set if there is a difference
			if (this.attributes[attribute] !== value) {

				// set
				this.attributes[attribute] = value;

				// trigger
				this.emit('change', this, attribute);

				this.emit('change:' + attribute, this);
			}


		} else {

			options = value;
			// loop
			_.each(attribute, _.bind(function (value, attribute) {

				this.set(attribute, value, options);

			}, this));
		}

	};

});
