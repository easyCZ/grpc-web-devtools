import * as React from 'react';
import {GrpcCall, GrpcState} from './reducers/grpc';

export type RequestOverview = {
  id: number,
  host: string,
  method: string,
  service: string,
};

type SidebarProps = {
  requests: GrpcCall[],
  onSelect: (id: number) => any,
};

const Sidebar: React.SFC<SidebarProps> = (props) => {
  return (
    <ul>
      {props.requests.map(request =>
        <li onClick={() => console.log('click') || props.onSelect(request.id)}>
          {request.host}/{request.service}.{request.method}
        </li>,
      )}

    </ul>
  );
};

export default Sidebar;
