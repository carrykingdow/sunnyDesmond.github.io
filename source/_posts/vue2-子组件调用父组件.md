---
title: vue2 子组件调用父组件
date: 2017-12-23 15:58:15
keywords:
description:
tags: [javascript]
categories: "javascript"
---
## 一些插曲
时间过的真快。没几天就要圣诞节了。看了一下以前的日志，果然好久没有更新了。。。
年底之前还躁动了一下，准备换个环境，最终还是被boss的加薪留住了。既然留下来了，那就沉住心，继续好好工作~
<!--more-->
## 问题描述
在vue项目中，父子组件经常会需要调用方法，传递参数。之前也总是不是很清晰。今天又遇到了，顺便记录一下，加深记忆。
这边就举一个子组件调用父组件的一个方法：
假设这里有个组件
``` javascript
    <child></child>
    //父组件中有个方法

    ···
    methods:{
        wantAlert(){
           alert(1)
            },
    }
```
如果`child`想要直接调用`wantAlert()`vue会报错。那么可以这样操作。
在`child`中的`methods`里这样写
``` javascript
    ···
    template:`<div @click="childClick"></div>`,
    methods:{
        childClick:function(){
                this.$emit("callchild");
            },
    }

```

父组件中需要加一下这个
```javascript
 ···
      methods:{
        wantAlert:function(){
                alert(1)
            },
        // 子组件调用父组件
        resChild: function() {
                this.wantAlert();
            }
    }
```


然后在这个`child`组件上加上这个
```
<child v-on:callchild="resChild"></child>
```
这样差不多就ok了，传值的话，也是类似这样。先这么多吧，以后问题再记录。