import * as React from "react";
import {GrpcCall} from "./reducers/grpc";

type DetailsProps = {
  grpcCall: GrpcCall
}

const Details: React.SFC<DetailsProps> = (props) => {
  return (
      <div>
        <div>Details</div>
        { JSON.stringify(props, null, '\t')}
      </div>
  )
}

export default Details;