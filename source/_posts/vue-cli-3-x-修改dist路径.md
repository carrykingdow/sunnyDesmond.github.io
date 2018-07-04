---
title: vue-cli 3.x 修改dist路径
date: 2018-07-04 16:26:56
keywords:
description:
tags: [vue]
categories: "vue"
---
## 一些牢骚

前端的世界真的太奇妙，更新速度真的跟火箭一样。没有一颗真正热爱它的心，真的很难继续走下去。前段时间 `Node` 之父 Ryan Dahl 发布新的开源项目 `deno`，受到了大量的关注。Ryan Dahl直言`node`是一个失败品，充斥很多bug和设计上的不合理，导致他也无力回天。。。。。天啦撸，可怜我们这种小前端，`node`还没开始，马上就要结束了。。。。
![deno回复](http://oughko11e.bkt.clouddn.com/0066Db0Pgy1frulyijc5vj30m61b4agu.jpg)
好的吧，牢骚归牢骚，生活还得继续。生命不息，撸码不止。
<!--more-->
## webpack4

最近在一个项目中，将vue-cli更新到了最新版的3.x。同时webpack也更新到了4.x。webpack4在一些配置上有了很大一部分的精简。据说是受到了最近蛮火的0配置开箱即用的打包工具`Parcel`的影响，官方也觉得webpack配置有点繁琐。（尝试了一下,在一些小项目中，确实很爽）。webpack4具体更新细节可以在官网上看到，这边就不贴了。[webpack4文档](https://webpack.js.org/concepts/)

## vue-cli 3.x

使用新版的vue-cli构建出来的项目目录也是非常清爽。我这边在构建的时候选的是`Manually features`。
然后在项目打包执行`yarn build`的时候，打开dist目录的index.html发现资源没有正确加载。
![错误截图](http://oughko11e.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20180704165722.png)
立即联想到需要改输入路径的地址。却尴尬的发现之前的build和config文件夹不见了。查阅后发现如果需要自定义配置，需要在项目的 **根目录**添加一个`Vue.config.js`。在这个文件中，我们可以进行一些个性化定制。
```javascript
module.exports = {
    // 基本路径
    baseUrl: './',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 服务器端口号
    devServer: {
        port: 1234,
    },
}
```
和以前的操作一样 **在`/`前面直接加上`.`**就行了

## 详细配置

``` javascript

module.exports = {
 // 基本路径
 baseUrl: '/',
 // 输出文件目录
 outputDir: 'dist',
 // eslint-loader 是否在保存的时候检查
 lintOnSave: true,
 // use the full build with in-browser compiler?
 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
 compiler: false,
 // webpack配置
 // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
 chainWebpack: () => {},
 configureWebpack: () => {},
 // vue-loader 配置项
 // https://vue-loader.vuejs.org/en/options.html
 vueLoader: {},
 // 生产环境是否生成 sourceMap 文件
 productionSourceMap: true,
 // css相关配置
 css: {
  // 是否使用css分离插件 ExtractTextPlugin
  extract: true,
  // 开启 CSS source maps?
  sourceMap: false,
  // css预设器配置项
  loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  modules: false
 },
 // use thread-loader for babel & TS in production build
 // enabled by default if the machine has more than 1 cores
 parallel: require('os').cpus().length > 1,
 // 是否启用dll
 // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
 dll: false,
 // PWA 插件相关配置
 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 pwa: {},
 // webpack-dev-server 相关配置
 devServer: {
  open: process.platform === 'darwin',
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  proxy: null, // 设置代理
  before: app => {}
 },
 // 第三方插件配置
 pluginOptions: {
  // ...
 }
}
```
