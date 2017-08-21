---
title: css3实现switch button
date: 2017-08-09 17:25:30
tags: [css3]
categories: "css3"
---
## 需求
switch button 在移动端上非常常见。
如图：![css3 switch button](/img/switch.gif)
<!--more -->
## css3 实现
现在我们用css3 来实现这个button。
``` html
<div class="button-wrap">  
    <input type="checkbox">  
  </div>  
```
``` css
.button-wrap {  
      color: #999;  
    }  
      
    .button-wrap input {  
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  
      -webkit-appearance: none;  
      position: relative;  
      width: 52px;  
      height: 32px;  
      border: 1px solid #dfdfdf;  
      outline: 0;  
      border-radius: 16px;  
      box-sizing: border-box;  
      background-color: #dfdfdf;  
      -webkit-transition: background-color .1s, border .1s;  
      transition: background-color .1s, border .1s;  
    }  
      
    .button-wrap input:before {  
      content: " ";  
      position: absolute;  
      top: 0;  
      left: 0;  
      width: 50px;  
      height: 30px;  
      border-radius: 15px;  
      background-color: #fdfdfd;  
      -webkit-transition: -webkit-transform .35s cubic-bezier(.45, 1, .4, 1);  
      transition: -webkit-transform .35s cubic-bezier(.45, 1, .4, 1);  
      transition: transform .35s cubic-bezier(.45, 1, .4, 1);  
      transition: transform .35s cubic-bezier(.45, 1, .4, 1), -webkit-transform .35s cubic-bezier(.45, 1, .4, 1);  
    }  
      
    .button-wrap input:after {  
      content: " ";  
      position: absolute;  
      top: 0;  
      left: 0;  
      width: 30px;  
      height: 30px;  
      border-radius: 15px;  
      background-color: #fff;  
      box-shadow: 0 1px 3px rgba(0, 0, 0, .4);  
      -webkit-transition: -webkit-transform .35s cubic-bezier(.4, .4, .25, 1.35);  
      transition: -webkit-transform .35s cubic-bezier(.4, .4, .25, 1.35);  
      transition: transform .35s cubic-bezier(.4, .4, .25, 1.35);  
      transition: transform .35s cubic-bezier(.4, .4, .25, 1.35), -webkit-transform .35s cubic-bezier(.4, .4, .25, 1.35);  
    }  
      
    .button-wrap input:checked {  
      border-color: #04be02;  
      background-color: #04be02;  
    }  
      
    .button-wrap input:checked:before {  
      -webkit-transform: scale(0);  
      transform: scale(0);  
    }  
      
    .button-wrap input:checked:after {  
      -webkit-transform: translateX(20px);  
      transform: translateX(20px);  
    }  
```
这种比较简洁，非常适合在移动端中使用。但是在pc上的话，我发现在chrome浏览器上是ok的。（ps：chrome真的是太流弊了~）在火狐上的话直接GG。IE 9也是可以的，只不过没有缓动动画。
IE10正常，IE11貌似不行？？？？没细究。那接下来还有一种版本，兼容型不错。ie未测，FF还不错。
``` html
<div class="button-wrap-ff">  
    <label for="switchCP" class="switchCP">  
          <input type="checkbox"  id="switchCP" checked="checked" class="switchCP-input">  
          <div class="switchCP-box"></div>  
      </label>  
  </div>  
```
``` css
.button-wrap-ff {  
     color: #999;  
   }  
     
   .switchCP {  
     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  
   }  
     
   .switchCP>* {  
     pointer-events: none;  
   }  
     
   .switchCP-input {  
     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  
     position: absolute;  
     left: -9999px;  
   }  
         
   .switchCP-input:checked~.switchCP-box {  
     border-color: #04be02;  
     background-color: #04be02;  
   }  
     
   .switchCP-input:checked~.switchCP-box:before {  
     -webkit-transform: scale(0);  
     transform: scale(0);  
   }  
     
   .switchCP-input:checked~.switchCP-box:after {  
     -webkit-transform: translateX(20px);  
     transform: translateX(20px);  
   }  
       
   .switchCP-box {  
     display: block;  
     position: relative;  
     width: 52px;  
     height: 32px;  
     border: 1px solid #dfdfdf;  
     outline: 0;  
     border-radius: 16px;  
     box-sizing: border-box;  
     background-color: #dfdfdf;  
     -webkit-transition: background-color .1s, border .1s;  
     transition: background-color .1s, border .1s;  
   }  
     
   .switchCP-box:before {  
     content: " ";  
     position: absolute;  
     top: 0;  
     left: 0;  
     width: 50px;  
     height: 30px;  
     border-radius: 15px;  
     background-color: #fdfdfd;  
     -webkit-transition: -webkit-transform .35s cubic-bezier(.45, 1, .4, 1);  
     transition: -webkit-transform .35s cubic-bezier(.45, 1, .4, 1);  
     transition: transform .35s cubic-bezier(.45, 1, .4, 1);  
     transition: transform .35s cubic-bezier(.45, 1, .4, 1), -webkit-transform .35s cubic-bezier(.45, 1, .4, 1);  
   }  
     
   .switchCP-box:after {  
     content: " ";  
     position: absolute;  
     top: 0;  
     left: 0;  
     width: 30px;  
     height: 30px;  
     border-radius: 15px;  
     background-color: #fff;  
     box-shadow: 0 1px 3px rgba(0, 0, 0, .4);  
     -webkit-transition: -webkit-transform .35s cubic-bezier(.4, .4, .25, 1.35);  
     transition: -webkit-transform .35s cubic-bezier(.4, .4, .25, 1.35);  
     transition: transform .35s cubic-bezier(.4, .4, .25, 1.35);  
     transition: transform .35s cubic-bezier(.4, .4, .25, 1.35), -webkit-transform .35s cubic-bezier(.4, .4, .25, 1.35);  
   }  

```
ok，大功告成~
