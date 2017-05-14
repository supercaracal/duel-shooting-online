module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['frontend/vendor/*.js', 'frontend/**/base/*.js', 'frontend/**/abstract/*.js', 'frontend/**/*.js'],
        dest: 'assets/javascripts/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true,
        sourceMapName: 'assets/javascripts/source.map'
      },
      dist: {
        files: { 'assets/javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, cwd: 'assets/images', src: ['favicon.ico', 'ogp-img.gif', 'apple-touch-icon-precomposed.gif'], dest: 'docs/' },
          { expand: true, flatten: true, cwd: 'assets/javascripts', src: ['duel-shooting-online.min.js', 'duel-shooting-online.js', 'source.map'], dest: 'docs/' },
          { expand: true, flatten: true, cwd: 'assets/stylesheets', src: ['style.css'], dest: 'docs/' }
        ]
      }
    },
    watch: {
      files: ['Gruntfile.js', 'frontend/**/*.js'],
      tasks: ['concat', 'uglify', 'copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('minify', ['concat', 'uglify', 'copy']);
};
