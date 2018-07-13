---
title: vue 2.0 渲染HTML
date: 2017-11-16 14:25:40
keywords:
description: 
tags: [vue]
categories: "js"
---
使用vue添加文本的时候，我们再也不用像jq一样使用append方法插入后台传过来的标签或者数据了。使用`v-text`和`v-html`我们可以轻松搞定一切。
最近在使用vue渲染一段来自后台文本编译器传过来的数据的时候，发现`v-html`不好用了。代码和图示如下：
<!--more-->
```
  <div class="protocol-content" v-html="content"></html>
   new Vue({
       el: "#protocol",
       data() {
         return {
           content: null,
         }
       },
       methods: {
         // 获取服务协议
         getContent: function() {
           let that = this;
           let url = `${urlParam.domain()}api/agreement/appRegistAgreement`;
           axios({
               url: url,
               method: 'get',
               params: {
                 token: "1632e581-d537-40b0-ad81-215c94280d32"
               },

             }).then(function(res) {
               const prorocol = res.data.data;
               that.content = prorocol;
             })
             .catch(function(error) {
               console.log(error);
             });

         },

       },
       created() {
         this.getContent();
       }
     })
```
兴高采烈的以为结束了，打开chrome发现是这样。。
![chrome](http://oughko11e.bkt.clouddn.com/chrome_jietu.png)
具体的渲染情况
![chrome](http://oughko11e.bkt.clouddn.com/chrome_jietu2.png)
会惊奇的发现，居然多了引号。。。网上找了一些方法，有一个不错，贴出来分享一下。

这边我们需要对传过来的数据在进行过滤一下
``` javascript
string.replace(prorocol ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                 .replace(/&lt;/g, "<")
                 .replace(/&gt;/g, ">")
                 .replace(/&quot;/g, "\"")
                 .replace(/&#39;/g, "\'");
```
ok,将我的代码修改如下
```
···
  that.content = prorocol.replace(prorocol ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                 .replace(/&lt;/g, "<")
                 .replace(/&gt;/g, ">")
                 .replace(/&quot;/g, "\"")
                 .replace(/&#39;/g, "\'");
···
```
ok，成功了！ 如图
![chrome](http://oughko11e.bkt.clouddn.com/chrome_jietu3.png)