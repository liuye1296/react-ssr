import React, { Fragment, Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import combinationCss from '../../currency/combinationCss'
import styles from './style.css'
class Header extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<Link to='/' className={styles.style}>首页</Link>
				<div></div>
				<Link to='/login'>登录</Link>
				<div></div>
				{
					<div>
						<Link to='/login'>退出</Link>
						<div></div>
						<Link to='/login'>翻译</Link>
					</div>
				}

			</div>
		)
	}
}
const mapState = (state) => ({
	isLogin: state.header.isLogin
})
const mapDispatchToProps = dispatch => ({
	login() {

	}
})
const headerExport = connect(mapState, mapDispatchToProps)(combinationCss(Header, styles))
export default headerExport

