import Port = chrome.runtime.Port;

console.log('background');

const ports: { [portName: string]: Port } = {};

chrome.runtime.onConnect.addListener((port: Port) => {
    console.log('Received connection from', port.name);

    if (port.name !== 'devtools') return;

    ports[port.name] = port;

    port.onDisconnect.addListener(() => {
        delete ports[port.name];
    });

    port.onMessage.addListener((message: Object, port: Port) => {
        console.log('received message from devtools page', message);
        notifyDevtools(message);
    })
})

function notifyDevtools(msg) : void {
    Object.keys(ports)
        .forEach(key => {
            ports[key].postMessage(msg);
        })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        notifyDevtools(request);
        console.log('background',request, sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });