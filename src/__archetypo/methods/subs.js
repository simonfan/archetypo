define(function (require, exports, module) {
	'use strict';

	var q  = require('q'),
		_q = require('_q'),
		$  = require('jquery');


	function buildSubEl(el) {

		var $el = $(el);

		// [0] check if the element already has an archetypo
		//     and only build if it has NOT
		var arch = $el.data('archetypo');


		if (!arch) {

			// [1] if NO archetypo is found,
			// create a new archetypo

			// [1.1] find the closest ancestor that has an archetypo object
			var $ancestor = $el.parent().closest(this.archSelector),
				// the ancestor archetypo
				ancestor  = $ancestor.data('archetypo');

			if (!ancestor) {
				throw new Error('No ancestor for sub-archetypo.');
			}

			// [1.2] create an archetypo object using
			//       the ancestor's archetypo .create() method
			//       and passing this 'el' as parameter.
			arch = ancestor.create({ el: $el });
		}


		// always return promise
		return arch.promise;
	}

	/**
	 * Checks whether there are sub archetypos to build.
	 * @return {q promise} [description]
	 */
	exports.archSubs = function archSubs() {
		// [1]
		// find all elements within this element
		// that are selected by the archSelector defined on the scope
		var $subEls = this.el.find(this.archSelector);

		// [2]
		// Instantiate the sub-views
		var buildElsRes = _.map($subEls, buildSubEl, this);

		// [3]
		// Reference to arch object,
		// to return the archetypo object on promise solution.
		var arch = this;

		var subsPromise = q.all(buildElsRes).then(function () {
			return arch;
		});

		// [4] handle errors
		subsPromise.fail(this.error);

		return subsPromise;
	};
});
