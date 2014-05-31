define(function (require, exports, module) {

	var _ = require('lodash');

	console.log('assert/index loaded')

	exports.eql = function shouldEql(v1, v2) {

		console.log('compare');
		console.log(v1);
		console.log(v2);

		v1.should.eql(v2);
	};
});
