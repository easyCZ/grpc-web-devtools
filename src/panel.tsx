import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Action, createStore} from 'redux';
import reducers, {RootState} from './app/reducers';
import App from './app';

import Port = chrome.runtime.Port;
import {extensionInit} from './app/actions/extension';
import {GrpcAction} from './app/actions/grpc';

const store = createStore<RootState>(reducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

let connectionToBackground: Port;

// For development without extension
if (process.env.STANDALONE) {
  connectionToBackground = chrome.runtime.connect({
    name: 'panel',
  });

  dispatchToBackground(extensionInit.create({
    tabId: chrome.devtools.inspectedWindow.tabId,
    source: 'panel',
  }));

  connectionToBackground.onMessage.addListener((message: Object, port: Port) => {
    console.log('Received message in panel.', message);
    const action = message as GrpcAction;
    store.dispatch(action);
  });
}

export function dispatchToBackground(action: Action): void {
  connectionToBackground.postMessage(action);
}
