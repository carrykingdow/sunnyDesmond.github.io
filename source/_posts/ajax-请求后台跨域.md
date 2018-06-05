---
title: ajax 请求后台跨域
date: 2018-06-05 10:29:57
keywords:
description:
tags: [javascript]
categories: "javascript"
---
## 坑爹的问题
最近在项目中遇到一个跨域问题，坑了好久，查阅了很多资料终于解决了，特此记录。

## 问题描述
前端库我这边用的axios。后台是java。前台请求方法是post。token验证放在header里面传到后台。
前端代码如下：

<!--more-->

``` javascript

axios.defaults.baseURL = getAppParams().host;
axios.defaults.headers.common['token'] = getAppParams().token;

axios({
        method: "post",
        url: 'order/ordcustomer/save',
        data: formdata,
        transformRequest: [function(data) {
            return JSON.stringify(data)
        }]
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    })
```
浏览器会提示这样：`Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed`。

## 一些概念
一番查询后发现。当后台设置`Content-Type:application/json`的时候，前端请求为post的时候，即为复杂请求。这时候，浏览器一次post请求会变成两次。
1. 第一次浏览器会优先发送一个`options`给后台，后台验证通过
2. 开始发送真正的post请求
关于预检的概念网上有很多，我这边就不记录了。[传送门](https://blog.csdn.net/wang379275614/article/details/53333775?locationNum=2&fps=1)


## 解决方法
这个问题还是得从后台解决。 这是后台的修改代码。
后台框架`shiro`
`servlet filter`部分

``` java
    @Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpServletRequest rep = (HttpServletRequest) request;
		
		resp.addHeader("Access-Control-Allow-Origin",rep.getHeader("Origin"));
		//允许跨域请求中携带cookie		
		resp.addHeader("Access-Control-Allow-Credentials", "true");
		// 如果存在自定义的header参数，需要在此处添加，逗号分隔
		resp.addHeader("Access-Control-Allow-Headers", "authorization,Origin, No-Cache, X-Requested-With, "
				+ "If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, " + "Content-Type, X-E4M-With");
		resp.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

		chain.doFilter(request, response);
	}

```
好多网上推荐的是，将`	resp.addHeader("Access-Control-Allow-Origin",*);`因为这边已经设置了`Access-Control-Allow-Credentials:true`，所以前端跨域的时候时候会带上`cookie`。这样在请求的时候就会产生冲突。所以一定要将`Access-Control-Allow-Origin`设置成`rep.getHeader("Origin")`!!!  [传送门](https://my.oschina.net/qinghang/blog/1608792)

还有一个细节就是，后台还要判断一下获取的请求，判断此次是否是预检请求（即`getHeader()=="OPTIONS"`），如果相同则 `return true`允许跨域；预检后，正式请求。
``` java
  if (((HttpServletRequest) request).getMethod().equals("OPTIONS")){
            return true;
        } else{
            //。。。。。。。。。。。。。
        }
```