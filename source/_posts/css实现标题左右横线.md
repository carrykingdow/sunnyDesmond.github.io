---
title: css实现标题左右横线
date: 2018-12-25 11:18:35
keywords:
description:
tags: [css3]
categories: "css3"
---
## 直接上代码
```
<div class='title'>快来设置吧</div>
```

```
.title {
  position: relative;
  font-size: 32px;
  color: #fff;
  height: 45px;
  line-height: 45px;
  text-align: center;
  top: 60px;
}
.title:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 2px;
  top: 50%;
  background-color: #fff;
  left: 32%;
}
.title:after {
  content: "";
  position: absolute;
  width: 28px;
  height: 2px;
  top: 50%;
  background-color: #fff;
  right: 32%;
}
```
## 效果图

![效果图](https://img.jammyfm.com/media/jedmm/WX20181225-105919.png)
