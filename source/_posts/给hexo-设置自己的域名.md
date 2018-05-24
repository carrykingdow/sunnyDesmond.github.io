---
title: 给hexo 设置自己的域名
date: 2018-05-24 15:43:18
keywords:
description:
tags: [hexo]
categories: "hexo"
---
## 背景
这个基于hexo搭建的博客也差不多搭建了一年了。之前由于一些情况，导致注册的域名不用了好久，转而一直用gitpage生成的域名。最近闲来无事，又将原来的域名翻出来,重新绑定了这个博客。这样直接访问原来的域名，就可以跳转到此博客了。也实现了个(zhuang)性(x)域名博客。
<!--more-->
## 新的域名
之前的resping.com已经废弃了，今天又申请了一个新的更有意义的域名jedmm。然后一番解析后，成功绑定到gitpage。
## 具体操作
1. 域名解析，绑定到博客。
2. 在 `source/` 文件下新增CNAME文件，里面写上自己的域名 (如果不这样操作的话，会发现每次执行`hexo d`的时候又默认deploy到原来的地址，而不是自己想要绑定的新域名地址)
3. `hexo clean` `hexo g` `hexo d`
4. 收工


