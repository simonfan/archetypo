define(function (require, exports, module) {


	var data = require('/test/sub-archetypo/data.js');


	var invocationCount = 0;

	module.exports = function someOtherItemView(options) {

		invocationCount += 1;


		// check that data is an option
		options.data.should.be.type('object');

		console.log('someOtherItemView invoked');
		console.log(options);


		// ONLY CALL DONE WHEN ALL THE ITEMS HAVE BEEN RENDERED
		if (invocationCount === data.length) {
			options.testdone()
		}

	};
})
