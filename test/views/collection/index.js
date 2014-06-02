define(function (require, exports, module) {


	var _ = require('lodash');

	module.exports = function collectionView(options) {

		this.invocations.collectionView += 1;

		_.each(options.collection, function (item) {

			// create the div
			var $item = $(options.itemTemplate).appendTo(options.el);

			// call the item view
			options.itemView.call(this, {
				el: $item,
				model: item,
				collectionView: this
			});

		}, this);

//		console.log('collectionView invoked')
//		console.log(options)
	};
});
