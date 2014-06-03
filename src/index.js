define(function (require, exports, module) {

	var $ = require('jquery'),
		_ = require('lodash'),
		q = require('q');

	var buildArchData       = require('./__archetypo/build/data'),
		buildArchEvaluation = require('./__archetypo/build/evaluation/index'),
		buildArchScope      = require('./__archetypo/build/scope');

	var aux                 = require('./__archetypo/auxiliary');

	/**
	 * Create subarchetypos.
	 *
	 * @param  {[type]} el      [description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	function buildSubArchetypos($el, options) {

		var $subEls = $el.find(options.selector);

		var promises = _.map($subEls, function (subEl) {
			// archetypo: $el, scopeData, options
			archetypo($(subEl), null, options);

			return $(subEl).data('archetypo-evaluation-promise');
		});

		// returns a promise for when all
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
	 * Archetypo is a two step build process:
	 * [1] the own evaluation
	 * This promise should be done whenever the evaluation of own arch data is ready
	 *
	 *
	 * [2] the own ready and dependencies ready
	 *
	 * This promise should be done only whenever all sub archetyypos are done.
	 */

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


			// [1] get the parent
			// check if there is a parent archetypo el
			var $parent = aux.closestAncestor($el, options.selector);
			$parent = $parent.length === 1 ? $parent : false;

			// [1] get own arch data
			var archData = buildArchData($el, options);

			// [2] build scope
			var archScope = buildArchScope($parent, $el, options, scopeData);
			$el.data('archetypo', archScope);

			// [3] build evaluation promise
			var evaluation = buildArchEvaluation($parent, archScope, archData);
			$el.data('archetypo-evaluation-promise', evaluation);

			// [4] build sub archetypos only if requested to do so
			var archPromise = buildSubArchetypos($el, options).then(function () { return archScope });
			// save the arch promise to the $el
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
