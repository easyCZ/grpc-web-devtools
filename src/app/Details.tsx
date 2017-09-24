import * as React from "react";
import {GrpcInvocation} from "./reducers/grpc";

type DetailsProps = {
  grpcCall: GrpcInvocation
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