define(function (require, exports, module) {


	var archetypo = require('archetypo');

	module.exports = function collectionItemView(options) {
		this.invocations.collectionItemView += 1;

		// call archetypo
		archetypo(options.el, {
			model: options.model,
		});

	};
});
