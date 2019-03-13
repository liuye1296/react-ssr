
import Home from '../view/home'
import Login from '../view/login'
import NoFind from '../view/nofind'
//import App from '../App'
const routeList = [
    {
        path: '/',
        component: Home,
        exact: true, // 是否单匹配
        loadData: Home.loadData,
        key: 'home'
    },
    {
        path: '/login',
        component: Login,
        key: 'login',
        exact: true,
    }, {
        path: '/404',
        component: NoFind,
        key: 'not'
    }, {
        component: NoFind,
        key: 'not'
    }
]
// export default [{
//     path: '/',
//     component: App,
//     loadData: App.loadData,
//     routes: routeList
// }]
export default routeList