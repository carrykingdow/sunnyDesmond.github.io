---
title: js获取html标签
date: 2017-10-25 15:45:51
keywords:
description:
tags: [javascript]
categories: "javascript"
---
很多时候我们会用到这样的样式
```css
html,body{
height:100%;
overflow:hidden;
}
```
如果要用到js的话我们可以这样写：
``` javascript
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
```
是的，只要用 `document.documentElement`就可以获取`HTML`这个标签啦。顺便再列一下其他的几种获取方法。

1. document.getElementsByTagName("html")[0];
2. document.querySelector("html");
3. document.body.parentNode;
4. $('html').outerHTML()

写帖记录。