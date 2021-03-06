var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');

gulp.task('lint', function(){
	return gulp.src('./public/javascripts/src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', function(){
	browserify('./public/javascripts/src/app.jsx')
		.transform(reactify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('watch', function() {
	gulp.watch("public/javascripts/src/**/*.jsx", ["js"])
	gulp.watch('public/javascripts/src/*.js', ['lint']);
});

gulp.task('default', ['js','lint', 'watch']);
