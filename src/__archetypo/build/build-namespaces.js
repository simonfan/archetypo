define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

		// arch data parser
	var parseArchData = require('../data/parse'),
		// arch data processor
		processArchData = require('../data/process/index');

	/**
	 * Build-step
	 * Builds the namespaces of the archetypo object.
	 *
	 *
	 */
	module.exports = function buildNamespaces() {

		console.log('buildNamespaces invoked');
		console.log(this.scope.availableNames);

		// [0] buildNamespacesDeferred object
		var buildNamespacesDeferred = q.defer();




		// [1] get the archData
		var archData = parseArchData(this.el.data(), {
			prefix: this.prefix,
			namespaces: this.scope.availableNames
		});



		// [2] process archData
		// [2.1] build processing options
		var processingOptions = {
			context:           this.el,
			evaluator:         this.evaluator,
			processors:        this.processors,
			defaultProcessors: this.defaultProcessors,
			defaultProperties: this.defaultProperties,
		};

		// [2.2] process
		var process = processArchData(archData, processingOptions);

		// [3] when the data has been processed, create the namespaces
		process.done(_.bind(function (processedArchData) {

			// [3.1] loop through processedArchData
			//       and build a namespace for each.
			_.each(processedArchData, function (nsData, nsSlug) {
				this.scope.build(nsSlug, nsData);
			}, this);

			console.log('namespaces built')

			// resolve with no arguments
			buildNamespacesDeferred.resolve();

		}, this));


		// return promise
		return buildNamespacesDeferred.promise;
	};

});
