/**
Gruntfile designed for browser-only modules.
*/

module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			default: {
				options: {
					hostname: 'localhost',
					port: 8000,
					keepalive: true,
					livereload: true,
					open: 'http://localhost:8000',
				}
			},
		},

		bower: {
			target: {
				rjsConfig: 'amdconfig.js',
				options: {
					baseUrl: './src'
				}
			}
		},

		simplemocha: {
			options: {
			//	globals: ['should'],
				timeout: 3000,
				ignoreLeaks: false,
			//	grep: '*-test',
				ui: 'bdd',
				reporter: 'dot'
			},

			all: { src: ['test/*.js'] }
		},

		yuidoc: {
			compile: {
				name: 'archetypo',
				version: '0.0.0',
			//	description: '',
			// 	url: '',
				options: {
					paths: 'src/',
				//	themedir: 'path/to/custom/theme/',
					outdir: 'docs/'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				force: true,
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},

			// tests
			test: {
				src: ['test/**/*.js']
			},

			// src
			src: {
				src: ['src/**/*.js']
			}
		},

		concurrent: {
			target: ['connect', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},

		watch: {
			live: {
				files: ['amdconfig.js', 'src/**/*.js', 'test/**', 'demo/**', 'docs/**', 'Gruntfile.js'],
				options: {
					livereload: true
				},
				tasks: ['jshint:gruntfile', 'jshint:src']
			},

			bower: {
				files: ['bower.json'],
				tasks: ['bower']
			}
		},

		requirejs: {
			// run r.js to generate a single file as the output
			// minifying and inlining all dependencies.
			file: {
				options: {
					// base url where to look for module files
					// and relative to which the module paths will be defined
					// (must coincide with that defined in mainConfigFile)
					baseUrl: './src',
					// module name
					name: 'archetypo',
					// output here
					out: './built/archetypo.js',
					// config file
					mainConfigFile: 'amdconfig.js',

					// include these modules
					include: [],

					// exclude these modules AND their dependencies
					// (excluding your bower dependencies)
					exclude: ["lodash", "jquery", "q", "_q", "scope", "subject", "jquery-meta-data", "deep"],

					// excludeShallow
					excludeShallow: [],

					optimize: 'uglify2',

					pragmas: {
						exclude: true,
					},
				}
			},

			// with all dependencies
			full: {
				options: {
					// base url where to look for module files
					// and relative to which the module paths will be defined
					// (must coincide with that defined in mainConfigFile)
					baseUrl: './src',
					// module name
					name: 'archetypo',
					// output here
					out: './built/archetypo.full.js',
					// config file
					mainConfigFile: 'amdconfig.js',

					// include these modules
					include: ["requirejs"],

					// exclude these modules AND their dependencies
					// (excluding your bower dependencies)
				//	exclude: ["lodash", "jquery", "q", "_q", "scope", "subject", "jquery-meta-data"],

					// excludeShallow
					excludeShallow: [],

					optimize: 'uglify2',

					pragmas: {
						exclude: true,
					},
				}
			},

			dev: {
				options: {
					// base url where to look for module files
					// and relative to which the module paths will be defined
					// (must coincide with that defined in mainConfigFile)
					baseUrl: './src',
					// module name
					name: 'archetypo',
					// output here
					out: './built/archetypo.dev.js',
					// config file
					mainConfigFile: 'amdconfig.js',

					// include these modules
					include: [],

					// exclude these modules AND their dependencies
					// (excluding your bower dependencies)
					exclude: ["lodash", "jquery", "q", "_q", "scope", "subject", "jquery-meta-data", "deep"],

					// excludeShallow
					excludeShallow: [],

					optimize: 'none',

					pragmas: {
						exclude: true,
					},
				}
			},
		}
	});

	/**
	 * Task loading
	 */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.loadNpmTasks('grunt-bower-requirejs');
	/**
	Gets dependencies from bower.json and puts them into the require.js
	configuration script (amdconfig.js).
	*/

	grunt.loadNpmTasks('grunt-simple-mocha');


	// mocha tests
	grunt.registerTask('mocha', 'simplemocha');

	grunt.registerTask('default', ['bower', 'yuidoc', 'jshint:gruntfile', 'jshint:src', 'requirejs:file', 'requirejs:dev', 'concurrent']);
};
