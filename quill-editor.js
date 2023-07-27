let wordCountCell = document.getElementById('word_count');
let documentTitle = document.getElementById('document_title');
let documentContents = document.getElementById('editor');

let quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '~'
});

function downloadTextAsFile() {
    let textToSave = quill.getText();
    let textToSaveAsBlob = new Blob([textToSave], {type:'text/plain'});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = documentTitle.value;
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}


function readFileContents(file) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const contents = event.target.result;

    // Populate Title
    documentTitle.innerText = file.name.slice(0, -4);

    // Populate Body
    quill.setText(contents);
  };

  reader.onerror = function(event) {
    console.error("Error reading the file:", event.target.error);
  };

  // Read the file as text
  reader.readAsText(file);
}

// Event listener to trigger file reading when a file is selected
document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    readFileContents(file);
  }
});


quill.on('text-change', function(delta, oldDelta, source) {
  if (source == 'user') {
    let text = quill.getText();
    wordCountCell.innerText = "Words: " + text.trim().split(" ").length; 
  }
});