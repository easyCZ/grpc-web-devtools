import {
    GrpcAction, GrpcError, grpcError, requestHeaders, requestMessage, requestStart, responseEnd, responseHeaders,
    responseMessage, responseTrailers
} from "../actions/grpc";
import {BrowserHeaders, Code} from "grpc-web-client";

export type GrpcCall = {
    host: string | null,
    timestamp: number | null,
    requestHeaders: BrowserHeaders | null,
    requestMessages: any[],
    responseHeaders: BrowserHeaders | null,
    responseMessages: any[],
    responseTrailers: BrowserHeaders | null,
    grpcStatus: Code | null,
    errors: GrpcError[],
}

export type GrpcState = { [id: number]: GrpcCall };

const initialState = {};

function getOrCreate(state: GrpcState, key: number): GrpcCall {
    if (key in state) return state[key];
    return {
        grpcStatus: null,
        responseTrailers: null,
        responseHeaders: null,
        timestamp: null,
        host: null,
        responseMessages: [],
        requestMessages: [],
        errors: [],
        requestHeaders: null,
    };
}

export default function grpcReducer(state : GrpcState = initialState, action: GrpcAction) {

    if (action.type === requestStart.type) {
        const call = getOrCreate(state, action.payload.id);
        return {
            ...state,
            [action.payload.id]: {
                ...call,
                host: action.payload.host,
                timestamp: action.payload.timestamp,
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