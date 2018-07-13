---
title: 关于vue slot
date: 2018-05-16 10:27:20
keywords:
description:
tags: [vue]
categories: "js"
---
## 关于slot
vue的slot具有很强大的功能，但是由于平常时间很少使用，导致对其很陌生。今天花了一点时间了解了一下，发现它很好用，也很好理解。


## 使用方法
`<slot>`在一些教程上写的很高大上，搞的小白一头雾水，其实说白了它就是这样使用的。举个栗子：
这里有一个组件

``` javascript
  const app = new Vue({
            el: '#app',
        });
Vue.component('test',{
    template:`<div>wow,我只是一个小组件！</div>`
})
```
``` html
 <div id="app">
        <test></test>
 </div>
```
这很简单，就会在页面上得到这样一个显示。
![1](img/slot1.png)

<!--more-->

## slot

这时候发现，这个组件里面需要扩展其他的东西，我们暂且需要加个`span`吧。这个`span`又是可有可无的，不能修改`test`组件。
``` javascript
Vue.component('test',{
    template:`<div>wow,我只是一个小组件！<span>我是追加的内容！</span></div>`
})
```
这样写的话组件就变了，不能通用了~

如果这样呢？
``` html
   <div id="app">
        <test><span>我是追加的内容！</span></test>
 </div>  
```
好的吧，打开浏览器刷新一下，还是原来的内容，追加的`span`没有展示出来！

这时候，我们就可以用`slot`帮我们解决~
我们可以这样写
``` javascript

// 在组件里面加上 这个slot
Vue.component('test',{
    template:`<div>wow,我只是一个小组件！<slot></slot></div>`
})

<div id="app">
        <test><span>我是追加的内容！</span></test>
 </div>

```
当当当~ 出来了
![2](img/slot2.png)

ps：可以追加任意内容哦。设置可以插入组件。

``` html 
  <test><div><span>我是追加的内容！</span><h1>好多好多标签</h1></div></test>

  <test><aa></aa></test>
```

## 具名slot
顾名思义，就是有名字的插槽。当我们有很多很多`slot`的时候，为了防止冲突，就需要给`slot`取一个名字。所以`slot`有一个属性叫做
`name`。有点像`input name`一样。我们可以给`name`取任意名字。
``` javascript
Vue.component('test',{
    template:`<div>wow,我只是一个小组件！<slot name="hd"></slot></div>`
})
<div id="app">
         <test><span slot="hd">我是追加的头部</span><span slot="bd">我是追加的尾部</span></test>
 </div>
```
这样写的话 `vue`只会展示 `slot="hd"`的部分，后面的内容就会不展示了，这极大的方便了我们构建灵活的组件。
![3](img/slot3.png)



