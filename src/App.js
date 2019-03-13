//没有使用的
import React from 'react'
import Header from './components/Header/'
import { renderRoutes } from 'react-router-config' //可以解析 拆分 子路由
import { isLogin } from './components/Header/store/action'
const App = (props) => {
	return (
		<div>
			<Header staticContext={props.staticContext}/>
			{renderRoutes(props.route.routes)}
		</div>
	)
}
App.loadData = function (store) {
	return store.dispatch(isLogin());
}
export default App;