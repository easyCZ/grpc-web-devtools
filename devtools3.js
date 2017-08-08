
chrome.devtools.panels.create(
    "gRPC", 
    null,
    "panel.html",
    function(panel) {
        console.log(panel)

    }
);   

function log(msg) {
    return chrome.devtools.inspectedWindow.eval(
        'console.log("' + msg + '")')
}

chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        log(request.request.url)
    }
);

const requests = []

const input = document.getElementById('filesToUpload')
const button = document.getElementById('process')
const pre = document.getElementById('pre')


input.addEventListener('click', (evnt) => {
    console.log(requests)
})

input.addEventListener('change', (evnt) => {
    const files = evnt.target.files;
    
    for (var i = 0, numFiles = files.length; i< numFiles; i++) {
        const file = files[i];
        var tempUrl = window.URL.createObjectURL(file);

        // console.log('parsed', protobuf.parse(tempurl))

        protobuf.load(tempUrl, (err, root) => {
            log('loaded ' + tempUrl)
            if (err)
                console.error(err)
            else {
                // debugger
                log(root.nested)

                const BookService = root.lookupService("examplecom.library.BookService")
                const Book = root.lookupType("examplecom.library.Book") log(BookService, Book)

            }
        })    
    }
    

    console.log(files)

}, false)

window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    log(messageOrEvent)
}


function log(msg) {
    const cnt = pre.textContent
    pre.textContent = cnt + "\n \n" + msg
    pre.textContent 
    if (chrome && chrome.devtools && chrome.devtools.inspectedWindow) {
        return chrome.devtools.inspectedWindow.eval(
        'console.log("' + msg + '")')    
    }
    return console.log(msg)
}


// if (chrome && chrome.devtools && chrome.devtools.network) {
//     chrome.devtools.network.onRequestFinished.addListener(
//         function(request) {
            
//             request.getContent((content, encoding) => {
//                 log(content)
//                 log(encoding)
//                 requests.push(content)
//             })
//         }
//     );
// }



