
import {RequestStartPayload} from "../../mpi";

export const MESSAGE = 'MESSAGE';
export const DECREMENT_SFC = 'DECREMENT_SFC';
export const REQUEST_START = 'REQUEST_START';

export type MessageAction = {
    type: typeof REQUEST_START,
    payload: RequestStartPayload,
}

export type Actions = {
    MESSAGE: {
        type: typeof MESSAGE,
        payload: any,
    },
    DECREMENT_SFC: {
        type: typeof DECREMENT_SFC,
    },
};

export function receiveMessage(msg: any): Actions[typeof MESSAGE] {
    return {
        type: MESSAGE,
        payload: msg,
    }
}

export function requestStart(id: number, payload: RequestStartPayload): MessageAction {
    return {
        type: REQUEST_START,
        payload,
    }
}