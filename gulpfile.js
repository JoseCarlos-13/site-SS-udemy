var gulp   = require ('gulp')       
	, sass = require ('gulp-sass')
	, include = require ('gulp-file-include')
	, autoprefixer = require ('gulp-autoprefixer')
	, uncss = require ('gulp-uncss')
	, clean = require ('gulp-clean')
	, imagemin = require ('gulp-imagemin')
	, browserSync = require ('browser-sync');

	/*transofrmação de arquivos scss em css*/
	gulp.task('sass', function(){
		gulp.src('./src/sass/**/*.scss')
			.pipe(sass())
			.pipe(autoprefixer())
			.pipe(gulp.dest('./dist/css/'));
	})

	gulp.task('clean', function(){
	return gulp.src('dist')
			.pipe(clean());
	})

	/*copiar arquivos de uma pasta(src) para outra(dist)*/
	gulp.task('copy', ['clean'], function(){
		gulp.src(['src/components/bootstrap/dist/**/*', 
					'src/components/bootstrap/dist/fonts/**/*', 
					'src/components/bootstrap/dist/js/**/*',
					'src/components/font-awesome/css/**/*',
					'src/components/font-awesome/fonts/**/*',
					'src/css/**/*', 
					'src/javascript/**/*'], {"base": 'src'})
			.pipe(gulp.dest('dist'))
	})

	gulp.task('imagemin', function(){
		return gulp.src('./src/imagens/**/*')
				.pipe(imagemin())
				.pipe(gulp.dest('./dist/imagens/'))
				

	})

	/*copiar o arquivos html com os includes visiveis*/
	gulp.task('html', function(){
		return gulp.src('./src/**/*.html')
			.pipe(include())
			.pipe(gulp.dest('./dist/'))
	})
	
	/*verificar os arquivos html e limpar o que não está sendo utilizado neles dos arquivos css do bootstrap*/
	gulp.task('uncss', ['html'], function(){
		return gulp.src('./dist/components/**/*.css')
		.pipe(uncss({
			html: ['./dist/*.html']
		}))
		.pipe(gulp.dest('./dist/components'))
	})

	/*abrir o projeto atraves do terminal Git*/
	gulp.task('server', ['uncss', 'imagemin', 'sass', 'copy'], function(){
		browserSync.init({
			server: {
				baseDir: 'dist'
			}
		})
		
		/*monitoramento de arquivos scss*/
		gulp.watch('./src/sass/**/*.scss', ['sass'])
		gulp.watch('./dist/**/*').on('change', browserSync.reload)
		gulp.watch('./src/**/*.html', ['html'])
	})