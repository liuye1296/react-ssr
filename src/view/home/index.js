import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getHomeListAction, updateData } from './store/actions'
import combinationCss from '../../currency/combinationCss'
import styles from '../../css/home/style.styl'
import shali from '../../assets/shali.jpg'
class Home extends Component {
	getList() {
		const { homeList } = this.props
		return homeList && homeList.map(res => (<div key={res.id}><div onClick={() => { alert(222) }}>{res.title}</div></div>))
	}
	render() {
		return (
			<div>
				<div className={styles.text}>my name is {this.props.name}</div>
				<div onClick={() => {
					this.updateData()
				}}>修改名字</div>
				<div className={styles.toux}></div>
				<img src={shali} />
				{this.getList()}
			</div >
		)
	}
	componentDidMount() { // 装载完成 服务器并不会执行
		//newList 不存在 或者  newList为空 那么就需要自己去获取
		if (!this.props.homeList || this.props.homeList.length === 0) {
			this.pageInit()
		}
	}
	pageInit() {
		this.props.getHomeList() //  mapDispatchToProps.getHomeList
	}
	updateData() {
		this.props.updateData({
			name: '柳轩'
		})
	}
}


const mapStateToProps = state => ({ //接收 reducer 里面 switch 的值 
	...state.home
})
const mapDispatchToProps = dispatch => ({
	getHomeList() {
		dispatch(getHomeListAction()) //调用 action里面的函数
	},
	updateData(data) {
		dispatch(updateData(data))
	}
})
const HomeExport = connect(mapStateToProps, mapDispatchToProps)(combinationCss(Home, styles))
// 负责在服务器渲染之前 路由需要的数据 提前加载完成
HomeExport.loadData = (store) => {
	return store.dispatch(getHomeListAction())// 去action 调用 getHomeListAction
}
export default HomeExport;

