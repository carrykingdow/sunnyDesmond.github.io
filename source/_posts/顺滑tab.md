---
title: 顺滑tab
date: 2017-08-15 11:08:20
tags: [swiper]
categories: "常用插件"
---
## swiper
[swiper](http://www.swiper.com.cn/)这个插件在日常开发中使用的频率非常高，他做出的轮播图，高效，易扩展。通过改装swiper，可以实现很多H5特效。
## tab
tab也是日常开发中常见的功能之一，一些简单的tab我们都会自己手写。但写出来的tab切换非常生硬，为了美观好看，我们可以加上一些过度动画，进行平滑的切换。就像这样：
![tab切换](http://oughko11e.bkt.clouddn.com/tab.gif)
<!--more-->
## 结合
现在可以利用swiper的强大功能，来改造一下我们的tab，来实现如图功能。
首先自然是把swiper引入到页面。
```html
    <!--列表切换选项卡-->
    <div class="maple-tab clearFix">
        <ul>
            <li class="active"><p class="m-border-right">订单状态</p></li>
            <li><p>订单详情</p></li>
        </ul>
    </div>

    <!--列表内容-->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide tab-content-1">列表1内容</div>
            <div class="swiper-slide tab-content-2">列表2内容</div>
        </div>
    </div>
```
```javascript
$(function () {
        var mySwiper = new Swiper('.swiper-container', {
            onSlideChangeEnd: function (swiper) {
                var j=mySwiper.activeIndex;
                $('.maple-tab li, .maple-tab2 li').removeClass('active').eq(j).addClass('active');
            }
        })
        /*列表切换*/
        $('.maple-tab li, .maple-tab2 li').on('click', function (e) {
            e.preventDefault();
            //得到当前索引
            var i=$(this).index();
            $('.maple-tab li, .maple-tab2 li').removeClass('active').eq(i).addClass('active');
            mySwiper.slideTo(i,1000,false);
        });
    });
```
改造完成。