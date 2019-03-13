import React from 'react';
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config' //可以解析 拆分 子路由
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { indexHtml } from '../config'
import fs from 'fs' //路由文件
//服务器渲染 只有第一次 访问的时候 会服务器渲染 其他时候都是走 JS路由的  这样既能seo 也能节省服务器性能
export const render = (store, path, routes, context) => {
    const content = renderToString((
        <Provider store={store}>
            <StaticRouter location={path} context={context}>
                <div>
                    {renderRoutes(routes)}
                </div>
            </StaticRouter>
        </Provider>
    ));
    const css = context.css.join(' ') || ''
    const code = getTemplateCode(fs, indexHtml)//获取模板文件
    const data = {
        css,
        state: JSON.stringify(store.getState()),
        content
    }
    return templateFunc(code, data)
}

function templateFunc(str, data) {
    let computed = str.replace(/\{\{(\w+)\}\}/g, function (match, key) {
        return data[key] || '';
    })
    return computed;
}
//通过http 获取模板
function getTemplateCode(fs, url) {
    //建议存储到redis 里面
    const htmlStr = fs.readFileSync(url, 'utf-8')
    return htmlStr
}