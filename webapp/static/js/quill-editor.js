let wordCountCell = document.getElementById('word_count');
let documentTitle = document.getElementById('document_title');
let documentContents = document.getElementById('editor');

let quill = new Quill('#editor', {
    theme: 'bubble'
});

function downloadTextAsFile(quill) {
    console.log('Download function executed...');
    let text = documentContents.innerHTML;
    console.log(text);
    // let documentContents = document.getElementById('document_body');
    // let textToSave = documentContents.innerHTML.trim();
    // let textToSaveAsBlob = new Blob([textToSave], {type:'text/plain'});
    // let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    // let fileNameToSaveAs = documentTitle.value;
    // let downloadLink = document.createElement('a');
    // downloadLink.download = fileNameToSaveAs;
    // downloadLink.href = textToSaveAsURL;
    // downloadLink.onclick = destroyClickedElement;
    // downloadLink.style.display = "none";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
}

quill.on('text-change', function(delta, oldDelta, source) {
  if (source == 'user') {
    let text = quill.getText();
    wordCountCell.innerText = "Words: " + text.trim().split(" ").length; 
  }
});