import {Component, Props, ReactElement} from 'react';
import * as React from 'react';
import Sidebar, {RequestOverview} from './Sidebar';
import {connect} from "react-redux";
import {GrpcCall, GrpcState} from "./reducers/grpc";
import Details from "./Details";
import NoRequests from "./NoRequests";

type GrpcDevToolsProps = {
  grpc: GrpcState,
}

type GrpcDevToolsState = {
  selected: GrpcCall | null,
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
        <div style={styles.container}>
          <NoRequests />
        </div>
      );
    }

    const requests: RequestOverview[] = [];
    for (let id in this.props.grpc) {
      const request = this.props.grpc[id];
      if (request.host && request.service && request.method) {
        requests.push({
          id: +id,
          host: request.host,
          method: request.method,
          service: request.service,
        })
      }
    }


    return (
        <div style={styles.container}>
          <Sidebar
            requests={requests}
            onSelect={(id) => this.onSelectCall(id)}
          />
          {this.state.selected &&
            <Details grpcCall={this.state.selected} />
          }

        </div>
    );
  }
}

const styles = {
  container: {
    'display': 'flex',
    'flexDirection': 'column !important',
    'position': 'relative',
  }
}

export default connect(state => {
  return {
    grpc: state.grpc
  }
})(GrpcDevTools)