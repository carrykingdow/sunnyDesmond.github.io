---
title: 让video在div中全屏
date: 2017-10-18 11:08:36
tags: [css3]
categories: "css3"
---
# 需求 
不废话，直接上需求。需要实现在一个5500*500的div中，让div中的video自动铺满，显示全屏。如图1：
![图一](http://oughko11e.bkt.clouddn.com/demo_video.png)
<!--more-->

# 坑爹
当你尝试这么写的话：
``` css3
.video {
        width: 500px;
        height: 500px;
        background-color: #bbc13d;
        margin: 50px auto;
    }

.video video {
        width: 100%;
        height: 100%;
        display: block;
    }
```
貌似老板或者客户会不满意，我明明让你铺满全屏，你为啥给我来个居中？

## 一个属性帮你搞定
来，试试把这个属性`object-fit: fill;`加到你可爱的`video`标签上去，你就能得到全屏的video了。不要用什么js计算div宽高了，是不是刺激？
如图2：
![图二](http://oughko11e.bkt.clouddn.com/demo_video_full.png)
## 兼容性
图3：
![图三](http://oughko11e.bkt.clouddn.com/can_i_use.png)
噗~，万恶的ie！不过如果不怎么考虑ie的话，可以尝试一下使用这个简单但又强大的属性哦~
