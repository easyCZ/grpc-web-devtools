import Port = chrome.runtime.Port;
import MessageSender = chrome.runtime.MessageSender;
import {ActionType, InitMessage } from "./mpi";

const connections: { [portName: string]: Port } = {};


chrome.runtime.onConnect.addListener((port: Port) => {

    const extensionListener = (message: Object, port: Port) => {
        console.log('Received onConnect', message);

        if ((message as any).action === ActionType.INIT) {
            const initMessage = message as InitMessage;
            console.log('Got connection init from', initMessage.source, 'Tab ID:', initMessage.tabId);

            connections[initMessage.tabId] = port;
            return;
        }
    };

    port.onMessage.addListener(extensionListener);
    port.onDisconnect.addListener((port: Port) => {
        port.onMessage.removeListener(extensionListener);

        const tabs = Object.keys(connections);
        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];

            if (connections[tab] === port) {
                delete connections[tab];
                break;
            }
        }
    });

});

// message relay
chrome.runtime.onMessage.addListener((message: any, sender: MessageSender) => {
    if (sender && sender.tab && sender.tab.id === null) return;

    console.log('Received message from tab ID:', sender.tab!.id, message);

    if (sender.tab) {
        const tabId = sender.tab.id;

        if (tabId && tabId in connections) {
            connections[tabId].postMessage(message);
        } else {
            console.warn('Tab not found in connection list.');
        }
    }

    return true;
});
