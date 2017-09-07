
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

window.addEventListener('message', function(event) {
    console.log('content Script', event.data.source, event.data);

    chrome.runtime.sendMessage({greeting: "hello"});

    const port = chrome.runtime.connect({ name: 'content' });
    port.postMessage(event);


    // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    //     console.log('content Script', response);
    // });
});