
import {Code} from 'grpc-web-client';
import * as React from 'react';
import {SFC} from 'react';
import {GrpcInvocation} from './reducers/grpc';

const ReactTable = require('react-table').default;

interface Column<T> {
  id: string,
  Header: string,
  accessor: (data: T) => string,
}

const COLUMNS: Column<GrpcInvocation>[] = [
  { id: 'name', Header: 'Name', accessor: (data: GrpcInvocation) => `${data.service}.${data.method}` },
  { id: 'status', Header: 'Status', accessor: (data: GrpcInvocation) => {
    if (data.grpcStatus !== undefined && data.grpcStatus !== null) {
      return `${Code[data.grpcStatus]}`
    }
    return 'pending';
  }},
  { id: 'type', Header: 'Type', accessor: (data: GrpcInvocation) => 'type TODO' },
]

interface InvocationListProps {
  items: GrpcInvocation[]
}

const InvocationList: SFC<InvocationListProps> = ({ items }) => {

  const displayableInvocations: GrpcInvocation[] = items
      .filter(req => req.host && req.service && req.method);

  return (
    <ReactTable
      showPagination={false}
      data={displayableInvocations}
      columns={COLUMNS}
    />
  );
};

export default InvocationList;