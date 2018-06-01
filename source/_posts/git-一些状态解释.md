---
title: git 一些状态解释
date: 2018-06-01 10:26:21
keywords:
description:
tags: [git]
categories: "git"
---
## git 常见的文件提示
在使用git checkout , git status，或git diff files时会出现一些状态标志，M,T,D,A,R,U等等。
这边记录一下这些常见的状态所对应的信息

A: 你本地新增的文件（服务器上没有）.

C: 文件的一个新拷贝.

D: 你本地删除的文件（服务器上还在）.

M: 文件的内容或者mode被修改了.

R: 文件名被修改了。

T: 文件的类型被修改了。

U: 文件没有被合并(你需要完成合并才能进行提交)。

X: 未知状态(很可能是遇到git的bug了，你可以向git提交bug report)。