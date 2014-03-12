define(function (require, exports, module) {

	var backbone = require('lowercase-backbone');

	module.exports = backbone.collection([
		{ id: 0, name: 'Banana', color: 'yellow' },
		{ id: 1, name: 'Strawberry', color: 'red' },
		{ id: 2, name: 'Watermelon', color: 'green' }
	]);

});
