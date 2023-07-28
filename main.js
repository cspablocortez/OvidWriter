const wordCountCell = document.getElementById('word_count');
const documentTitle = document.getElementById('document_title');
const documentContents = document.getElementById('editor');

const quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '~'
});

quill.on('text-change', function(delta, oldDelta, source) {
    const text = quill.getText();
    wordCountCell.innerText = "Words: " + text.trim().split(" ").length; 
});


function formatTime() {
    const d = new Date();
    let hours, minutes, seconds;
    
    if (d.getHours() < 10) {
        hours = "0" + d.getHours();
    } else {
        hours = d.getHours();
    }
    
    if (d.getMinutes() < 10) {
        minutes = "0" + d.getMinutes();
    } else {
        minutes = d.getMinutes();
    }
    
    if (d.getSeconds() < 10) {
        seconds = "0" + d.getSeconds();
    } else {
        seconds = d.getSeconds();
    }

    // 12 hour clock
    if (hours > 12) {
        hours = hours % 12;
        return hours + ":" + minutes + ":" + seconds + " PM";
    } else {
        return hours + ":" + minutes + ":" + seconds + " AM";
    }
}

function setTime() {
    const timeCell = document.getElementById('time');
    let time = formatTime();
    timeCell.innerHTML = time;
}

function setDate() {
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dateCell = document.getElementById('date');
    const d = new Date();
    dateCell.innerHTML = days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate();
}

function setTitle() {
    const titleCell = document.getElementById('title');
    const textAreaTitle = document.getElementById('document_title');
    titleCell.innerHTML = textAreaTitle.value; 
    if (textAreaTitle.value == "") {
        titleCell.innerHTML = "Document Title"
    }
}

function getWordCount() {
    if (wordCount < 1) {
        wordCountCell.innerHTML = "Words: 0";
        saveAsBtn.style.color = "black";
    } else {
        wordCountCell.innerHTML = "Words: " + wordCount;
        saveAsBtn.style.color = "white";
    }
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

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
    documentTitle.innerText = file.name.slice(0, -4);
    quill.setText(contents);
    setTitle();
    getWordCount();
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

setDate();
setTime();
window.setInterval(setTime, 1000);