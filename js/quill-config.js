const quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '',
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

// if (quill.hasFocus()) {
//     scrollSelectionIntoView()
// }

quill.on('text-change', function(delta, oldDelta, source) {
    const toolbarWordCount = document.querySelector('.data-word-count')
    const text = quill.getText()
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
    toolbarWordCount.textContent = 'Words: ' + wordCount       
});

const titleTextArea = document.getElementById('textarea-title')

function saveToLocalStorage() {
    const title = titleTextArea.value
    const text = quill.getText()

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("title", title)
        localStorage.setItem("contents", text)
        console.log(localStorage)
    } else {
        console.log("Sorry, your browser does not support Web Storage.")
    }
}

function loadFromLocalStorage() {
    if (typeof(Storage) !== 'undefined') {
      if (localStorage.getItem('title') && localStorage.getItem('contents')) {
        titleTextArea.textContent = localStorage.getItem('title')
        quill.setText(localStorage.getItem('contents'))
        setFont();
        setFontSize();
        // setMarginSize();
      }
      console.log("Loaded from localStorage.");
    } else {
      console.log("Sorry, your browser does not support Web Storage.");
    }
}

function newFile() {
    localStorage.removeItem('title')
    titleTextArea.value = ''
    localStorage.removeItem('contents')
    quill.setContents('\n')
    loadFromLocalStorage()
    location.reload();
}

function setFont() {
    if (localStorage.getItem('font-family')) {
      const font = localStorage.getItem('font-family')
      titleTextArea.style.fontFamily = font
  
      const allParagraphs = document.querySelectorAll('.ql-editor p')
      allParagraphs.forEach(p => {
        p.style.fontFamily = font
      });
  
      // Settings font
      const toolbar = document.querySelector('.toolbar')
      toolbar.style.fontFamily = font
  
      document.getElementById("font-selector").value = font
    }
}

function setFontSize() {
    if (localStorage.getItem('font-size')) {
      const fontSize = localStorage.getItem('font-size')
  
      titleTextArea.style.fontSize = fontSize
      
      const allParagraphs = document.querySelectorAll('.ql-editor p')
      allParagraphs.forEach(p => {
        p.style.fontSize = fontSize
      });

      const toolbar = document.querySelector('.toolbar')
      toolbar.style.fontSize = fontSize
  
      document.getElementById("font-selector").value = fontSize
    }
}

function setMarginSize() {
    if (localStorage.getItem('margin-size')) {
      const marginSize = localStorage.getItem('margin-size');
      const container = document.querySelector('.container');
      const percentageValue = parseFloat(marginSize);
      const complementValue = 100 - percentageValue;
      container.style.width = `${complementValue}%`;
    }
}

function readFileContents(file) {
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const contents = event.target.result;
      titleTextArea.innerText = file.name.slice(0, -4);
      quill.setText(contents);
      setTitle();
      getWordCount();
    };
  
    reader.onerror = function(event) {
      console.error("Error reading the file:", event.target.error);
    };
  
    reader.readAsText(file);
  }

loadFromLocalStorage()
window.setInterval(saveToLocalStorage, 1000)