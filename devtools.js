chrome.devtools.panels.create(
    "gRPC", 
    null,
    "panel/panel.html",
    (panel) => {
      console.log('Created a gRPC panel')
    }
);
