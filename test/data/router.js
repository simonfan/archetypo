define(function (require, exports, module) {

	var archetypo = require('archetypo'),
		backbone  = require('lowercase-backbone');

	console.log('lazy loaded')

	module.exports = backbone.view.extend({

		initialize: function initializeContentsView(scope) {

			backbone.view.prototype.initialize.call(this, scope);

			this.listenTo(scope.router, 'route:' + scope.route, function (r) {

				console.log(r);

			});


			this.$el
				.append(scope.html)
				.css({ opacity: 0 })
				.animate({ opacity: 1 });
		},

		show: function show() {

		},

		hide: function hide() {

		},

	});
	module.exports = {
		id: 'router',
		value: 'qwe',
		anotherval: 'qewqew',
		qweqwe: 'qweqweewqe',
		qweqweqwewqeqw: 'qweqweqwwwwwwwww',
	};
})
