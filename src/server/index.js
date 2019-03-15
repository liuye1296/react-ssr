import http from 'http';
import { matchRoutes } from 'react-router-config' //可以解析 拆分 子路由
import routes from '../router' //路由文件
import { createServerStore } from '../store'
import { render } from './util'
http.createServer((request, response) => {
    // 1.服务器请求 创建一个空的 store
    const store = createServerStore()
    // 2.根据请求地址 匹配路由   
    // 当exact:false 的时候 路由 可能会匹配到多个  比如 /login  可以匹配到 / 和/login 也就是可能存在 子路由的情况 
    // 所以 matchRoutes 会把路由(包括子路由)解析到 成为一个Array 不过前端 一般情况下是不存在 子路由
    let matchedRoutes = []
    try {
        matchedRoutes = matchRoutes(routes, request.url)
    } catch (error) {
        response.writeHead(302, { 'Location': '/404' });
        response.end()
    }
    if (matchedRoutes.length === 0) { //没有匹配到 就重定向到404 
        response.writeHead(302, { 'Location': '/404' });
        response.end()
    }
    const promiseList = []
    // 3.检查匹配到的路由 查看 是否有loadData函数 这个函数是我们自己定义 用来 服务器渲染的
    // 有就 加入 promiseList  
    matchedRoutes.map(res => {
        //可以通过 loadData 函数 传递cookie 
        if (res.route.loadData) {
            //console.log(res.route.loadData)       
            const promise = new Promise((resolve, reject) => {
                //确保 多个需要执行的loadData  都是成功 不执行catch
                res.route.loadData(store).then(resolve).catch(resolve)
            })
            promiseList.push(promise)
        }
    })
    //4.执行 Promise  给store填充数据
    Promise.all(promiseList).then(() => {
        //5. store填充完成 执行  render 
        const context = { css: [] } //  
        response.writeHead(200, { 'Content-Type': 'text/html' });
        const htmlStr = render(store, request.url, routes, context)
        if (context.action === 'REPLACE') { // 当触发 Redirect 之后  会添加了 action 重新登录  重定向
            response.redirect(302, '/login');
            response.end();
        }
        if (context.statusCode === '404') {
            response.writeHead(404, { 'Content-Type': 'text/html' });
        }
        // 6. 响应浏览器请求   
        response.end(htmlStr);
    })

}).listen(3000)


