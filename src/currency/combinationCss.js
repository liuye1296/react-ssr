import React, { Component } from 'react'


export default (OldComponent, styles) => {
    return class newComponent extends Component {
        constructor(props) {
            super(props)
            if (props.staticContext) {//ssr 里面存在的的对象 会注入到 <StaticRouter></StaticRouter>里面
                props.staticContext.css.push(styles._getCss());
            }
        }
        render() {
            return <OldComponent {...this.props} />
        }
    }
}