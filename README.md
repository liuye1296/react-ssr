# react-ssr
    一个使用react react-router redux    node  做的同构项目
# 什么是ssr
    ssr就是服务器渲染 ssr的主要作用就是解决首页白屏问题和利于seo 一个网站需要seo的时候 并且还要做成spa项目 那么ssr是必须的 
    注意的是 只有第一次 访问的时候 会服务器渲染 其他时候都是走 JS路由的  这样既能seo 也能节省服务器性能
# 项目结构
    static 静态资源   主要是存放给webpack 生成页面的模板页面  
    public 客户端代码打包之后的存放路径 我是使用nginx做的静态服务器  
    dist 服务器代码打包之后存放的路径  项目存在问题 webpack 会打包两次图片文件（暂时没有解决，但不影响什么）  
    src 项目主要代码  
        assets 存放图片  
        client 客户端打包入口  
        components 存放组件  
        config 项目配置文件 比如ajax请求url  
        css 页面css css里面要根据components view 目录创建css文件  
        currency 存放公共的高级组件  
        http 封装的http请求的 使用了axios 区分客户端请求和服务器请求  
        router 路由文件 
        server 服务器打包入口  
        service  业务代码  主要是 这里调用http请求数据 然后再做一些业务处理 提供给view调用  
        store 合并store代码 每个view components都有自己的store，store里面的文件就是合并这些 暴露出去  
        view 页面代码 就是路由引用的  
        App.js  打算做客户端和服务器公共入口 可以引入一些全局样式或者插件什么的 但暂时没用用到  
# ssr执行流程
    详情可以查看src/server/index.js代码里面的注释
    1.http 监听3000接口  
    2.收到请求 创建store  
    3.根据url 解析路由 判断使用需要填充store数据  
    4.执行填充store的函数 把store填充好  
    5.把store传递 并执行renderToString 得到渲染的html  (util 里面 读取模板渲染)
    6.响应请求
# 运行项目
   1.git clone  https://github.com/liuye1296/react-ssr.git  
   2.yarn  
   3. 开发环境执行 yarn dev （注意这个项目没有实现静态服务  本人是用nginx代理public目录做的静态服务，为什么？ 因为正常情况下 生产环境静态资源通常都是存放在cdn的，就算不使用cdn 静态文件也不要跟项目存放在一个域名之下(cookie隔离，防止请求静态文件时附带cookie造成浪费)  访问127.0.0.1:3000
   4. yarn build  打包
# 项目总结
   react ssr  网络上相关的文章很多  但是大部分都是互相copy 或者本身讲不清 又或者表达能力不行  也可能是我本人比较笨理解不了，总之弄了很久自己都没有搞清楚。 
   看官网文档 看博客 看社区文章 这些学习方式效率很低  我觉得大部分作者写文章 主要目的都是加强自己理解 绝不是教人，所以你看了 很难理解。  
   最好的学方式有人手把手教(当然这很难) 次之就是付费视频教程 付费教程 一般都是很详细的讲解，付费教程对于程序员来说并不贵 每个月投入几百到学习上那绝对是赚的  
   写这个的时候我也算是对react ssr 有所理解 能自己搭建ssr环境，特别感觉慕课网的DellLee老师吧。他ssr课程很详细给个赞，

        
