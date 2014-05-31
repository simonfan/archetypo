define(function (require, exports, module) {

	var _ = require('lodash');

	module.exports = function logger() {

		_.each(arguments, function (arg) {
			console.log(arg);
		});
	};

});
