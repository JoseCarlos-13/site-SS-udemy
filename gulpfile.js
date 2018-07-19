var gulp   = require ('gulp')/**/       
	, sass = require ('gulp-sass')/**/
	, include = require ('gulp-file-include')/*reutiliza codigos e estilos*/
	, autoprefixer = require ('gulp-autoprefixer')/*inclui os prefixos automaticamente onde precisam-se deles*/
	, uncss = require ('gulp-uncss')/**/
	, clean = require ('gulp-clean')/*limpa arquivos de determinada pasta*/
	, concat = require ('gulp-concat')/*unifica dois ou mais arquivos em um só*/
	, uglify = require ('gulp-uglify')/*minifica arquivos JS*/
	, cssnano = require ('gulp-cssnano')/*minifica arquivos CSS*/
	, rename = require ('gulp-rename')/**/
	, imagemin = require ('gulp-imagemin')/**/
	, browserSync = require ('browser-sync')/*abre e atualiza automaticamente o projeto no browser*/;

	/*transofrmação de arquivos scss em css*/
	gulp.task('sass', function(){
	return gulp.src('./src/sass/**/*.scss')
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
	return gulp.src(['src/components/bootstrap/dist/**/*', 
					'src/components/bootstrap/dist/fonts/**/*', 
					'src/components/bootstrap/dist/js/**/*',
					'src/components/font-awesome/css/**/*',
					'src/components/font-awesome/fonts/**/*',
					'src/css/**/*'], {"base": 'src'})
			.pipe(gulp.dest('dist'))
	})

	gulp.task('svgmin', function(){
		return gulp.src(['./src/inc/icons/*.svg', '!src/inc/icons/*.min.svg'])
				.pipe(imagemin())
				.pipe(rename({
					suffix:'.min'
				}))
				.pipe(gulp.dest('./src/inc/icons/'))

	})

	gulp.task('imagemin', function(){
		return gulp.src('./src/imagens/**/*')
				.pipe(imagemin())
				.pipe(gulp.dest('./dist/imagens/'))
	})

	/*unificação e minificação de arquivos JS*/
	gulp.task('build-js', function(){
		gulp.src('src/javascript/**/*')
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/javascript/'))
	})

	gulp.task('default', ['copy'], function(){
		gulp.start('uncss', 'imagemin', 'sass', 'build-js')
	})

	/*copiar o arquivos html com os includes visiveis*/
	gulp.task('html', function(){
		return gulp.src([
			'./src/**/*.html',
			'!src/inc/**'
			])
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
	gulp.task('server', function(){
		browserSync.init({
			server: {
				baseDir: 'dist'
			}
		})
		
		/*monitoramento de arquivos*/
		gulp.watch('./src/sass/**/*.scss', ['sass'])
		gulp.watch('./dist/**/*').on('change', browserSync.reload)
		gulp.watch('./src/**/*.html', ['html'])
		gulp.watch('src/javascript/**/*', ['build-js'])
		gulp.watch([
			'src/inc/icons/*.svg',
			'!src/inc/icons/*.min.svg'
			], ['svgmin'])
	})