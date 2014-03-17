/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var registry = require('../../registry/index');

	module.exports = function render(options) {

		// [1] retrieve data that will identify this view
		var data = this.$el.data();
		data.id = this.cid;
		data.item = this;


		// [2] ancestorView
		this.ancestorView = options.ancestorView || false;

		// [2] get registry object
		this.registry = this.ancestorView ?
			this.ancestorView.registry.addBranch(data) :
			registry(data);
	};

});
