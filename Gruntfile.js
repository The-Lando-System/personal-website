module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Concat configuration
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['public/**/*.js','routes/*.js','app.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		// Uglify minifier after concatination
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		// JSHint for code coverage
		jshint: {
			files: ['Gruntfile.js', 'public/javascripts/global.js', 'routes/*.js', 'app.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);


};

