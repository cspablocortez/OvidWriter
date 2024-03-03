const wordCountCell    = document.getElementById('word_count');
const documentTitle    = document.getElementById('document_title');
const documentContents = document.getElementById('editor');
const settingsButton   = document.getElementById('settings-btn');


const quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '˙˙˙',
    modules: {
      keyboard: {
        bindings: {
          list: false,
          'list autofill': {
            key: '',
            format: ['list'],
            prefix: /^\s*?(\d+\.|-|\*|\+|\[ \]|\[x\])$/,
            handler: () => {}
        }
      }
    }
  }
});

quill.on('text-change', function(delta, oldDelta, source) {
    const text = quill.getText();
    wordCountCell.innerText = "Words: " + text.trim().split(" ").length; 
});

// END QUILL SETTINGS //

function setTime() {
    const timeCell = document.getElementById('time');
    const now = new Date();
    const formatTime = (time) => (time < 10) ? `0${time}` : time;   
    const hour = now.getHours();
    // const suffix = hour > 12 ? "PM" : "AM";
    timeCell.textContent = `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`
}

function setDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
    localStorage.clear();
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

let visibleFooter = true;
let bottomPadding = 0;
document.addEventListener('keydown', (event) => {
    // Check if the pressed keys are Command (Mac) or Control (Windows/Linux) and 'J'
    if ((event.metaKey || event.ctrlKey) && (event.key === '0' || event.key === 'j')) {
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


function saveToLocalStorage() {
  const title = documentTitle.value;
  const text = quill.getText();

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("title", title);
    localStorage.setItem("contents", text);
    console.log("Saved to localStorage.");
  } else {
    console.log("Sorry, your browser does not support Web Storage.");
  }
}

function loadFromLocalStorage() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem('contents')) {
      const title = localStorage.getItem("title");
      const contents = localStorage.getItem("contents");
      if (contents == "") {
        quill.setText(contents);
      } else {
        quill.setText("...")
      }
      documentTitle.textContent = title;
      setFont();
      setFontSize();
      setMarginSize();
    }
    console.log("Loaded from localStorage.");
  } else {
    console.log("Sorry, your browser does not support Web Storage.");
  }

}

function setFont() {
  if (localStorage.getItem('font-family')) {
    const font = localStorage.getItem('font-family');

    // Title font
    documentTitle.style.fontFamily = font; 

    // Body font
    const allParagraphs = document.querySelectorAll('.ql-editor p');
    allParagraphs.forEach(p => {
      p.style.fontFamily = font;
    });

    // Footer font
    footer.style.fontFamily = font;

    // Settings font
    const settingsModal = document.getElementById('settings-modal');
    settingsModal.style.fontFamily = font;

    document.getElementById("font-selector").value = font;
  }
}

function setFontSize() {
  if (localStorage.getItem('font-size')) {
    const fontSize = localStorage.getItem('font-size');

    // Body font
    const allParagraphs = document.querySelectorAll('.ql-editor p');
    allParagraphs.forEach(p => {
      p.style.fontSize = fontSize;
    });
  }
}

function setMarginSize() {
  if (localStorage.getItem('margin-size')) {
    const marginSize = localStorage.getItem('margin-size');

    // Body margin
    const container = document.getElementById('document');
    container.style.marginLeft = marginSize;
    container.style.marginRight = marginSize;
  }
}

setDate();
setTime();
loadFromLocalStorage();
window.setInterval(setTime, 1000);
window.setInterval(saveToLocalStorage, 1000);