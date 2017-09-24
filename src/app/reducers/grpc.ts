import {
  GrpcAction, GrpcError, grpcError, requestHeaders, requestMessage, requestStart, responseEnd, responseHeaders,
  responseMessage, responseTrailers
} from "../actions/grpc";
import {BrowserHeaders, Code} from "grpc-web-client";

export type GrpcInvocation = {
  id: number,
  host?: string,
  service?: string,
  method?: string,
  timestamp?: number,
  requestHeaders?: BrowserHeaders,
  requestMessages: any[],
  responseHeaders?: BrowserHeaders,
  responseMessages: any[],
  responseTrailers?: BrowserHeaders,
  grpcStatus?: Code | null,
  errors: GrpcError[],
}

export type GrpcState = { [id: number]: GrpcInvocation };

const initialState = {};

function getOrCreate(state: GrpcState, key: number): GrpcInvocation {
  if (key in state) return state[key];
  return {
    id: key,
    requestMessages: [],
    responseMessages: [],
    errors: [],
  };
}

export default function grpcReducer(state: GrpcState = initialState, action: GrpcAction) {

  if (action.type === requestStart.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        host: action.payload.host,
        timestamp: action.payload.timestamp,
        service: action.payload.service,
        method: action.payload.method,
      }
    };
  }

  if (action.type === requestHeaders.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        requestHeaders: action.payload.headers,
      }
    };
  }

  if (action.type === requestMessage.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        requestMessages: [
          ...call.requestMessages,
          action.payload.message,
        ],
      }
    };
  }

  if (action.type === responseHeaders.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        responseHeaders: action.payload.headers,
      }
    };
  }

  if (action.type === responseMessage.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        responseMessages: [
          ...call.requestMessages,
          action.payload.message,
        ],
      }
    };
  }

  if (action.type === responseTrailers.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        responseTrailers: action.payload.trailers,
      }
    };
  }

  if (action.type === responseEnd.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        grpcStatus: action.payload.grpcStatus,
      }
    };
  }

  if (action.type === grpcError.type) {
    const call = getOrCreate(state, action.payload.id);
    return {
      ...state,
      [action.payload.id]: {
        ...call,
        errors: [
          ...call.errors,
          action.payload.error,
        ],
      }
    };
  }

  return state;
}