define(function (require, exports, module) {

	var $ = require('jquery'),
		_ = require('lodash'),
		q = require('q');

	var buildArchData       = require('./__archetypo/build/data'),
		buildArchEvaluation = require('./__archetypo/build/evaluation/index'),
		buildArchScope      = require('./__archetypo/build/scope');

	/**
	 * Create subarchetypos.
	 *
	 * @param  {[type]} el      [description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	function buildSubArchetypos(el, options) {
		var $subEls = $(el).find(options.selector);

		var promises = _.map($subEls, function (subEl) {
			// archetypo: $el, scopeData, options
			return archetypo($(subEl), null, options);
		});

		// returns a promise for whe nall
		// sub archetypos are done
		return q.all(promises);
	}

	/**
	 * Default options for archetypo invocation.
	 * @type {Object}
	 */
	var archetypoDefaults = {
		selector : '[data-archetypo]',
	};

	/**
	 * [archetypo description]
	 * @param  {[type]} $el       [description]
	 * @param  {[type]} options   [description]
	 * @param  {[type]} scopeData [description]
	 * @return {[type]}           [description]
	 */
	function archetypo($el, scopeData, options) {

		var archPromise = $el.data('archetypo-promise');

		if (!archPromise) {
			// if no evaluation promise was set,
			// create archetypo .

			// default options
			options = options || {};
			_.defaults(options, archetypoDefaults);

			// read arch data available on this element.
			// and start build promise chain
			var archPromise = q(buildArchData($el, options))
				.then(function (archData) {
					// build the scope
					var scope = buildArchScope($el, options, scopeData);

					// set arch scope to the jquery:data:archetypo
					$el.data('archetypo', scope);

					// evaluate
					return buildArchEvaluation(scope, archData, options);
				})
				.then(function (archScope) {

					// build sub archetypos
					return buildSubArchetypos($el, options);
				})
				.then(function () {
					// resolve the archPromise with the scope of the $el
					return $el.data('archetypo');
				});

			// save the evaluation promise to the $el
			$el.data('archetypo-promise', archPromise);
		}

		// return the promise.
		return archPromise;
	};

	// methods

	/**
	 * Set the default archetypo options.
	 * @param {[type]} key   [description]
	 * @param {[type]} value [description]
	 */
	archetypo.setDefaults = function setDefaults(key, value) {

		if (_.isObject(key)) {
			_.each(key, function (value, key) {
				archetypoDefaults[key] = value;
			});
		} else {
			archetypoDefaults[key] = value;
		}
	};

	// export archetupo object
	module.exports = archetypo;

});
