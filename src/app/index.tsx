import {Component, Props, ReactElement} from 'react';
import * as React from 'react';
import {connect} from "react-redux";


class MyComponent extends Component<{ grpc: any}, {}> {

    render() {
        console.log(this.props.grpc);
        return <span>test2 {JSON.stringify(this.props.grpc)}</span>
    }
}

export default connect(state => {
    return {
        grpc: state.grpc
    }
})(MyComponent)