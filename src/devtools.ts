import ExtensionPanel = chrome.devtools.panels.ExtensionPanel;

chrome.devtools.panels.create(
    "gRPC",
    './icon.png',
    "./panel.html",
    (panel: ExtensionPanel) => {

        const port = chrome.runtime.connect({ name: 'devtools' });

        let win;
        port.onMessage.addListener(msg => {
            console.log('devtools', msg);
            if (win) {
                win.test(msg);
            }
        })

        panel.onShown.addListener((window) => {
            win = window;
            window.test('hello');
        })

        console.log('Created a gRPC panel', panel)
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('devtools', sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });