var gulp = require('gulp'),
	bowerFiles = require('main-bower-files'),
	bower = require("gulp-bower"),
	angularFilesort = require('gulp-angular-filesort'),
	inject = require("gulp-inject"),
	concat = require('gulp-concat'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint');

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// gulp.task('bower', function() {
//   return bower('./bower_components')
//     .pipe(gulp.dest('./app/bower/'))
// });

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
  nodemon({ script: 'app.js', ext: 'html js', ignore: [] })
    .on('change', ['lint','inject'])
    .on('restart', function () {
      console.log('restarted!');
   });
});
