var gulp 	    	= require('gulp'),
		prefixer  	= require('gulp-autoprefixer'),
		sass 	    = require('gulp-sass'),
		rigger      = require('gulp-rigger'),
		watch       = require('gulp-watch'),
		rimraf      = require('rimraf'),
		browserSync = require('browser-sync'),
		reload 			= browserSync.reload;

var projectName = 'rusnovil.ru';
var path = {
			build: {
				html: projectName + '/',
				js: projectName + '/js/',
				css: projectName + '/css/',
				img: projectName + '/img/',
				fonts: projectName + '/fonts/'
			},
			src: {
				html: 'src/*.html',
				js: 'src/js/*.js',
				sass: 'src/style/*.scss',
        css: 'src/style/*.css',
				img: 'src/img/**/*.*',
				fonts: 'src/fonts/**/*.*'
			},
			watch: {
				html: 'src/**/*.html',
				js: 'src/js/**/*.js',
				style: 'src/style/**/*.*',
				img: 'src/img/**/*.*',
				fonts: 'src/fonts/**/*.*'
			},
			clear: './build'
};
var config = {
	server: {
		baseDir: "./" + projectName
	},
	host: 'localhost',
	port: 9000,
	logPrefix: "Frontend_BerTepesh"
};

gulp.task('html:build', function(){
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});
gulp.task('js:build', function(){
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});
gulp.task('css:build', function(){
  gulp.src(path.src.css)
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('sass:build', function(){
  gulp.src(path.src.sass)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('image:build', function(){
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
  'html:build',
  'js:build',
  'css:build',
  'sass:build',
  'fonts:build',
  'image:build'
]);
gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('css:build');
    gulp.start('sass:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});
gulp.task('webserver', function () {
  browserSync(config);
});
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});
gulp.task('default', ['build', 'webserver', 'watch']);