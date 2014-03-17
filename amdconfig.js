require.config({
	urlArgs: 'bust=0.8728536725975573',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		archetypo: 'index',
		backbone: '../bower_components/backbone/backbone',
		'collection-dock': '../bower_components/collection-dock/built/collection-dock',
		'dockable-view': '../bower_components/dockable-view/built/dockable-view',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		jquery: '../bower_components/jquery/dist/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		'model-dock': '../bower_components/model-dock/built/model-dock',
		q: '../bower_components/q/q',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore',
		'backbone.collection.lazy': '../bower_components/backbone.collection.lazy/built/backbone.collection.lazy',
		'backbone.collection.queryable': '../bower_components/backbone.collection.queryable/built/backbone.collection.queryable',
		'backbone.model.tree': '../bower_components/backbone.model.tree/built/backbone.model.tree',
		deep: '../bower_components/deep/built/deep',
		itr: '../bower_components/itr/built/itr',
		containers: '../bower_components/containers/built/containers',
		'object-query': '../bower_components/object-query/built/object-query',
		lazy: '../bower_components/lazy.js/lazy'
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
