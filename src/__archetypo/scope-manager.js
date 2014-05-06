define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');


	module.exports = subject({
		initialize: function initializeNamespaces(options) {

			// reference to the parent namespaces object
			// ATTENTION: refer not to the parent archetypo object,
			//            but to the parent namespaces object.
			this.parent = options.parent;

			this.namespaces = {};

			this.availableNames = this.parent ? _.clone(this.parent.availableNames) : [];
		},

		get: function getNamespace(slug) {

			var ns = this.namespaces[slug];

			if (!ns) {
				ns = this.parent.namespaces.get(slug);
			}

			return ns;
		},

		build: function buildNamespace(slug, data) {

			var ns;

			if (this.parent && _.isObject(this.parent.get(slug))) {
				// there is a parent namespace
				ns = _.create(this.parent.get(slug));
			} else {
				// no parent namespace
				this.availableNames.push(slug);
				ns = {};
			}

			// set data
			_.extend(ns, data);

			// save ns
			this.namespaces[slug] = ns;

			// return this
			return this;
		},
	});

});
