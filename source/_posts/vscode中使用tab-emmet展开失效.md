---
title: vscode中使用tab emmet展开失效
date: 2017-08-12 16:09:16
tags: [vscode]
categories: "开发工具"
---
## 问题
用过vscode的同学都知道，这个文本编辑器异常强大。它提供了很多常用的插件，免除了在sublime中安装一堆插件的烦恼。尤其它自带的emmet，那是相当顺手。但是如果装了多了插件的话，有可能会把自带的emmet快捷键给冲突。造成tab形如`ul>li+span`不能生成`<ul><li></li><span></span></ul>`这种尴尬的问题。
## 解决
其实问题也是很好解决，只要按`ctrl+p`呼出控制器，然后输入`keybindings.json`按回车。它自动会跳转到`keybindings.json`页面，然后新增
<!-- more-->
``` javascript
{
  "key": "tab",
  "command": "-acceptSelectedSuggestion",
  "when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !editorHasMultipleSelections && !editorHasSelection && !editorReadonly && !editorTabMovesFocus"
}

```
就可以解决如上问题。P.S(如果已经存在tab，那就直接把command和when替换即可)。

如果想要键入`ul>li+span`，让它后面自带提示的话，也非常简单，只要把
```javascript
{
 "key": "tab",                  
  "command": "editor.emmet.action.expandAbbreviation",
  "when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !editorHasMultipleSelections && !editorHasSelection && !editorReadonly && !editorTabMovesFocus" 
}
```
这个替换就行了。