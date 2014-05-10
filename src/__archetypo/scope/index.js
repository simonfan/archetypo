/**
 * A very special object. It controls the scope of each archetypo object.
 *
 *
 * Takes into consideration
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');


	module.exports = subject({
		initialize: function initializeScope(options) {

			// reference to the parent namespaces object
			// ATTENTION: refer not to the parent archetypo object,
			//            but to the parent namespaces object.
			this.parent = options.parent;

			// hash on which scope data will be stored.
			this.data = {};

		},

		/**
		 * retrieves all modules loaded up to this scope.
		 *
		 */
		modules: function getModules() {

		},


		get: function get(key) {

			console.log('scope get ' + slug);

			var ns = this.namespaces[slug];

			if (!ns) {
				ns = this.parent.namespaces.get(slug);
			}

			return ns;
		},

		set: function set(key, value) {

		},
	});

});
