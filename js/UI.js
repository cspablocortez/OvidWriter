// const shakespeare = document.getElementById('shakespeare')
const editorDiv = document.getElementById('editor')
const ql_editor = document.querySelector('.ql-editor')
const containerDiv = document.querySelector('.container')
// const titleTextArea = document.getElementById('textarea-title')
const userAgent = navigator.userAgent || window.opera;
const toolbarTitle = document.querySelector('.data-title')
const toolbarWordCount = document.querySelector('.data-word-count')
const toolbarDate = document.querySelector('.data-date')
const toolbarTime = document.querySelector('.data-time')

if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    ql_editor.addEventListener('focus', () => {
        shakespeare.style.display = 'none'
        containerDiv.classList.add('touch-keyboard-on')
        editorDiv.classList.add('touch-keyboard-on')
    })
    
    ql_editor.addEventListener('blur', () => {
        shakespeare.style.display = 'inline-block'
        containerDiv.classList.remove('touch-keyboard-on')
        editorDiv.classList.add('touch-keyboard-on')
    })
}

const toolbar = {
    setTime: () => {
        const now = new Date()
        const formatTime = (time) => (time < 10) ? `0${time}` : time
        const hour = now.getHours()
        const suffix = hour > 12 ? 'PM' : 'AM'
        toolbarTime.textContent = `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())} ${suffix}`
    },
    setDate: () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const d = new Date()
        toolbarDate.innerHTML = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate()
    },
    update: function () {
        toolbar.setTime()
        toolbar.setDate()
    }
}
toolbar.update()
window.setInterval(toolbar.update, 1000);

