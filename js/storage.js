const titleTextArea = document.getElementById('textarea-title')

loadFromLocalStorage()
saveToLocalStorage()
window.setInterval(saveToLocalStorage, 1000)

function loadFromLocalStorage() {
      if (localStorage.getItem('title') && localStorage.getItem('contents')) {
        titleTextArea.textContent = localStorage.getItem('title')
        quill.setText(localStorage.getItem('contents'))
    } else {
        console.log('Nothing to load yet.');
    }
    updateUI();
}

function updateUI() {
    setFont();
    setFontSize();
    setMarginSize();
    setBackgroundColor();
}

function setFont() {
    if (localStorage.getItem('font-family')) {
      const font = localStorage.getItem('font-family')
      titleTextArea.style.fontFamily = font
  
      const allParagraphs = document.querySelectorAll('.ql-editor p')
      allParagraphs.forEach(p => {
        p.style.fontFamily = font
      });
  
      const toolbar = document.querySelector('.toolbar')
      toolbar.style.fontFamily = font
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

function setBackgroundColor() {
    let textColor = '#00000'
    if (localStorage.getItem('background-color')) {
        const bgColor = localStorage.getItem('background-color')
        document.body.style.backgroundColor = bgColor
        
        if (bgColor == 'rgb(44, 41, 45)') {
            console.log('dark mode')
            textColor = '#ffffff'
            
        } else {
            console.log('light mode')
            textColor = '#000000'
        }
    }
    titleTextArea.style.color = textColor
    const allParagraphs = document.querySelectorAll('.ql-editor p')
    allParagraphs.forEach(p => {
      p.style.color = textColor
    }); 
}

function saveToLocalStorage() {
    const title = titleTextArea.value
    const text = quill.getText()
    const style = window.getComputedStyle(titleTextArea)
    const fontFamily = style.fontFamily
    const fontSize = style.fontSize
    const bgColor = document.body.style.backgroundColor
   
    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem('title', title)
        localStorage.setItem('contents', text)
        localStorage.setItem('font-family', fontFamily)
        localStorage.setItem('font-size', fontSize)
        localStorage.setItem('background-color', bgColor)
        updateUI()
    } else {
        alert('Sorry, your browser does not support Web Storage.')
    }
    // console.log(localStorage)
}


function newFile() {
    localStorage.removeItem('title')
    localStorage.removeItem('contents')
    // Preserves styles
    // localStorage.removeItem('font-family')
    // localStorage.removeItem('font-size')
    // localStorage.removeItem('background-color')
    titleTextArea.value = ''
    quill.setContents('\n')
    loadFromLocalStorage()
    location.reload();
    console.log('New file created.')
}

function readFileContents(file) {
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const contents = event.target.result;
      titleTextArea.textContent = file.name.slice(0, -4);
      quill.setText(contents);
      setTitle();
      getWordCount();
    };
  
    reader.onerror = function(event) {
      console.error('Error reading the file:', event.target.error);
    };
  
    reader.readAsText(file);
}