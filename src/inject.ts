
const PAGE_SCRIPT_URL = chrome.extension.getURL('pageScript.js');

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

window.addEventListener('message', (event) => {
    console.log('message', event);
}, false);