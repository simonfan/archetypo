define(function (require, exports, module) {

	var _ = require('lodash'),
		$ = require('jquery');

	module.exports = function collectionView(options) {


		this.$el = options.el;

		console.log('collectionView invoked')

		var $collectionEl = options.el,
			itemView      = options.itemView;

		_.each(options.items, function (item) {

			var $itemHTML = $(options.itemTemplate);

			// append item html to the collection html
			$itemHTML.appendTo($collectionEl);

			// invoke the item view
			itemView({
				el            : $itemHTML,
				collectionView: this,
				data          : item
			});


		}, this);

	};
})
