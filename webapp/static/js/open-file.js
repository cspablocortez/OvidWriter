function openFile() {
    console.log("openFile() Function")
    const fileInput = document.getElementById('openFile');
    const file = fileInput.files[0];

    if (!file) {
        alert("No file selected.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const fileContents = event.target.result;
        console.log(fileContents);
    };

    reader.onerror = function(event) {
        console.error("Error opening file:", event.target.error);
    } 

    console.log(file);

    reader.readAsText(file);
}