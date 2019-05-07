import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; //Chrome调试器
import thunk from "redux-thunk"; //action异步中间件
import { redcuer as home } from "../view/home/store";
import { reducer as header } from "../components/Header/store";
/* 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 
惟一改变 state 的办法是触发 action，
一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers */
const reducer = combineReducers({
  // 组合 reducer
  home,
  header
});
//服务器端创建 Store
export const createServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk)); //创建一个store  applyMiddleware 执行中间件
};

//客户端创建 Store
export const createClientStore = () => {
  if (typeof window === "undefined") {
    throw "createClientStore can only be used at client, if you beed to be used at server Please createServerStore";
  }
  //把     window.__INIT_STATE__ 数据注入到 state  叫客户端数据脱水
  const defaultStore = window.__INIT_STATE__ ? window.__INIT_STATE__.state : {};
  let _applyMiddleware = applyMiddleware(thunk);
  if (process.env.NODE_ENV !== "production") {
    _applyMiddleware = composeWithDevTools(_applyMiddleware);
  }
  return createStore(reducer, defaultStore, _applyMiddleware); //创建一个store
};
