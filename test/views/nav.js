define(function (require, exports, module) {


	module.exports = function navView(scope) {

		scope.remoteOptions.should.eql({ option1: 'remote-value' });

		this.invocations.navView += 1;

		return {};

	};

});
