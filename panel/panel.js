const input = document.getElementById('filesToUpload')
const button = document.getElementById('process')

console.log('elems', input, button)

function readFile(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function(evnt) {
          console.log('onload', evnt)

          resolve(evnt.target.result)
      }

      reader.onerror = function(evnt) {
        console.error('Failed to read file', evnt)
        reject(evnt);
      }

      // Read in the image file as a data URL.
      reader.readAsText(file);
    })
}

const protos = {}
console.log(protos)

input.addEventListener('change', (evnt) => {
    console.log('input change', evnt)
    const files = evnt.target.files;

    for (var i = 0, numFiles = files.length; i< numFiles; i++) {
        const file = files[i];

        var fileContents = readFile(file)
            .then(txt => {
                protos[file.name] = protobuf.parse(txt, { filename: file.name })
            })
            .then(() => {
                console.log('protos', protos)
            })
    }

}, false)

chrome.devtools.network.onRequestFinished.addListener(request => {
    const { headers } = request.request;

    // only grpc calls      
    if (headers.filter(header => header.name === 'content-type' && header.value === "application/grpc-web+proto").length === 0) {
        return
    }

    const url = new URL(request.request.url)
    let pathname = url.pathname;

    if (pathname.startsWith('/')) {
        pathname = pathname.slice(1)
    }
    const method = pathname.replace(/\//, '.')  // / -> .
    new Promise((resolve, reject) => {
        request.getContent((content, encoding) => {
            // debugger;
            var raw = window.atob(content);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));

            for(i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }

            resolve(array);
        });   
    })
    .then(payload => {
        Object.values(protos)
            .map(root => {
                const serviceMethod = root.root.lookup(method)
                const responseType = root.root.lookup(serviceMethod.responseType)

                const decoded = responseType.decodeDelimited(payload)

                debugger;
            })    
    })

    
})

