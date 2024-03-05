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

if (quill.hasFocus()) {
    scrollSelectionIntoView()
    console.log('scrollSelectionIntoView called')
}

quill.on('text-change', function(delta, oldDelta, source) {
    const toolbarWordCount = document.querySelector('.data-word-count')
    const text = quill.getText()
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
    toolbarWordCount.textContent = 'Words: ' + wordCount       
});