/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var registry = require('../../registry/index');

	module.exports = function register(options) {

		options = options || {};

		// [1] retrieve data that will identify this view
		var data = this.elData() || {};
		// id
		data.id = data.id || data.archId || this.cid;
		// item
		data.item = this;

		// [2] ancestorView
		this.ancestorView = options.ancestorView || false;

		// [2] get registry object
		if (this.ancestorView) {
			this.registry = this.ancestorView.registry.addBranch(data);
		} else {
			this.registry = registry(data);
		}
	};

});
