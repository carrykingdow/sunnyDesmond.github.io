---
title: vue 报错-- xxx is not a valid attribute name
date: 2018-07-19 16:10:51
tags: [vue]
categories: "js"
---
## 问题
最近在修改一个项目的bug的时候发现一个神奇的bug，点击一个按钮的时候提示 
``` javascript
Error in nextTick: "InvalidCharacterError: Failed to execute 'setAttribute' on 'Element': '`' is not a valid attribute name."
```
如图：
![bug](http://oughko11e.bkt.clouddn.com/wx-1.png)
擦咧，从来没遇到过啊 ￣□￣｜｜
Google一番后，网友表示只有一个类似的错误，那就是 `Failed to execute 'setAttribute' on 'Element': ']' is not a valid attribute name. angular 4` 人家还是 ag4的项目，可是我的是`vue`啊。。。而且之前都没有问题啊。。

## 解决
后来一步步检查，从`js`传参，赋值开始，一个个检查过去没有问题。。。然后检查`html`发现了最低级的错误。。
😓好尴尬，不知道在什么时候多敲了一个 `  。
为方便以后快速定位问题，特此留文。。。希望以后不要出现这种低级错误了。。-_-||