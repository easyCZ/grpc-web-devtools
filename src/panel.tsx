import * as React from 'react';
import { render } from 'react-dom';
import App from './app';


render(
    <App />,
    document.getElementById('root')
);

window.test = (x) => console.log(x);

// var port = chrome.extension.connect({
//     name: "Sample Communication" //Given a Name
// });

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//         console.log(response.farewell);
//     });
// });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });

const port = chrome.runtime.connect({ name: 'panel' });
port.onMessage.addListener((msg, prt) => {
    console.log('got message', msg, prt);
    document.body.innerText = JSON.stringify(msg);
})
