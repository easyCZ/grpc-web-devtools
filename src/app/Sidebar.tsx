import * as React from "react";

export type RequestOverview = {
  id: number,
  host: string,
  method: string,
  service: string,
}

type SidebarProps = {
  requests: RequestOverview[],
  onSelect: (id: number) => any
}

const Sidebar: React.SFC<SidebarProps> = (props) => {
  return (
    <ul>
      {props.requests.map(request =>
        <li onClick={() => console.log('click') || props.onSelect(request.id)}>
          {request.host}/{request.service}.{request.method}
        </li>
      )}

    </ul>
  );
};

export default Sidebar;