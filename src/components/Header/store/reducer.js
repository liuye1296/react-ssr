import { HEADER_LOGIN } from './constants'
const defaultState = {
    isLogin: true
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case HEADER_LOGIN:
            return {
                ...state,
                isLogin: action.isLogin
            }
        default:
            return state
    }
}