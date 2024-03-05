function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function downloadTextAsFile() {
    localStorage.clear();
    let textToSave = quill.getText();
    let textToSaveAsBlob = new Blob([textToSave], {type:'text/plain'});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    const titleTextArea = document.getElementById('textarea-title')
    let fileNameToSaveAs = titleTextArea.value;
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

// Event listener to trigger file reading when a file is selected
document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    readFileContents(file);
  }
});

function openFile() {
  document.getElementById('fileInput').click();
}

let visibleFooter = true;
let bottomPadding = 0;
document.addEventListener('keydown', (event) => {
    // Check if the pressed keys are Command (Mac) or Control (Windows/Linux) and 'J'
    if ((event.metaKey || event.ctrlKey) && (event.key === '0' || event.key === 'j')) {
      const footer = document.querySelector('.toolbar');
      if (visibleFooter) {
          footer.style.visibility = 'hidden';
          visibleFooter = false;
        } else {
          footer.style.visibility = 'visible';
          visibleFooter = true;
      }
    }

    // Save document with Ctrl + S
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        downloadTextAsFile();
    }

    // Open document with Ctrl + O
    if ((event.metaKey || event.ctrlKey) && event.key === 'o') {
        openFile();
      }

    // Move margin up 
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        const editor = document.getElementById('editor');
        bottomPadding += 1;
        editor.style.paddingBottom = `${bottomPadding}rem`;
      }

      // Move margin down
      if ((event.metaKey || event.ctrlKey) && event.key === '.') {
        const editor = document.getElementById('editor');
        bottomPadding -= 1;
        editor.style.paddingBottom = `${bottomPadding}rem`;
      }

});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
