/*
 * Gets injected onto a website to expose a debugger on the window object
 */
import {Message} from "google-protobuf";
import {Debugger, DebuggerProvider, Code, BrowserHeaders, grpc} from "grpc-web-client";
import {ActionType, WindowMessage} from "./mpi";


function sendToContentScript(windowMessage: WindowMessage) {
    return window.postMessage(windowMessage, '*');
}

class WebToolsDebugger implements Debugger {

    private readonly id: number;
    private method: grpc.MethodDefinition<Message, Message>;

    constructor(id: number) {
        this.id = id;
    }

    onRequestStart(host: string, method: grpc.MethodDefinition<Message, Message>): void {
        this.method = method;

        sendToContentScript({
            id: this.id,
            action: ActionType.REQUEST_START,
            payload: { host }
        });
    }

    onRequestHeaders(headers: BrowserHeaders): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.REQUEST_HEADERS,
            payload: headers,
        })
    }

    onRequestMessage(payload: Message): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.REQUEST_MESSAGE,
            payload: {
                message: payload,
                object: payload.toObject()
            },
        })
    }

    onResponseHeaders(headers: BrowserHeaders, httpStatus: number): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.RESPONSE_HEADERS,
            payload: { headers, httpStatus },
        })
    }

    onResponseMessage(payload: Message): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.RESPONSE_MESSAGE,
            payload: {
                message: payload,
                object: payload.toObject()
            },
        })
    }

    onResponseTrailers(metadata: BrowserHeaders): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.RESPONSE_TRAILERS,
            payload: metadata,
        })
    }

    onResponseEnd(grpcStatus: Code | null): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.RESPONSE_END,
            payload: { code: grpcStatus },
        })
    }

    onError(code: Code, err: Error): void {
        sendToContentScript({
            id: this.id,
            action: ActionType.ERROR,
            payload: { code, error: err }
        })
    }

}

class WebToolsDebuggerProvider implements DebuggerProvider {

    getInstanceForRequest(id: number): Debugger {
        return new WebToolsDebugger(id);
    }

}

(window as any).__GRPC_WEB_DEVTOOLS__ = new WebToolsDebuggerProvider();
