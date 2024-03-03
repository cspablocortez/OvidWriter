let wordCount          = 0;
const wordCountCell    = document.getElementById('word_count');
const titleCell        = document.getElementById('title');
const documentTitle    = document.getElementById('document_title');
const documentContents = document.getElementById('editor');
const settingsButton   = document.getElementById('settings-btn');
const dateCell = document.getElementById('date');


const quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '...',
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
    wordCount = text.trim().split(" ").length;
    wordCountCell.innerText = `Words: ${wordCount}`;
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
    const d = new Date();
    dateCell.innerHTML = days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate();
}

function setTitle() {
    console.log('Start setTitle() function')
    titleCell.innerHTML = documentTitle.value;
    if (documentTitle.value == '') {
      titleCell.innerHTML = 'Untitled'
    } 
}

function getWordCount() {
  const mobileWordCount = document.querySelector('.word_count')
  if (wordCount <= 2 || undefined) {
    wordCount = 0;
      wordCountCell.innerHTML = "Words: 0";
      mobileWordCount.innerHTML = "Words: 0";
  } else {
      wordCountCell.innerHTML = "Words: " + wordCount;
      mobileWordCount.innerHTML = "Words: " + wordCount;
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
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.getItem('title') && localStorage.getItem('contents')) {
      documentTitle.textContent = localStorage.getItem('title') // turn into another quill obj?
      quill.setText(localStorage.getItem('contents'))
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

function newFile() {
  localStorage.removeItem('title')
  documentTitle.value = ''
  setTitle()

  localStorage.removeItem('contents')
  quill.setContents('\n')
  
  loadFromLocalStorage()
  getWordCount()
  
  location.reload();
}

setDate();
setTime();
loadFromLocalStorage();
window.setInterval(setTime, 1000);
window.setInterval(saveToLocalStorage, 1500);