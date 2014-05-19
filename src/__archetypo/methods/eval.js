define(function (require, exports, module) {
	'use strict';


	var evaluators = {};

	evaluators.json = JSON.parse;

	/**
	 * Alias for 'evaluate', the method available for scope evaluation.
	 * Usage:
	 * data-arch-whatever="eval({ key1: $v1, k2: $v2 })"
	 *
	 * @method eval
	 * @return {[type]} [description]
	 */
	exports.eval = function archEval(str) {

		console.log(str);
		return this.evaluate(str);
	};

	/**
	 * Evaluates a JSON formatted string
	 * Usage:
	 * data-arch-whatever="eval(json, { key1: v1, k2: v2 })"
	 *
	 * @method eval
	 * @return {[type]} [description]
	 */
	exports.json = JSON.parse;

	/*
	exports.evaluate = SCOPE EVALUATOR.
	*/
});
