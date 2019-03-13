import http from '../../http'
const getHomeListAction = () => {
    return http().ajax('news.json', {
        secret: 'PP87ANTIPIRATE'
    }, 'GET').then(res => {
        // console.log('命名空间lydia.getHomeListAction 拿到了数据')
        // console.log('这里可以做一些业务数据处理')
        return res.data.data
    }).catch(res => {
        return res
    })
}

const login = () => {

}
const isLogin = () => {
    return http().ajax('isLogin.json', {
        secret: 'PP87ANTIPIRATE'
    }, 'GET').then(res => {
      //  console.log(res.data.data)
        return res.data.data
    }).catch(res => {
        return res
    })
}
const logout = () => {

}
const translations = () => {

}
//服务层 命名空间lydia 用于 请求数据之后的一些出来
export default {
    getHomeListAction, isLogin
}