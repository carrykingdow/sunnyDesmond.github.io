---
title: 利用css3实现箭头
date: 2017-08-14 16:21:14
tags: [css3]
categories: "css3"
---
## 需求
在一些开发中，经常会用到一些箭头，如图所示：
![css3_arrow](http://oughko11e.bkt.clouddn.com/css3_arrow.png)
要实现图上的`抢`这个箭头，传统的做法就是切一张这样的图片，然后最为背景图就行了。但考虑到节约图片加载资源以及css3的强大特性，我们完全可以用CSS3来实现如图需求。
<!--more-->
## 实现
关于如何用css3实现三角形、箭头的方法有很多，百度一下你就知道。这边的话，可以把上图看成两部分，一部分是三角形，一部分是矩形就行了。具体实现的代码是这样的。
``` html
 <div class="info-r">
    <span class="btn">抢</span>
 </div>
```
``` scss
 .info-r {
        float: right;
        .btn {
          width: 56px;
          font-size: 32px;
          color: #ff4400;
          line-height: 62px;
          background-color: #ffec68;
          display: block;
          text-align: center;
          position: relative;
          &:before {
            border: 31px solid transparent;
            border-right: 10px solid #ffec68;
            width: 0;
            height: 0;
            left: -41px;
            position: absolute;
            content: ' '
          }
        }
      }
```
这样就可以了。
## 延伸
利用这种方法我们可以实现三角形，但如果我们要实现诸如`>`、`<`这种箭头怎么办呢。其实也很好实现。我们只要设置两个大小不一的三角形，然后将三角形层叠，小的三角形盖住大的三角形的中间区域，然后只展示大的三角形的外边框，就可以实现了。
具体实现：
```html
<div id="demo"></div>
```

``` css
#demo {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  position: relative;
  border: 4px solid #333;
}

#demo:after, #demo:before {
  border: solid transparent;
  content: ' ';
  height: 0;
  left: 100%;
  position: absolute;
  width: 0;
}

#demo:after {
  border-width: 9px;
  border-left-color: #ccc;
  top: 15px;
}

#demo:before {
  border-width: 14px;
  border-left-color: #333;
  top: 10px;
}
```
![demo](http://oughko11e.bkt.clouddn.com/demo.png)
具体可以参考这篇文章：[Css arrows and shapes without markup](https://yuiblog.com/blog/2010/11/22/css-quick-tip-css-arrows-and-shapes-without-markup/)