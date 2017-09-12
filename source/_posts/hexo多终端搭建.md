---
title: hexo多终端搭建
date: 2017-09-12 22:18:02
keywords:
description:
tags: [hexo]
categories: "hexo"
---
## hexo
用过hexo搭建博客的同学都知道，hexo是一个非常轻量高效的博客搭建工具。配合强大的makrdown文件，分分钟编译出漂亮牛逼的页面，瞬间发布，省时省心。
## 一些问题
然而它也并不是完美的。比如我在公司电脑上，辛辛苦苦搭建了博客，写入文章且正常发布了。但是回到家，突然又想写一篇文章。这时候就显得非常蛋疼。如果重新安装的话，之前写的好多配置就没有了。。。在网上找了好多文章，有说把整个项目拷贝到百度网盘的（好吧，这个确实比较low，但也不失为很简单粗暴的方法）这个带来的缺点就是，你每次更新新的文件之后你必须要重新打包你的文件，然后上传到你的网盘空间。。。在这个GitHub漫天飞的年代，如果可能，我们当然会选择使用github来作为我们的仓库
<!--more-->
## 使用github
我这边采用的办法我感觉很简单。只需要将你的hexo项目作为两部分，分别放入github仓库中即可。
搭建过hexo博客的都知道，我们一开始就会新建一个仓库，这个仓库用来存放hexo生成的静态页面。这个地址你可以在根目录下的`_config.yml`中的`repository`找到。

```javascript
deploy: 
  type: git
  repository: https://github.com/SunnyDesmond/sunnyDesmond.github.io.git
  branch: master
```
然后只要在这个基础上新建一个新的分支，我这边分支名字叫做`hexo`,当然了你可以取任意你喜欢的名字。
这个仓库中我们就用来存放hexo的项目配置文件，方便我们在不同的终端中下载安装我们的博客。
一般情况下我们只要上传这么多文件夹到 `hexo`即可，如图：
![配置](http://oughko11e.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-09-12%20%E4%B8%8B%E5%8D%8811.05.09.png)

1.  `scaffolds/ ` `source/ `都在我们博客项目的根目录下文件夹
2. `_config.yml`也是我们根目录下的文件，注意不是 theme主题下的`_config.yml`
3. 主题的配置文件一般都在`themes／主题名称／`下的`_config.yml`里面。记得把这个文件的里面的全部东西复制一下 然后我们在项目最外面新建一个文件`_config-theme.yml`，名字随便取，自己能知道就行。把刚刚复制的东西全部粘贴到里面。然后将这么多东西push到刚刚新建的仓库就行了。
4. 截图中除了`package-lock.json`,`yarn.lock`不是必须的，其他的都是必须的哦。。
5. `.gitignore`文件中记得加上这个`themes/`防止将主题推送上去，可以先运行`git rm --cached .`清除缓存

## 换个电脑吧
好了，我们要换个电脑安装了。
1. 打开你的另一台电脑（默认你的电脑装完了node.js ,git, hexo( 运行`npm install hexo-cli -g`) ）
2. 打开你的github，找到你hexo项目，并复制你的项目地址 假设 `git@github.com:SunnyDesmond/sunnyDesmond.github.io.git`
3. cd到你需要安装博客的文件夹，执行`git clone git@github.com:SunnyDesmond/sunnyDesmond.github.io.git` 
⚠️注意：一定要确保你的新的电脑的ssh key 已经加到你的github中哦～不会的话，可以百度，也可以看看[这篇文章](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
4. balabala..开始下载。。嘟。。下载成功。。😄
5. 喝口水。。。继续。。
6. cd到你的项目，执行`npm install` ...嘟。。。安装成功 😄
7. 执行`git clone https://github.com/iissnan/hexo-theme-next themes/next` 我这边用的next主题。。。如果不是这个主题的话，不好意思，你可能要看一下其他主题的配置文件了
8. 将`_config-theme.yml`（也就是刚刚说新建的文件config文件）里面的内容全部赋值 粘贴到`themes／主题／`下的`_config.yml`里面
9. 运行 `hexo new "xx" `, `hexo clean`,`hexo g`,`hexo s`,在浏览器中打开你的`localhost:4000`如果成功看到页面。。那么恭喜你成功了。。。如果没有，请好好检查一下，然后发布文章`hexo d`即可(如果是mac的话，记得加上`sudo`,不然可能出现这种情况

``` javascript
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
Error: EACCES: permission denied, unlink '/Users/desmond/work/sunnyDesmond.github.io/.deploy_git/archives/index.html'
```
)
10. 最后记得每次发布文章之后，将项目push到新的仓库哦～
## 最后
感谢知乎大神给出的一些方法建议，如果有需要，小伙伴们可以看一下[这个帖子](https://www.zhihu.com/question/21193762)