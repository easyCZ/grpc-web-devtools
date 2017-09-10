
import {WindowMessage} from "./mpi";

const PAGE_SCRIPT_URL = chrome.extension.getURL('injected.js');

export function inject(url: string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = function(this: any, event: Event) {
        this.parentNode!.removeChild(this);  // remove ourselves to clean up
    };

    (document.head || document.documentElement).appendChild(script);
}

inject(PAGE_SCRIPT_URL);

// Relay messages from the injected scrip to the background page
window.addEventListener('message', function(event) {
    const data : WindowMessage = event.data;

    console.log('contentScript message', data);
    chrome.runtime.sendMessage(event.data);
});