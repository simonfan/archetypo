define(function (require, exports, module) {

	var archScope = require('../arch-scope/index'),
		aux       = require('../auxiliary');

	module.exports = function buildArchScope($parent, $el, options, scopeData) {

		// the scope always has the el as property.
		var scopeData = scopeData || {};
		scopeData.el = $el;

		var scope;

		if (!$parent || $parent.length === 0) {
			// this is root
			scope = archScope(scopeData);
		} else {
			// this is a branch
			scope = $parent.data('archetypo').create(scopeData);
		}

		return scope;
	};
});
