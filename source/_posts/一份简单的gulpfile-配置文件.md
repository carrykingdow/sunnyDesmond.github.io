---
title: 一份简单的gulpfile 配置文件
date: 2017-08-25 17:55:12
keywords: 一份简单的gulpfile 配置文件
tags: [gulp]
categories: "开发工具"
---
## gulp
gulp在前端开发中，是一把利器，可以帮我们完成一堆重复繁琐的工作，解放双手，提高生产力。
## 文件目录
``` html
├─html
├─img
├─js
├─lib
│  ├─css
│  ├─fonts
│  └─js
└─sass
```
## 配置文件
这边把一份自己的常用的配置文件，贴出来。未来有新需求的话，再来更新文件。
<!--more-->
```javascript
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-clean-css'),
  livereload = require('gulp-livereload'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  concat = require('gulp-concat'),
  fileinclude = require('gulp-file-include'),
  del = require('del');



// 默认路径
var paths = {
  src: 'src/',
  dist: 'dist/'
}


// 清空dist
gulp.task('clean', function(cb) {
  return del([paths.dist + "**/*"], cb);
});


// 压缩js
gulp.task('uglifyRename', function() {
  gulp.src(paths.src + 'js/*.js')
    .pipe(concat("all.js"))
    .pipe(uglify()) //压缩
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'js'))
    .pipe(livereload());

});

//编译sass并且压缩
gulp.task('sass2css', function() {
  //postcss plugin
  var plugins = [
    autoprefixer({ browsers: ['last 3 version'], cascade: false })
  ];
  gulp.src(paths.src + 'sass/*.scss')
    .pipe(sass())
    .pipe(concat("all.css"))
    .pipe(gulp.dest(paths.dist + 'css')) //输出原文件
    .pipe(postcss(plugins)) //带上厂商前缀，对相关css做兼容处理
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'css'))
    .pipe(livereload());

});

//copy html 文件
gulp.task('copyHtml', function() {
  gulp.src(paths.src + 'html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.dist + 'html'))
    .pipe(livereload());

});

//copy img 文件
gulp.task('copyImg', function() {
  gulp.src(paths.src + 'img/*.*')
    .pipe(gulp.dest(paths.dist + 'img'))
    .pipe(livereload());

})


// copy lib下的所有文件
gulp.task('copylib', function() {
  gulp.src([paths.src + 'lib/*/*.*'])
    .pipe(gulp.dest(paths.dist + 'lib/'))
    .pipe(livereload());

})



//创建监听任务
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.src + 'js/*.js', ['uglifyRename']); //监听js文件
  gulp.watch(paths.src + 'sass/*.scss', ['sass2css']); //监听 css
  gulp.watch(paths.src + 'html/*.html', ['copyHtml']); //监听html
  gulp.watch(paths.src + 'img/*.*', ['copyImg']); //监听img
  gulp.watch(paths.src + 'lib/*/*.*', ['copylib']); //监听img
});


gulp.task('build', ['watch', 'copyHtml', 'uglifyRename', 'copyImg', 'copylib', 'sass2css']);

gulp.task('default', ['build'], function() {
  console.log("--------finish all------------")
});

```
## package.json
顺便贴一下依赖
```javascript
"devDependencies": {
    "autoprefixer": "^7.1.1",
    "gulp": "^3.9.1",
    "gulp-clean-css": "^3.3.1",
    "gulp-concat": "^2.6.1",
    "gulp-livereload": "^3.8.1",
    "gulp-postcss": "^7.0.0",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^3.1.0",
    "gulp-uglify": "^2.1.2",
    "del": "^3.0.0"
  },
```
