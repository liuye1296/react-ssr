import React, { Component } from 'react'
class NoFind extends Component {
    constructor(props) {
        super(props)
        if (props.staticContext) {
            props.staticContext.statusCode = '404'
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