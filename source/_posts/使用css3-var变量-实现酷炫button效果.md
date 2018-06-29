---
title: 使用css3 var变量 实现酷炫button效果
date: 2018-06-29 13:35:19
tags: [css3]
categories: "css3"
---
## css3 var 变量定义

无意中发现 css3的拥有一个自定义属性的功能，利用这个功能，我们可以实现灰常牛逼的功能。如图：
![hover button](http://oughko11e.bkt.clouddn.com/hover.gif)
<!--more-->
css自定义变量的语法是 `--*`
取名规则也很广，除了`$、[、^、(、% `都可以取，甚至可以取中文名。。
举个栗子:
``` css
p {
  --牛逼颜色: #ff4400;
  color: var(--牛逼颜色);
}
```
咋一看，跟`sass` 、`less`变量差不多~ 但是它是css原生自带的，很是方便。但是它是不支持设置`属性名`的，例如：
```css
    p{
        --test:font-size;
        var(--test):24px;
    }
```
oh,这样写是无效的。。。。

## var 的缺省值

还有一个就是缺省值，设置的值不合法的时候，会给出一个默认值来保证正常解析 例如这样：
``` css
 p{
    --color: 20px;
    background-color:var(--color)
 }

```
它会解析成 `background-color:transparent;`

## var 空格尾随特性
```css
p {
  --size: 20;   
  font-size: var(--size)px;
}
```
这样写，实际上会变成这样 `font-size:20 px` 自动变成一个空格。。。。好坑，千万不要用sass或者less的变量的概念来带节奏。。
正确的写法是这样
```css
p {
  --size: 20px;   
  font-size: var(--size);
}
```
或者
``` css
p {
  --size: 20;   
  font-size: calc(var(--size) * 1px);
}

```
具体详细的可以参考 [张鑫旭大神的博客](http://www.zhangxinxu.com/wordpress/?p=5804)

## 实际应用
让我们用这个神奇的变量来实现一个牛逼的按钮效果吧，直接上代码
html
``` html
 <button class="button">
    <span>我来试试这个！</span>
 </button>
```
```css
.button {
            position: relative;
            appearance: none;
            background: #f72359;
            padding: 1em 2em;
            border: none;
            color: white;
            font-size: 1.2em;
            cursor: pointer;
            outline: none;
            overflow: hidden;
            border-radius: 100px;
        }
.button span {
            position: relative;
        }
        
.button::before {
            --size: 0;
            content: '';
            position: absolute;
            left: var(--x);
            top: var(--y);
            width: var(--size);
            height: var(--size);
            background: radial-gradient(circle closest-side, #4405f7, transparent);
            transform: translate(-50%, -50%);
            transition: width .7s ease, height .7s ease;
        }
        
.button:hover::before {
            --size: 400px;
        }
```

``` javascript
document.querySelector('.button').onmousemove = (e) => {
            const x = e.pageX - e.target.offsetLeft
            const y = e.pageY - e.target.offsetTop
            e.target.style.setProperty('--x', `${ x }px`)
            e.target.style.setProperty('--y', `${ y }px`)
        }
```
搞定收工！
[代码出处](https://www.zcfy.cc/article/stunning-hover-effects-with-css-variables# %E8%AF%91%E8%80%85%EF%BC%9Ameakaka)

