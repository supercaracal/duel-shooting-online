module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/base/*.js', 'js/**/abstract/*.js', 'js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true,
        sourceMapName: 'dist/source.map'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'dist/prototype.min.js': ['vendor/prototype.js']
        }
      }
    },
    watch: {
      files: ['Gruntfile.js', 'js/**/*.js'],
      tasks: ['concat', 'uglify']
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: ['favicon.ico', 'apple-touch-icon-precomposed.gif'], dest: 'docs/' },
          { expand: true, flatten: true, cwd: 'dist', src: ['prototype.min.js', 'duel-shooting.min.js', 'source.map'], dest: 'docs/' },
          { expand: true, flatten: true, cwd: 'img', src: ['ogp-img.gif'], dest: 'docs/' },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('minify', ['concat', 'uglify']);
};
