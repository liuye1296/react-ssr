import { CHANGE_LIST, HOME_DATA } from './constants'
import service from '../../../service'
const changeList = (homeList) => ({ // 派发 去reducer 里面
    type: CHANGE_LIST,
    homeList
})
export const getHomeListAction = () => {
    return (dispatch) => {
        return service.lydia.getHomeListAction()
            .then(list => {
                dispatch(changeList(list)) // 执行完成去 reducer 匹配
            })
    }
}

export const updateData = (data) => {
    return (dispatch) => {
        dispatch({
            type: HOME_DATA,
            data
        })
    }
}