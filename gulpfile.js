var gulp   = require ('gulp')       
	, sass = require ('gulp-sass'),
	browserSync = require ('browser-sync');

	/*transofrmação de arquivos scss em css*/
	gulp.task('sass', function(){
		gulp.src('./src/sass/**/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('./src/css/'));
	})

	gulp.task('server', function(){
		browserSync.init({
			server: {
				baseDir: 'src'
			}
		})
		
		/*monitoramento de arquivos scss*/
		gulp.watch('./src/sass/**/*.scss', ['sass'])
		gulp.watch('./src/css/*.css').on('change', browserSync.reload)
	})

	
	

	