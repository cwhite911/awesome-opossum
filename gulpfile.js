var gulp = require('gulp'),
	bowerFiles = require('main-bower-files'),
	bower = require("gulp-bower"),
	angularFilesort = require('gulp-angular-filesort'),
	inject = require("gulp-inject"),
	concat = require('gulp-concat'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	watch = require('gulp-watch');;

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
	livereload.listen();
  gulp.watch('./app/**').on('change', livereload.changed);
});

gulp.task('inject', function(){
  return gulp.src('app/index.html')
    // inject the css files and css
    .pipe(inject(gulp.src(['./app/**/*.js','./app/**/*.css'], {read:false}), {addPrefix: 'app', relative:true}))
    // inject the js file
    // inject the bower components
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name:'bower', relative:true}))
    .pipe(gulp.dest('./app'));
});

gulp.task('serve', function () {
  nodemon({ script: 'app.js', ext: 'html js', ignore: ['./app'] })
    .on('change', ['lint','inject', 'watch'])
    .on('restart', function () {
      console.log('restarted!');
   });
});
