import {Component, Props, ReactElement} from 'react';
import * as React from 'react';
import Sidebar, {RequestOverview} from './Sidebar';
import {connect} from 'react-redux';
import {GrpcCall, GrpcState} from './reducers/grpc';
import Details from './Details';
import NoRequests from './components/NoInvocations';

import './index.css';

type GrpcDevToolsProps = {
  grpc: GrpcState,
};

type GrpcDevToolsState = {
  selected: GrpcCall | null,
};

class GrpcDevTools extends Component<GrpcDevToolsProps, GrpcDevToolsState> {

  constructor(props: GrpcDevToolsProps) {
    super(props);
    this.state = {
      selected: null,
    };
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
          <NoRequests />
        </div>
      );
    }

    const requests = Object.keys(this.props.grpc)
        .map(id => this.props.grpc[+id]);

    return (
        <div className="container">
          <Sidebar
            requests={requests}
            onSelect={id => this.onSelectCall(id)}
          />

          { this.state.selected &&
            <Details grpcCall={this.state.selected} />
          }

        </div>
    );
  }
}

export default connect(state => {
  return {
    grpc: state.grpc,
  };
})(GrpcDevTools);
