# gRPC Web Devtools
This an extension to support debugging of [grpc-web](https://github.com/improbable-eng/grpc-web) from the browser. It is using an exposed debugger interface which is currently in [development](https://github.com/easyCZ/grpc-web/tree/debugger).

The vision is to be able to debug gRPC web as easily as it is to use the Network tab in Chrome. To do this, we'd like to hear your use cases for the debugger. Please raise an issue :)

**Very very much work in progress.**

## Dev
1. `npm i && npm run compile` or `npm run watch`
2. Checkout https://github.com/easyCZ/grpc-web/tree/debugger and switch to the `debugger` branch
3. In `grpc-web` run `cd ts && npm run lib:build && npm link` to create a symlink to the grpc web with the new debugger interface
4. In `grpc-web-devtools` do `npm run link grpc-web-client`
5. Load unpacked chrome extension from `grpc-web-devtools/build`
6. Run the example in `grpc-web/example` with `npm run start`
7. Visit the example page and open devtools, you should see a `gRPC` tab


## Structure

### Devtools
Responsible for initialization of a gRPC developer tools panel `devtools.js & devtools.html`

### Panel
Actual panel implementation inside the chrome developer tools

### Inject
Injects `injected.ts` into currently rendered page to attach `window.__GRPC_WEB_DEVTOOLS__` to the window and make it accessible to the client application

### Page script
Implements MPI to talk to the panel


