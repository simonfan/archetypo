define(function (require, exports, module) {

	var archScope = require('../arch-scope/index'),
		aux       = require('../auxiliary');

	module.exports = function buildArchScope($el, options, scopeData) {

		// the scope always has the el as property.
		var scopeData = scopeData || {};
		scopeData.el = $el;

		var scope;

		// check if there is a parent archetypo el
		var $parent = aux.closestAncestor($el, options.selector);

		if (!$parent || $parent.length === 0) {
			// this is root
			scope = archScope(scopeData);
		} else {
			// this is a branch
			scope = $parent.data('archetypo').create(scopeData);
		}

		$el.data('archetypo', scope);

		return scope;
	};
});
