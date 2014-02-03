/**
 * @module archetypo
 * @submodule model
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		eventemitter = require('../eventemitter/index');

	var model = module.exports = eventemitter.extend(function model(attributes, options) {

		// normalize params
		attributes = attributes || {};
		options = options || {};

		// call event emitter initialization.
		eventemitter.prototype.initialize.apply(this, arguments);

		// _id internal id attribute.
		this._id = _.uniqueId('model');


		// check if model is member of a collection
		if (options.collection) {
			this.collection = options.collection;
		}

		// initialize attributes
		this._initializeAttributes.apply(this, arguments);

		// initialize view sysmtem
		this._initializeView.apply(this, arguments);
	});

	/**
	 * Define proto properties
	 */
	model.proto({
		idAttribute: 'id',
		defaults: {},
	});

	model.proto(require('./attributes/index'));
	model.proto(require('./view/index'));

});
