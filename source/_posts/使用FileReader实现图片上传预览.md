---
title: 使用FileReader实现图片上传预览
date: 2017-08-10 13:21:34
tags: [javascript]
categories: "javascript"
---
## 需求
web开发中经常会出现需要点击按钮然后上传图片这样的功能。一般我们会用第三方插件来实现。但其实如果需求不是很复杂的话，我们使用H5的FileReader就可以满足开发需求。
## 效果图
![fileupload gif](http://oughko11e.bkt.clouddn.com/upload.gif)

<!-- more -->

## 代码实现
* html
``` html
<div class="works-wrap">  
    <div class="figure-box" id="figure_box"></div>  
        <div class="add-btn">  
          <input type="file" id="imgUploadBtn" />  
          <a href="javascript:void(0);"><i></i>添加作品</a></div>  
    </div>  
</div>  
```
*啰嗦一下* 我这边用css将input[type=file] 设置成了opticy:0; 这样可以看起来更像原生的上传。
* js
``` javascript
var addWork = {  
    add: function(btn, figure_box) {  
        var figureBox = document.getElementById(figure_box); //获取显示图片的div元素  
        var input = document.getElementById(btn); //获取选择图片的input元素  
        //这边是判断本浏览器是否支持这个API。  
        if (typeof FileReader === 'undefined') {  
            alert("浏览器版本过低，请先更新您的浏览器~");  
            input.setAttribute('disabled', 'disabled');  
        } else {  
            input.addEventListener('change', readFile, false); //如果支持就监听改变事件，一旦改变了就运行readFile函数。  
        }  
  
        function readFile() {  
            var file = this.files[0]; //获取file对象  
            //判断file的类型是不是图片类型。  
            if (!/image\/\w+/.test(file.type)) {  
                alert("请上传一张图片~");  
                return false;  
            }  
  
            var reader = new FileReader(); //声明一个FileReader实例  
            reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件  
            //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片  
            reader.onload = function(e) {  
                // 创建一个新增的图片和文字input  
                var figure = $('<div class="figure"><div class="figure-hd">我的头部</div><div class="figure-bd"><img src="' + this.result + '" /><textarea placeholder="请输入文字"></textarea></div></div>');  
                figure.appendTo(figureBox);  
            }  
        }  
    }  
}  
```