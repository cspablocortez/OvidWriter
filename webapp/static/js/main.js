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
    
    return hours + ":" + minutes + ":" + seconds;
}


function setTime() {
    const timeCell = document.getElementById('time');
    let time = formatTime();
    timeCell.innerHTML = time;
    console.log(time);
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
    console.log(textAreaTitle.value);
    if (textAreaTitle.value == "") {
        titleCell.innerHTML = "Document Title"
    }
}

function getWordCount() {
    let textAreaContents = document.getElementById('document_body');
    let wordCountCell = document.getElementById('word_count');
    let wordCount = textAreaContents.value.split(" ").length - 1;
    
    if (wordCount < 1) {
        wordCountCell.innerHTML = "Words: 0";
    } else {
        wordCountCell.innerHTML = "Words: " + wordCount;
    }
}


setDate()
setTime();

window.setInterval(setTime, 1000);
