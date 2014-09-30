// Generated on 2014-01-13 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.registerMultiTask('echoMessage', 'Echo message', function () {
      grunt.log.writeln(grunt.log.wordlist([this.data], {color: 'yellow'}));
  });
  
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
//      test: {
//        options: {
//          jshintrc: 'test/.jshintrc'
//        },
//        src: ['test/spec/{,*/}*.js']
//      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '*.wgt'
          ]
        }]
      },
      // cleans cdnified and test components
      deploy: {
          src: [
              '<%= yeoman.dist %>/bower_components/angular',
              '<%= yeoman.dist %>/bower_components/angular-resource',
              '<%= yeoman.dist %>/bower_components/jquery',
              '<%= yeoman.dist %>/bower_components/bootstrap'
          ]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },
    
    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'config.xml'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/worldstate-analysis-widgets/dist/images',
          src: '*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
    // we do this since the grunt-google-cdn plugin is stale, quick and dirty
    replace: {
        cdnify: {
            src: ['<%= yeoman.dist %>/index.html'],
            dest: ['<%= yeoman.dist %>/index.html'],
            replacements: [
                {from: 'bower_components/bootstrap/dist/css/bootstrap.css', to: '//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css'},
                {from: 'bower_components/jquery/dist/jquery.js', to: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'},
                {from: 'bower_components/angular/angular.js', to: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js'},
                {from: 'bower_components/angular-resource/angular-resource.js', to: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-resource.min.js'},
                // mixed opinion on this topic (replace bower dep with min on dist creation), but no solution
                {from: 'bower_components/icmm_js/dist/scripts/icmm_js.js', to: 'bower_components/icmm_js/dist/scripts/icmm_js.min.js'},
                {from: 'bower_components/worldstate-analysis-widgets/dist/scripts/worldstate-analysis-widget.js', to: 'bower_components/worldstate-analysis-widgets/dist/scripts/worldstate-analysis-widget.min.js'},
                {from: 'bower_components/worldstate-analysis-widgets/dist/styles/worldstate-analysis-widget.css', to: 'bower_components/worldstate-analysis-widgets/dist/styles/worldstate-analysis-widget.min.css'},
                {from: /<script src=('|")bower_components\/.+-tpl\.js('|")><\/script>/g, to: ''}
            ]
        },
        // we would like to use uglify but its dead code removal won't find the debug statements as they don't use a 
        // global var but an injected one, maybe reconsider debug config in the future
        debugCode: {
            // this is the concatenated file
            src: ['.tmp/concat/scripts/worldstate-analysis-widgets-wirecloud.min.js'],
            dest: ['.tmp/concat/scripts/worldstate-analysis-widgets-wirecloud.min.js'],
            replacements: [
                // unfortunately we cannot simply match opening { and count other opening { and then match the last closing one
                // if this is needed some time in the future, we have to match everything and process the text in a to-function
                // 
                {from: /if\s*\(\s*DEBUG\s*\)\s*\{\s*console\s*\.\s*log\s*\(\s*('|").*\1??\s*\)\s*;?\s*\}/g, to: ''}
            ]
        },
        incrementBuildNo: {
            src: ['<%= yeoman.app %>/config.xml'],
            dest: ['<%= yeoman.app %>/config.xml'],
            replacements: [
                { from: /\d+(?=\<\/Version>)/g, to: function (match) { return parseInt(match) + 1; } }
            ]
        }
    },
    echoMessage: {
        message: 'REMEMBER TO UPDATE REPLACE AND CLEAN TASKS IF BOWER DEPS ARE CHANGED!'
    },
    compress: {
        main: {
         options: {
                mode: 'zip',
                archive: 'worldstate-analysis-widgets-wirecloud.min.wgt'
         },
         files: [
                {expand: true, src: '**/*', cwd: 'dist'}
         ]
        },      
        nomin: {
         options: {
                mode: 'zip',
                archive: 'worldstate-analysis-widgets-wirecloud.wgt'
         },
         files: [
                {expand: true, src: '**/*', cwd: 'app'}
         ]
        }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
     uglify: {
       options: {
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        }
      }
     }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
//    karma: {
//      unit: {
//        configFile: 'karma.conf.js',
//        singleRun: true
//      }
//    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    // does not work satisfactory
//    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'replace:incrementBuildNo',
    'copy:dist',
//    'cdnify',
    'replace:cdnify',
    'clean:deploy',
    'replace:debugCode',
//    'cssmin',
    'uglify',
//    'rev',
    'usemin',
    'htmlmin',
    'compress',
    'echoMessage'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
//    'test',
    'build'
  ]);
};
