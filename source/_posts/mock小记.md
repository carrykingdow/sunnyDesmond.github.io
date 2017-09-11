---
title: vue mock小记
date: 2017-09-11 15:05:02
keywords: vue mock小记
description:
tags: [mockjs,vue]
categories: "开发工具"
---

## 关于mockjs
mockjs真的是一款数据生成神器，可以帮助我们生成一堆我们想要的数据。在前后端分离的工作模式下，前端的苦逼们再也无需等待后台大哥们的接口了。想要数据？自己mock一下就搞定。
## 用法
官网对于mockjs，只是简单介绍了一下它的安装方式，以及引入方式。对于实际在项目中的使用，则直接抛了几个demo，感觉让人很扫兴。![呵呵](http://oughko11e.bkt.clouddn.com/1.png)
最近在一个vue项目中需要用到mock，在网上找了很多文章，感觉都非常专业的样子，然而看完还是一脸懵逼。。不能换个写个简单的，让人看得懂的说话么。。好吧，没办法，只能自己摸索，居然还成功了。。![呵呵](http://oughko11e.bkt.clouddn.com/2.png) 这边做一个小记，防止自己忘记。。
<!--more-->
## 安装
关于安装，[mock](https://github.com/nuysoft/Mock/wiki/Getting-Started)这个已经写得很详细了。直接cd到你的项目中，运行`npm install mockjs --save-dev` 回车，然后balabla安装。。如果下载很慢，可以换成淘宝镜像源`cnpm install mockjs --save-dev` 这个来安装。

## 使用

* 首先，在项目中新建一个文件，暂且称为`mock.js`,我这边是在`src/plugins/`新建的。你们可以随便新建在哪，建完之后确保你能找得到它。。
* 然后，把一些配置写进刚刚新建的`mock.js`,它的api用法我这边就不写，想偷懒？那可不行，自己慢慢看[文档](http://mockjs.com/examples.html)去！我这边贴一下我的简单的配置。我这边生成的是一堆外卖数据
``` javascript
//引入mockjs
import Mock from 'mockjs';
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'foods|10-50': [{
    'name': "@ctitle(2,10)",
    "img": "@image('600x600',#b7ef7c)",
    "brief": "@csentence(1,50)",
    "price|0-20.0-2": 1,
    "num": 0,
    "minusFlag": true,
    "time": "@time",
    "peisongfei|0-100.0-2": 1,
    "limit|0-50": 1
  }],
  "sales|10-50": [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'name': "@ctitle(2,10)",
    "img": "@image('600x600',#b7ef7c)",
    "brief": "@csentence(1,50)",
    "price|0-100.0-2": 1,
    "num": 0,
    "minusFlag": true,
    "time": "@time",
    "peisongfei|0-100.0-2": 1,
    "limit|0-100": 1
  }]
});

export default {
  data
}
```
* 接下来，在你需要用到的mock数据的组件页面中，这样写
```javascript 
import mockdata from "@/plugins/mock";
```
这个路径是你刚刚新建`mock.js`这个文件的路径，文件后面的`.js`可以省去。
* 引用数据，在你methods里面 直接引用刚刚的mockdata即可。例如：
 ```javascript
    new Promise((resolve, reject) => {
               that.foods =mockdata.data.foods;  //直接点出你生成的假数据对象即可
               that.foodsListLen = that.foods.length;
            }).catch(err=>{
                console.log(err)
            })
 ```
* 搞定，收工![收工](http://oughko11e.bkt.clouddn.com/3.png)！

## 最后
本人菜鸟一枚，以上完全是自己摸索的结果，如果各位看官觉得写得不好，还请不吝赐教，感谢各位。。。