import {Component, Props, ReactElement} from 'react';
import * as React from 'react';
import Sidebar, {RequestOverview} from './Sidebar';
import {connect} from 'react-redux';
import {GrpcInvocation, GrpcState} from './reducers/grpc';
import Details from './Details';
import NoRequests from './components/NoInvocations';

const ReactTable = require('react-table').default;

import './index.css';
import InvocationList from './InvocationList';
import InvocationDetail from './InvocationDetail';

type GrpcDevToolsProps = {
  grpc: GrpcState,
}

type GrpcDevToolsState = {
  selected: GrpcInvocation | null,
}

class GrpcDevTools extends Component<GrpcDevToolsProps, GrpcDevToolsState> {

  constructor(props: GrpcDevToolsProps) {
    super(props);
    this.state = {
      selected: null
    }
  }

  onSelectCall(id: number) {
    console.log('setting selected', id);
    this.setState({
      selected: this.props.grpc[id],
    });
  }

  render() {

    if (Object.keys(this.props.grpc).length === 0) {
      return (
          <div className="container">
            <NoRequests/>
          </div>
      );
    }

    const invocations: GrpcInvocation[] = Object
        .keys(this.props.grpc)
        .map(id => this.props.grpc[+id]);

    // const requests: RequestOverview[] = [];
    // for (let id in this.props.grpc) {
    //   const request = this.props.grpc[id];
    //   if (request.host && request.service && request.method) {
    //     requests.push({
    //       id: +id,
    //       host: request.host,
    //       method: request.method,
    //       service: request.service,
    //     })
    //   }
    // }


    return (
        <div className="container">
          <InvocationList items={invocations} />
          <InvocationDetail />
        </div>
    );
  }
}

export default connect(state => {
  return {
    grpc: state.grpc
  }
})(GrpcDevTools)