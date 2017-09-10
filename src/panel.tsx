import * as React from 'react';
import { render } from 'react-dom';
import App from './app';

import Port = chrome.runtime.Port;
import {ActionType, InitMessage} from "./mpi";

const connectionToBackground = chrome.runtime.connect({
    name: 'panel',
});

sendBackgroundMessage({
    action: ActionType.INIT,
    source: 'panel',
    tabId: chrome.devtools.inspectedWindow.tabId,
});

render(
    <App />,
    document.getElementById('root')
);

connectionToBackground.onMessage.addListener((message: Object, port: Port) => {
    console.log('Received message in panel.', message);
});

export function sendBackgroundMessage(message: InitMessage): void {
    connectionToBackground.postMessage(message);
}