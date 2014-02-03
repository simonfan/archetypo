/**
 * Just an adapter of EventEmitter2, so that it fits as
 * an extendable subject.
 *
 * @module archetypo
 * @submodule eventemitter
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject'),
		EventEmitter2 = require('eventemitter2');

	// well... this is pretty strange, but that's how the author made it.
	// for node: EventEmitter2 is the EventEmitter2 property
	// for amd: EventEmitter2 is the module itself.
	EventEmitter2 = typeof EventEmitter2 === 'function' ? EventEmitter2 : EventEmitter2.EventEmitter2;

	var options = {
		wildcard: true,			//
		delimiter: '.',			//
		newListener: false,		// no 'newListener' event
		maxListeners: 0			// unlimited
	};

	var eventemitter = module.exports = subject(function eventemitter() {
		EventEmitter2.call(this, options);
	});

	eventemitter.proto(EventEmitter2.prototype);
});
