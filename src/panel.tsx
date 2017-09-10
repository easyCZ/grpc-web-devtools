import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers, {RootState} from './app/reducers';
import {Code, BrowserHeaders} from "grpc-web-client";

import App from './app';

import Port = chrome.runtime.Port;
import {ActionType, InitMessage, RequestStartPayload, WindowMessage} from "./mpi";
import {receiveMessage, requestStart} from "./app/actions/grpc";

const connectionToBackground = chrome.runtime.connect({
    name: 'panel',
});

sendBackgroundMessage({
    action: ActionType.INIT,
    source: 'panel',
    tabId: chrome.devtools.inspectedWindow.tabId,
});

const store = createStore<RootState>(reducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


connectionToBackground.onMessage.addListener((message: Object, port: Port) => {
    // const dispatch = store.dispatch;
    // const msg = message as any;
    //
    // if (msg.action && msg.id && msg.payload) {
    //     const { id, payload, action } = msg as WindowMessage;
    //
    //     switch (action) {
    //         case ActionType.REQUEST_START:
    //             return dispatch(requestStart(id, payload as RequestStartPayload));
    //
    //         case ActionType.REQUEST_HEADERS:
    //             return dispatch(requestHeaders(id, payload));
    //
    //         case ActionType.REQUEST_MESSAGE:
    //             return dispatch(requestMessage(id, payload));
    //     }
    // }

    console.log('Received message in panel.', message);
    store.dispatch(receiveMessage(message));

});

export function sendBackgroundMessage(message: InitMessage): void {
    connectionToBackground.postMessage(message);
}