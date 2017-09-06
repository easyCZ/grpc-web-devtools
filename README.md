# grpchrome
gRPC Debugger for Chrome as an extension

**Very very much work in progress.**

## Dev
1. `npm i && npm run compile` or `npm run watch`
2. Load unpacked chrome extension from `grpc-web-devtools/build`
3. Checkout https://github.com/easyCZ/grpc-web/tree/debugger and switch to the `debugger` branch
4. In `grpc-web/ts` run `npm run build:lib && npm link` to create a symlink to the grpc web with the new debugger interface
5. Run the example in `grpc-web/example` with `npm run start`
6. Visit the example page and open devtools
