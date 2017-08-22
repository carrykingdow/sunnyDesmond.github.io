---
title: css 美化radio
date: 2017-08-22 16:44:24
keywords: css 美化radio
tags: [css3]
categories: "css3"
---
## 需求
使用css 美化 input type="radio" 
如图：![css美化radio](http://oughko11e.bkt.clouddn.com/radio.gif)
<!--more-->
## 代码
``` html
     <input class="radio-beauty" type="radio" id="radio1" name="carriageType" />
```
``` css3
    
          .radio-beauty {
            width: 12px;
            height: 12px;
            appearance: none;
            border: 1px solid #7a7a7a;
            border-radius: 50%;
            position: relative;
            }
            .radio-beauty:checked:after {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                top: 1px;
                left: 1px;
                background-color: #262626;
                border-radius: 50%;
            }
```
## 结束语
利用伪类可以很方便的改造一些我们需要的css效果，不必要添加新的标签了。