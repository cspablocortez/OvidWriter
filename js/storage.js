const titleTextArea = document.getElementById('textarea-title')

loadFromLocalStorage()
saveToLocalStorage()
window.setInterval(() => console.log('hi'), 1000)
window.setInterval(saveToLocalStorage, 1000)

function loadFromLocalStorage() {
      if (localStorage.getItem('title') && localStorage.getItem('contents')) {
        titleTextArea.textContent = localStorage.getItem('title')
        quill.setText(localStorage.getItem('contents'))
        updateUI();
    } else {
        console.log('Nothing to load yet.');
    }
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
    
    if (localStorage.getItem('background-color')) {
        const bgColor = localStorage.getItem('background-color')
        console.log(bgColor)
        document.body.style.backgroundColor = bgColor
        
        if (bgColor == '#000000' || bgColor == 'rgb(53, 53, 53)') {
            console.log('dark mode')
            const lightTextColor = '#ffffff'
            titleTextArea.style.color = lightTextColor
            const allParagraphs = document.querySelectorAll('.ql-editor p')
            allParagraphs.forEach(p => {
              p.style.color = lightTextColor
            }); 
        } else {
            console.log('light mode')
            const darkTextColor = '#000000'
            titleTextArea.style.color = darkTextColor
            const allParagraphs = document.querySelectorAll('.ql-editor p')
            allParagraphs.forEach(p => {
              p.style.color = darkTextColor
            }); 
        }
    }
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
    localStorage.removeItem('font-family')
    localStorage.removeItem('font-size')
    localStorage.removeItem('background-color')
    titleTextArea.value = ''
    quill.setContents('\n')
    loadFromLocalStorage()
    // location.reload();
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