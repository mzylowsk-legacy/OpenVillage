'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        openvillage: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= openvillage.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/**/*.js'
            ]
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= openvillage.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= openvillage.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= openvillage.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= openvillage.dist %>/{,*/}*',
                        '!<%= openvillage.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= openvillage.app %>',
                        dest: '<%= openvillage.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= openvillage.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= openvillage.dist %>'
                    },
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= openvillage.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= openvillage.dist %>/scripts/{,*/}*.js',
                    '<%= openvillage.dist %>/styles/{,*/}*.css',
                    '<%= openvillage.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= openvillage.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= openvillage.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);
    
    // Default dev grunt task
    grunt.registerTask('default', [
        'jshint:all',
        'live'
      ]);

    // Run build version of app
    grunt.registerTask('server', [
        'jshint:all',
        'build',
        'connect:dist:keepalive'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'jshint:all',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

};
