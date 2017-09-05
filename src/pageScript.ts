/*
 * Gets injected onto a website to expose a debugger on the window object
 */
import {Message} from "google-protobuf";
import {GrpcDebugger, MethodDefinition, RequestDebugger, Code, BrowserHeaders} from "grpc-web-client";


class GrpcWebExtensionRequestDebugger implements RequestDebugger {

    onHeaders(headers: BrowserHeaders): void {
        window.postMessage(headers, '*');
        // throw new Error("Method not implemented.");
    }

    onTrailers(metadata: BrowserHeaders): void {
        window.postMessage(metadata, '*');
    }

    onChunk(metadata: BrowserHeaders): void {
        window.postMessage(metadata, '*');
        // throw new Error("Method not implemented.");
    }

    onMessage(payload: Message): void {
        window.postMessage(payload, '*');
        // throw new Error("Method not implemented.");
    }


    onEnd(grpcStatus: Code | null): void {
        window.postMessage(grpcStatus, '*');
        // throw new Error("Method not implemented.");
    }

    onError(code: Code, err: Error): void {
        window.postMessage({ code, err }, '*');
        // throw new Error("Method not implemented.");
    }

}

class GrpcWebExtensionDebugger implements GrpcDebugger {

    request(id: number, host: string, method: MethodDefinition, metadata: BrowserHeaders, message: Message): RequestDebugger {
        return new GrpcWebExtensionRequestDebugger();
    }

}

(window as any).__GRPC_WEB_DEVTOOLS__ = new GrpcWebExtensionDebugger();
