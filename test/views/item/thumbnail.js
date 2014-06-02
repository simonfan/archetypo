define(function (require, exports, module) {

	module.exports = function itemThumbnailView(options) {

		this.invocations.itemThumbnailView += 1;

		console.log(options);

		options.model.should.be.type('object');

	};
});
