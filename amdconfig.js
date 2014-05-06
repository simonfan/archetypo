require.config({
	urlArgs: 'bust=0.8728536725975573',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		archetypo: 'index',
		'archetypo-view': '../bower_components/archetypo-view/built/archetypo-view',
		'backbone.collection.lazy': '../bower_components/backbone.collection.lazy/built/backbone.collection.lazy',
		'backbone.collection.queryable': '../bower_components/backbone.collection.queryable/built/backbone.collection.queryable',
		'backbone.model.tree': '../bower_components/backbone.model.tree/built/backbone.model.tree',
		backbone: '../bower_components/backbone/backbone',
		containers: '../bower_components/containers/built/containers',
		deep: '../bower_components/deep/built/deep',
		itr: '../bower_components/itr/built/itr',
		jquery: '../bower_components/jquery/dist/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		'object-query': '../bower_components/object-query/built/object-query',
		q: '../bower_components/q/q',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore',
		lazy: '../bower_components/lazy.js/lazy',
		'collection-dock': '../bower_components/collection-dock/built/collection-dock',
		'dockable-view': '../bower_components/dockable-view/built/dockable-view',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		'model-dock': '../bower_components/model-dock/built/model-dock',
		'archetypo-router': '../bower_components/archetypo-router/built/archetypo-router',
		_q: '../bower_components/_q/built/_q',
		parseArchData: '__archetypo/data/parse',
		processArchData: '__archetypo/data/process/index',
		property: '__archetypo/data/process/property',
		'jquery-meta-data': '../bower_components/jquery-meta-data/built/jquery-meta-data',
		scope: '../bower_components/scope/built/scope'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		},
		lazy: {
			exports: 'Lazy'
		}
	}
});
