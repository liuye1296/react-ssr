import { HEADER_LOGIN } from './constants'
const changeIsLogin = (data) => ({
    type: HEADER_LOGIN,
    isLogin: data.login
})
import service from '../../../service'
export const isLogin = () => {
    return (dispatch) => {
        return service.lydia.isLogin()
            .then(res => {
                dispatch(changeIsLogin(res)) // 执行完成去 reducer 匹配
            })
    }
}