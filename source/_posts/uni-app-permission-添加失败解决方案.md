---
title: uni-app permission 添加失败解决方案
date: 2019-08-27 09:34:33
description: 微信小程序
tags: [微信小程序]
categories: "微信小程序"
---
## 踩坑
微信小程序现在需要手动在 `app.json`中设置`premission`才可以授权获取位置信息。
```
"permission": {

     "scope.userLocation": {

     "desc": "你的位置信息将用于小程序位置接口的效果展示"

   }

 }
```

在`uni-app`中发现在`app.json`中设置无效，经研究发现必须要在`uni-app`项目中`mainfest.json`中设置才行。

```
 "mp-weixin" : {
        "appid" : "xxxxxxxxxxx",
        "setting" : {
            "urlCheck" : false,
            "minified" : true,
            "es6" : true,
            "postcss" : true
        },
        "permission" : {
            "scope.userLocation": {
                "desc": "你的位置信息将用于小程序位置接口的效果展示"
            }
        }
    },
```
记录。
