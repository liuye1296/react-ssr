import { CHANGE_LIST, HOME_DATA } from './constants'
const defaultState = {
    name: 'Lydie!',
    homeList: []
}
/**
 *  用来决定每个 action 如何改变应用的 state，这个函数被叫做 reducer。
 *  接收 state 和 action，并返回新的 state 
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LIST:
            return {
                // { 
                //     type: CHANGE_LIST,
                //     list
                // }
                ...state,
                ... action //
            }
        case HOME_DATA:
            return {
                ...state,
                name: action.data.name
            }
        default:
            return state
    }
}