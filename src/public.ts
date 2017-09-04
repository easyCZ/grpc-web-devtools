
// import {GrpcDebugger, MethodDefinition, RequestDebugger, Metadata, Code} from 'grpc-web-client';
import {Message} from "google-protobuf";
import {GrpcDebugger, MethodDefinition, RequestDebugger} from "../../ts/src/debug";
import {Code} from "../../ts/src/Code";


class GrpcWebExtensionRequestDebugger implements RequestDebugger {
    onHeaders(headers: Metadata): void {
        throw new Error("Method not implemented.");
    }

    onMessage(payload: Message): void {
        throw new Error("Method not implemented.");
    }

    onTrailers(metadata: Metadata): void {
        throw new Error("Method not implemented.");
    }

    onChunk(metadata: Metadata): void {
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
    request(id: number, host: string, method: MethodDefinition, metadata: Metadata, message: Message): RequestDebugger {
        return new GrpcWebExtensionRequestDebugger();
    }

}

(window as any).__GRPC_WEB_DEVTOOLS__ = new GrpcWebExtensionDebugger();

console.log('dbg', (window as any).__GRPC_WEB_DEVTOOLS__);
