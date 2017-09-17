import { BrowserHeaders, Code } from 'grpc-web-client';
import { ActionCreator } from 'react-redux-typescript';

export type RequestId = number;
export type Message = any;

export type RequestStart = {
  id: RequestId,
  host: string,
  service: string,
  method: string,
  timestamp: number,
};

export type RequestHeaders = {
  id: RequestId,
  headers: BrowserHeaders,
};

export type RequestMessage = {
  id: RequestId,
  message: Message,
};

export type ResponseHeaders = {
  id: RequestId,
  headers: BrowserHeaders,
  httpStatus: number,
};

export type ResponseMessage = {
  id: RequestId,
  message: Message,
};

export type ResponseTrailers = {
  id: RequestId,
  trailers: BrowserHeaders,
};

export type ResponseEnd = {
  id: RequestId,
  grpcStatus: Code | null,
};

export type GrpcError = {
  id: RequestId,
  code: Code,
  error: Error,
};

export const requestStart = new ActionCreator<'REQUEST_START', RequestStart>('REQUEST_START');
export const requestHeaders = new ActionCreator<'REQUEST_HEADERS', RequestHeaders>('REQUEST_HEADERS');
export const requestMessage = new ActionCreator<'REQUEST_MESSAGE', RequestMessage>('REQUEST_MESSAGE');
export const responseHeaders = new ActionCreator<'RESPONSE_HEADERS', ResponseHeaders>('RESPONSE_HEADERS');
export const responseMessage = new ActionCreator<'RESPONSE_MESSAGE', ResponseMessage>('RESPONSE_MESSAGE');
export const responseTrailers = new ActionCreator<'RESPONSE_TRAILERS', ResponseTrailers>('RESPONSE_TRAILERS');
export const responseEnd = new ActionCreator<'RESPONSE_END', ResponseEnd>('RESPONSE_END');
export const grpcError = new ActionCreator<'GRPC_ERROR', GrpcError>('GRPC_ERROR');

export const GrpcActionCreators = {
    requestStart,
    requestHeaders,
    requestMessage,
    responseHeaders,
    responseMessage,
    responseTrailers,
    responseEnd,
    grpcError,
};

export type GrpcAction = typeof GrpcActionCreators[keyof typeof GrpcActionCreators];
