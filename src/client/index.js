import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
//import { renderRoutes } from 'react-router-config' //可以解析 拆分 子路由
import { createClientStore } from '../store'
import routes from '../router' //路由文件

const App = () => {
    return (
        <Provider store={createClientStore()}>
            <BrowserRouter>
                <div>
                    <Switch>
                        {/* renderRoutes(routes) */}
                        {routes.map(route => (
                            <Route {...route} />
                        ))}
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )
}

// ReactDom.hydrate 
// 如果一个节点上有服务端渲染的标记，则 React 会保留现有 DOM，只去绑定事件处理程序，从而达到一个最佳的首屏渲染表现
ReactDom.hydrate(<App />, document.getElementById('root'))