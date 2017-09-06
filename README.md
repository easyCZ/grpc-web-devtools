# grpchrome
gRPC Debugger for Chrome

**Very very much work in progress.**

## Usage
1. Clone
2. Load as unpacked extension into chrome at chrome://extensions
3. On a page, open dev tools and switch to gRPC tab
4. Load in the protobuf definitions the site uses
5. Refresh the page with the extension open (alternatively open dev tools for the extension (inspector in detached moted)) - most work is in the console 


## Structure

### Devtools
Responsible for initialization of a gRPC developer tools panel `devtools.js & devtools.html`

### Panel
Actual panel implementation inside the chrome developer tools

### Inject
Injects `pageScript.ts` into currently rendered page to attach `window.__GRPC_WEB_DEVTOOLS__` to the window and make it accessible to the client application

### Page script
Implements MPI to talk to the panel
