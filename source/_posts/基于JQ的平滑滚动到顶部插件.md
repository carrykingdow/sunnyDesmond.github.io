---
title: 基于JQ的平滑滚动到顶部插件
date: 2017-08-10 14:36:03
tags: [js]
categories: "js"
---
## 需求
页面过长的时候，滑到底部之后要想再翻到网站的顶部查看内容，如果单纯依靠手指划显然不太友好。这时点击回到顶部的功能就显得非常人性化。
## 实现
利用如下这段js，我们可以轻松的做到这一点。
 <!-- more --> 
```javascript
$.fn.scrollTo = function(options) {  
    var defaults = {  
        toT: 0, //滚动目标位置  
        durTime: 500, //过渡动画时间  
        delay: 30, //定时器时间  
        callback: null //回调函数  
    };  
    var opts = $.extend(defaults, options),  
        timer = null,  
        _this = this,  
        curTop = _this.scrollTop(), //滚动条当前的位置  
        subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值  
        index = 0,  
        dur = Math.round(opts.durTime / opts.delay),  
        smoothScroll = function(t) {  
            index++;  
            var per = Math.round(subTop / dur);  
            if (index >= dur) {  
                _this.scrollTop(t);  
                window.clearInterval(timer);  
                if (opts.callback && typeof opts.callback == 'function') {  
                    opts.callback();  
                }  
                return; 
            } else {  
                _this.scrollTop(curTop + index * per);  
            }  
        };  
    timer = window.setInterval(function() {  
        smoothScroll(opts.toT);  
    }, opts.delay);  
    return _this;  
};  
  
```
最后我们只要给某一个按钮的点击事件里加上这个` $("body").scrollTo({ toT: 0 });  `就ok了。