import ExtensionPanel = chrome.devtools.panels.ExtensionPanel;


chrome.devtools.panels.create(
    "gRPC",
    './icon.png',
    "./panel.html",
    (panel: ExtensionPanel) => {

        // panel.onShown.addListener((window: chrome.windows.Window) => {
        //     // console.log('localStorage', window.localStorage)
        // })

        const connectionToBackground = chrome.runtime.connect({
            name: 'devtools',
        });

        connectionToBackground.postMessage({
            name: 'init',
            source: 'devtools',
            tabId: chrome.devtools.inspectedWindow.tabId,
        });
    }
);