module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js'],
      options: {
        predef: [ "document", "console", "$", "firebase", "FbAPI", "app", "angular"],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
     sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']        
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd:"../",
            src: [
              "index.html",
              "javascripts/**/*.js",
              "styles/**/*.css",
              "partials/**/*.html",
              "images/elanore.jpg",
              "lib/bower_components/materialize/dist/css/materialize.min.css",
              "lib/bower_components/jquery/dist/jquery.min.js",
              "lib/bower_components/materialize/dist/js/materialize.min.js",
              "lib/bower_components/angular/angular.min.js",
              "lib/bower_components/angular-route/angular-route.min.js",
              "lib/bower_components/jquery-ui/jquery-ui.min.js",
              "lib/bower_components/angular-dragdrop/src/angular-dragdrop.min.js",
              "lib/bower_components/angular-socialshare/dist/angular-socialshare.min.js",
              "lib/bower_components/materialize/dist/fonts/roboto/*"
            ],
            dest: "../public/"
        }
        ]
      }
    }
  });
  
  grunt.registerTask('default', ['sass', 'jshint', 'watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('deploy', ['copy']);
};