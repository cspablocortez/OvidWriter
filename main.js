const wordCountCell = document.getElementById('word_count');
const documentTitle = document.getElementById('document_title');
const documentContents = document.getElementById('editor');
let visibleFooter = true;
let bottomPadding = 0;

const quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '˙˙˙'
});

quill.on('text-change', function(delta, oldDelta, source) {
    const text = quill.getText();
    wordCountCell.innerText = "Words: " + text.trim().split(" ").length; 
});

function setTime() {
    const timeCell = document.getElementById('time');
    const now = new Date();
    const formatTime = (time) => (time < 10) ? `0${time}` : time;   
    const hour = now.getHours();
    const suffix = hour > 12 ? "PM" : "AM";
    timeCell.textContent = `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())} ${suffix}`
}

function setDate() {
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  reader.readAsText(file);
}

// Event listener to trigger file reading when a file is selected
document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    readFileContents(file);
  }
});


document.addEventListener('keydown', (event) => {
    // Check if the pressed keys are Command (Mac) or Control (Windows/Linux) and 'J'
    if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      const footer = document.getElementById('footer');
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
        document.getElementById('fileInput').click();
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


setDate();
setTime();
window.setInterval(setTime, 1000);