/*
 * Gets injected onto a website to expose a debugger on the window object
 */
import {Message} from "google-protobuf";
import {GrpcDebugger, MethodDefinition, RequestDebugger, Code, BrowserHeaders} from "grpc-web-client";


class GrpcWebExtensionRequestDebugger implements RequestDebugger {

    onHeaders(headers: BrowserHeaders): void {
        throw new Error("Method not implemented.");
    }

    onTrailers(metadata: BrowserHeaders): void {
        throw new Error("Method not implemented.");
    }

    onChunk(metadata: BrowserHeaders): void {
        throw new Error("Method not implemented.");
    }

    onMessage(payload: Message): void {
        throw new Error("Method not implemented.");
    }


    onEnd(grpcStatus: Code | null): void {
        throw new Error("Method not implemented.");
    }

    onError(code: Code, err: Error): void {
        throw new Error("Method not implemented.");
    }

}

class GrpcWebExtensionDebugger implements GrpcDebugger {

    request(id: number, host: string, method: MethodDefinition, metadata: BrowserHeaders, message: Message): RequestDebugger {
        return new GrpcWebExtensionRequestDebugger();
    }

}

(window as any).__GRPC_WEB_DEVTOOLS__ = new GrpcWebExtensionDebugger();
