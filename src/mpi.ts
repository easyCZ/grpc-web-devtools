import {Code, BrowserHeaders} from "grpc-web-client";
import {Message} from "google-protobuf";

export enum ActionType {
    REQUEST_START = "REQUEST_START",
    REQUEST_HEADERS = "REQUEST_HEADERS",
    REQUEST_MESSAGE = "REQUEST_MESSAGE",
    RESPONSE_HEADERS = "RESPONSE_HEADERS",
    RESPONSE_MESSAGE = "RESPONSE_MESSAGE",
    RESPONSE_TRAILERS = "RESPONSE_TRAILERS",
    RESPONSE_END = "RESPONSE_END",
    ERROR = "ERROR",
    INIT = "INIT",
}

export type InitMessage = {
    source: string,
    tabId: number,
    action: ActionType.INIT,
}

export type WindowMessagePayload = RequestStartPayload
    | BrowserHeaders
    | MessagePayload
    | ResponseHeadersPayload
    | ResponeEndPayload
    | ErrorPayload;

export type WindowMessage = {
    action: ActionType,
    id: number,
    payload: WindowMessagePayload,
}

export type RequestStartPayload = {
    host: string,
}

export type ResponseHeadersPayload = {
    headers: BrowserHeaders,
    httpStatus: number,
}

export type MessagePayload = {
    message: Message,
    object: any,
}

export type ResponeEndPayload = {
    code: Code | null,
};

export type ErrorPayload = {
    error: Error,
    code: Code,
}