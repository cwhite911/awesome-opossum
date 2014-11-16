var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
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

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

gulp.task('serve', function () {
  nodemon({ script: 'app.js', ext: 'html js', ignore: [] })
    .on('change', ['lint', 'browserify'])
    .on('restart', function () {
      console.log('restarted!')
    })
})

// watch files for changes and reload
// gulp.task('serve', function() {
//   browserSync({
//     server: {
//       baseDir: 'app'
//     }
//   });

//   gulp.watch(['*.html', 'styles/**/*.css', 'views/*.html', 'controllers/*.js'], {cwd: 'app'}, reload);
// });