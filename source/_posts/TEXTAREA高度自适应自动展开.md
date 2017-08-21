---
title: textarea高度自适应自动展开
date: 2017-08-10 13:41:27
tags: [javascript]
categories: "javascript"
update: 2017-08-18 16:14:32
---
## 需求
web开发中，使用textarea的场景非常常见。但是原生的textarea不能根据用户输入的内容来伸缩自己的高度，这个特性感觉很反人类，在一些特定下我们希望它的高度能随着内容自适应，而不出现滚动条。就像下面的图一样。
## demo图
![textarea高度自适应图](http://oughko11e.bkt.clouddn.com/textaea.gif)

<!-- more -->

## 实现代码
* html
``` html
<textarea id="textarea"></textarea>  
```
* js
``` javascript
 // textarea 自适应高度  
function makeExpandingArea(el) {  
    var setStyle = function(el) {  
        el.style.height = 'auto';  
        el.style.height = el.scrollHeight + 'px';  
        // console.log(el.scrollHeight);  
    }  
    var delayedResize = function(el) {  
        window.setTimeout(function() {  
                setStyle(el)  
            },  
            0);  
    }  
    if (el.addEventListener) {  
        el.addEventListener('input', function() {  
            setStyle(el)  
        }, false);  
        setStyle(el)  
    } else if (el.attachEvent) {  
        el.attachEvent('onpropertychange', function() {  
            setStyle(el)  
        });  
        setStyle(el)  
    }  
    if (window.VBArray && window.addEventListener) { //IE9  
        el.attachEvent("onkeydown", function() {  
            var key = window.event.keyCode;  
            if (key == 8 || key == 46) delayedResize(el);  
  
        });  
        el.attachEvent("oncut", function() {  
            delayedResize(el);  
        }); //处理粘贴  
    }  
}  
makeExpandingArea(textarea);  
```
## 兼容性
这个问题目前发现在安卓机上，有时候会这个方法会不走，（我这边页面用在混合app开发上），为了解决这个问题，这边还有一个稍微次一点的方法，这边也贴出来，提供给有需要的同学
``` html
    <textarea oninput="autosize(this)"></textarea>
```

``` javascript
       // 自动展开textarea
    function autosize(obj) {
        var el = obj;
        setTimeout(function() {
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }
```
使用这个方法，textarea会根据内容的增加减少而变化，但如果先输入文字然后再删除的话，textarea不会完全恢复到原来的高度。。。算是一点点的小遗憾，但是兼容性不错。
## 简洁的一种写法
这边还有一个最简洁的写法，但是bug也是最多的.最致命的是,可以跟随页面内容增加而调整textarea的高度，但不会随着内容的减少而减小高度。o(╯□╰)o
这边也放出代码：<font color="#ff4400" size="12">（不推荐）</font>
``` html
<textarea onpropertychange="this.style.height=this.scrollHeight + 'px'" oninput="this.style.height=this.scrollHeight + 'px'"></textarea>
```
## 一些黑科技
当然了，网上的大神们，为了实现这种效果也是操碎了心，还有很多黑科技写法，诸如在`div`上加`contenteditable="true"`来假冒`texta`,都是可以的，按需使用即可。附上张鑫旭大神的这篇文章： [div模拟textarea文本域轻松实现高度自适应](http://www.zhangxinxu.com/wordpress/2010/12/div-textarea-height-auto/)