var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-htmlmin');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
//var sass = require('gulp-sass');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
//新建rename（重命名）一个任务
gulp.task('rename',function(){
	//任务的执行流程
	return gulp.src('./main.html').pipe(rename('index.html')).pipe(gulp.dest('./dist'));
});

//新建压缩重命名js文件的任务
gulp.task('minifyJS',function(){
	return gulp.src('./src/js/*.js').
	pipe(uglify()).
	pipe(gulp.dest('./dist/js'));
});

//新建一个压缩html文件的任务(不压缩也可以，主要是压缩css和js)
gulp.task('minifyHTML',function(){
	return gulp.src('./src/*.html')
	.pipe(minifyhtml({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest('./dist'));
});
//操作sass文件并且压缩到dist中
gulp.task('minifySCSS',function(){
   return gulp.src("src/scss/*.scss").pipe(sass()).pipe(gulp.dest("dist/css"))
});

gulp.task('compileSCSS',function(){
   return gulp.src("src/scss/*.scss").pipe(sass()).pipe(gulp.dest("src/css"))
});
////把scss转为css文件(放在源文件中)
//gulp.task('compileSCSS',function(){
////	return sass('./src/scss/*.scss',{
////		style: 'expanded'
////	}).pipe(gulp.dest('./src/css'));
//	gulp.src("src/scss/*.scss")
//});

//压缩图片
gulp.task('minifyIMG',function(){
	return gulp.src('./src/img/*.*')
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('dist/img'));
});

// 新建重新加载reload任务
gulp.task('reload', ["minifyJS",'minifySCSS','minifyHTML','compileSCSS'], function () {
	gulp.src('./dist/myorder.html').pipe(connect.reload());
});

//创建一个默认执行的任务（在命令行窗口输入gulp就会执行这个任务）
gulp.task('default',["minifyJS",'minifySCSS','minifyHTML','compileSCSS'],function(){
	//开启服务器
	connect.server({
		livereload:true
	});

	gulp.watch(['./src/js/*.js','./src/scss/*.scss','./src/*.html','./src/scss/*.scss'],['reload']);
});
