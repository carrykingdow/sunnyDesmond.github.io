---
title: 微信小程序scroll-x失效的解决方法
date: 2018-07-16 20:37:29
keywords:
description:
tags: [微信小程序]
categories: "微信小程序"
---
## 失效的scroll-x

在微信小程序的文档中，使用`scroll-view`标签，然后给它设置一个`scroll-x`就可以实现元素，横向排列，可以左右滑动。。。。
然而，在实际开发中，发现并不是这么简单。。。贴上部分`wxml`和`wxss`代码...

``` html
  <!-- 横向滚动商品 -->
    <scroll-view class='scroll-box' scroll-x >
      <view class='box'>
        <view class='box-hd'>
          <image src='https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=3ab7c3c9c4fcc3ceabc0cf33a244d6b7/cefc1e178a82b90137378cd87f8da9773812ef47.jpg'></image>
          <view class='info'>
            <view class='name'>jed_shi</view>
            <view class='time'>剩余09:43:21</view>
          </view>
        </view>
        <view class='box-img'>
          <image src='https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d369d78d98eef01f52141ec5d0fc99e0/c2fdfc039245d688b3d9dc4da8c27d1ed31b247b.jpg'></image>
        </view>
        <view class='box-extra'>
          <text class='price'>￥321</text>
          <button>加入</button>
        </view>
      </view>
      <view class='box'>
        <view class='box-hd'>
          <image src='https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=3ab7c3c9c4fcc3ceabc0cf33a244d6b7/cefc1e178a82b90137378cd87f8da9773812ef47.jpg'></image>
          <view class='info'>
            <view class='name'>jed_shi</view>
            <view class='time'>剩余09:43:21</view>
          </view>
        </view>
        <view class='box-img'>
          <image src='https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d369d78d98eef01f52141ec5d0fc99e0/c2fdfc039245d688b3d9dc4da8c27d1ed31b247b.jpg'></image>
        </view>
        <view class='box-extra'>
          <text class='price'>￥321</text>
          <button>加入</button>
        </view>
      </view>
      <view class='box'>
        <view class='box-hd'>
          <image src='https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=3ab7c3c9c4fcc3ceabc0cf33a244d6b7/cefc1e178a82b90137378cd87f8da9773812ef47.jpg'></image>
          <view class='info'>
            <view class='name'>jed_shi</view>
            <view class='time'>剩余09:43:21</view>
          </view>
        </view>
        <view class='box-img'>
          <image src='https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d369d78d98eef01f52141ec5d0fc99e0/c2fdfc039245d688b3d9dc4da8c27d1ed31b247b.jpg'></image>
        </view>
        <view class='box-extra'>
          <text class='price'>￥321</text>
          <button>加入</button>
        </view>
      </view>
      <view class='box'>
        <view class='box-hd'>
          <image src='https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=3ab7c3c9c4fcc3ceabc0cf33a244d6b7/cefc1e178a82b90137378cd87f8da9773812ef47.jpg'></image>
          <view class='info'>
            <view class='name'>jed_shi</view>
            <view class='time'>剩余09:43:21</view>
          </view>
        </view>
        <view class='box-img'>
          <image src='https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d369d78d98eef01f52141ec5d0fc99e0/c2fdfc039245d688b3d9dc4da8c27d1ed31b247b.jpg'></image>
        </view>
        <view class='box-extra'>
          <text class='price'>￥321</text>
          <button>加入</button>
        </view>
      </view>
    </scroll-view>
```
<!--more-->
``` css
.scroll-box {
  margin-top: 33rpx;
  padding-bottom: 40rpx;
}
.scroll-box .box:first-child {
  margin-left: 32rpx;
}

.scroll-box .box {
  width: 296rpx;
  margin-right: 32rpx;
}

.scroll-box .box .box-hd {
  display: flex;
  align-items: center;
}

.scroll-box .box .box-hd image {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 15rpx;
}

.scroll-box .box .box-hd .info {
  display: flex;
  flex-direction: column;
}

.scroll-box .box .box-hd .info .name {
  font-size: 28rpx;
  color: #333;
  line-height: 1;
  padding-bottom: 10rpx;
}

.scroll-box .box .box-hd .info .time {
  font-size: 22rpx;
  color: #999;
  line-height: 1;
}

.scroll-box .box .box-img {
  margin-top: 16rpx;
}

.scroll-box .box .box-img image {
  width: 296rpx;
  height: 222rpx;
  border-radius: 15rpx;
}

.scroll-box .box .box-extra {
  display: flex;
  justify-content: space-between;
}

.scroll-box .box .box-extra .price {
  font-size: 32rpx;
  color: #f15733;
}

.scroll-box .box .box-extra button {
  width: 104rpx;
  height: 44rpx;
  background-color: #f15733;
  color: #fff;
  margin: 0;
  padding: 0;
  font-size: 26rpx;
  line-height: 44rpx;
  margin-right: 8rpx;
}
```
![不能横向滚动](http://oughko11e.bkt.clouddn.com/scroll-view.png)
发现实际出来的效果是这样的。。扎心了，老铁！！！😭😭😭😭

## 解决方案。。
后来发现其实只要给`scroll-view`加上`white-space: nowrap; ` ，给`scroll-view`的子元素`box`加上`display:inline-block`就行了。。。
就像这样：
``` css
.scroll-box {
white-space: nowrap;
}
.scroll-box .box{
display:inline-block
}
```
![成功滚动](http://oughko11e.bkt.clouddn.com/scroll_gif.gif)
就可以很爽的横向滑动了。。。。完美解决了😄😄😄

## 温馨提示
可以不用给`scroll-view`设置`display:flex;`这种属性了，但一定要加上这个
``` css
.scroll-box {
white-space: nowrap;
}
```
不然会变成这样。。😑😑😑😑
![错误](http://oughko11e.bkt.clouddn.com/scroll-view-error.png)

