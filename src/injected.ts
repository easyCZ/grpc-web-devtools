/*
 * Gets injected onto a website to expose a debugger on the window object
 */
import {Message} from "google-protobuf";
import {Debugger, DebuggerProvider, Code, BrowserHeaders, grpc} from "grpc-web-client";
import {
    grpcError,
    requestHeaders,
    requestMessage,
    requestStart,
    responseEnd,
    responseHeaders,
    responseMessage,
    responseTrailers
} from './app/actions/grpc';
import {Action} from "redux";


function sendToContentScript(action: Action) {
    return window.postMessage(action, '*');
}

class WebToolsDebugger implements Debugger {

    private readonly id: number;
    private timestamp: number;
    private method: grpc.MethodDefinition<Message, Message>;

    constructor(id: number) {
        this.id = id;
    }

    onRequestStart(host: string, method: grpc.MethodDefinition<Message, Message>): void {
        this.method = method;
        this.timestamp = Date.now();

        sendToContentScript(requestStart.create({
          id: this.id,
          host,
          timestamp: this.timestamp,
        }));
    }

    onRequestHeaders(headers: BrowserHeaders): void {
        sendToContentScript(requestHeaders.create({
            id: this.id,
            headers,
        }));
    }

    onRequestMessage(payload: Message): void {
        sendToContentScript(requestMessage.create({
            id: this.id,
            message: payload.toObject(),
        }));
    }

    onResponseHeaders(headers: BrowserHeaders, httpStatus: number): void {
        sendToContentScript(responseHeaders.create({
            id: this.id,
            headers, httpStatus,
        }));
    }

    onResponseMessage(payload: Message): void {
        sendToContentScript(responseMessage.create({
            id: this.id,
            message: payload.toObject(),
        }));
    }

    onResponseTrailers(metadata: BrowserHeaders): void {
        sendToContentScript(responseTrailers.create({
            id: this.id,
            trailers: metadata,
        }));
    }

    onResponseEnd(grpcStatus: Code | null): void {
        sendToContentScript(responseEnd.create({
            id: this.id,
            grpcStatus,
        }));
    }

    onError(code: Code, err: Error): void {
        sendToContentScript(grpcError.create({
            id: this.id,
            code,
            error: err,
        }));
    }

}

class WebToolsDebuggerProvider implements DebuggerProvider {

    getInstanceForRequest(id: number): Debugger {
        return new WebToolsDebugger(id);
    }

}

const win = window as any;
win.__GRPC_WEB_DEVTOOLS__ = new WebToolsDebuggerProvider();

if (win.grpc) {
    win.grpc.registerDebugger(win.__GRPC_WEB_DEVTOOLS__);
}
