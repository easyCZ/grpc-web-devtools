import Port = chrome.runtime.Port;
import MessageSender = chrome.runtime.MessageSender;
import {ExtensionAction, extensionInit } from './app/actions/extension';
import {GrpcAction} from './app/actions/grpc';

const connections: { [portName: string]: Port } = {};

type Action = GrpcAction | ExtensionAction;

chrome.runtime.onConnect.addListener((port: Port) => {

    const extensionListener = (message: Object, port: Port) => {
        console.log('Received onConnect', message);

        const action = message as Action;

        if (action.type === extensionInit.type) {
            console.debug('Got connection init from', action.payload.source, 'Tab ID:', action.payload.tabId);

            connections[action.payload.tabId] = port;
            return;
        }

        // if (action.type === extensionShow.type) {
        //     console.debug('Extension shown');
        //     return;
        // }
        //
        // if (action.type === extensionHide.type) {
        //     console.debug('Extension hidden');
        // }

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

    if (sender.tab) {
        const tabId = sender.tab.id;

        if (tabId && tabId in connections) {
            connections[tabId].postMessage(message);
        }
    }

    return true;
});
