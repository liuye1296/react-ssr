import React, { Component } from 'react'
class NoFind extends Component {
    componentWillMount() {
        if (this.props.staticContext) {
            this.props.staticContext.statusCode = '404'
        }
    }
    render() {
        return (
            <div>
                page 404
            </div>
        )
    }
}

export default NoFind;