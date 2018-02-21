var gulp   = require ('gulp')
 	, sass = require ('gulp-sass');

	/*transofrmação de arquivos scss em css*/
	gulp.task('sass', function(){
		gulp.src('./src/sass/**/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('./src/css/'));
	})

	/*monitoramento de arquivos scss*/
	gulp.task('listen', function(){
		 gulp.watch('./src/sass/**/*.scss', ['sass'])
	})