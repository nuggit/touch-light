var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
	gulp.src('public/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/'));
});

gulp.task('watch', function () {
	gulp.watch('public/*.scss', ['default']);
});