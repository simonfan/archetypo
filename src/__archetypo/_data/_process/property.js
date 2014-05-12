define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Runs the logic for retrieving the processor function
	 *
	 *
	 */
	function retrievePropertyProcessor(propertyName, valueData, options) {


		// [1] get processor
		// [1.1] get the name of the processor.
		var processor = valueData.processor || _.find(options.defaultProcessors, function (processor, regexpStr) {
			var re = new RegExp(regexpStr);

			return re.test(propertyName);
		});


		// [2] if there is a processor defined...
		if (processor) {

			if (_.isString(processor)) {
				// [2.1] the processor defined is a string
				//       try to fetch it from the processors hash
				processor = options.processors[processor];

				// [2.1.1] throw error if no processor was found
				//         in order to make debugging (and life) easier..
				//         throw error if no processor function is found
				if (!processor) {
					throw new Error('No processor named ' + processor + ' was found. Make sure it exists');
				}

				// [2.1.2] happily return the processor :)
				return processor;

			} else {
				// [2.2] the processor defined is a function already.
				//       just return it :]
				return processor;
			}

		} else {

			// no processor
			return false;
		}

	}

	/**
	 *
	 *
	 * @method processProperty
	 * @private
	 * @param valueData {Object}
	 *     @param value {String}
	 *     @param [processor] {String|Undefined}
	 * @param propertyName {String}
	 */
	module.exports = function processProperty(propertyName, valueData, options) {

		console.log('processProperty invoked on ' + propertyName);

		// [1] build the deferred object
		var processPropertyDeferred = q.defer();


		// [2] evaluate value
		console.log(valueData.value);
		var value = options.evaluator.call(options.context, valueData.value);
		console.log('1!!!!!!!!!!!! ' + propertyName)
		console.log(value);

		// [3] get processor
		// [3.1] get the name of the processor.
		var processor = retrievePropertyProcessor.apply(this, arguments);


		// [4] if there is a processor defined,
		//     go on and do the processing
		if (processor) {

			// [4.2] invoke processor
			// [4.3] check argument length of processor
			if (processor.length === 1) {
				// [4.4] one argument
				// args: [value]
				//  ctx: options.context

				// resolve the defer IMMEDIATELY with the evaluation return value
				processPropertyDeferred.resolve(processor.call(options.context, value));

			} else if (processor.length === 2) {
				// [4.5] two arguments
				// args: [value, processPropertyDeferred.resolve]
				//  ctx: options.context

				// pass the processPropertyDeferred object to the processor
				processor.call(options.context, value, processPropertyDeferred.resolve);
			}


		} else {
			// [5] if no processor was defined,
			//     just return the value
			processPropertyDeferred.resolve(value);
		}

		// [6] always return the promise
		return processPropertyDeferred.promise;
	};
});
