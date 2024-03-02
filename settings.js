let settings = {
    fonts: ["EB Garamond", "Courier Prime"],
    paragraphFontSize: 1.3,
    titleFontSize: 1.55,
    darkMode: false,

}

const modal       = document.getElementById("settings-modal");
const span        = document.getElementById("exit-btn");
const settingsBtn = document.getElementById("settings-btn");

// When the user clicks the button, open the modal 
settingsBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Set Font
document.getElementById("font-selector").addEventListener("change", function() {
    localStorage.setItem('font-family', this.value);
    setFont();
});

// Set Font Size
document.getElementById("font-size-slider").addEventListener("input", function() {
    const fontSize = this.value + 'rem';
    localStorage.setItem('font-size', fontSize);
    document.getElementById("font-size-value").textContent = fontSize;
    setFontSize();
});

// Set Margin Size
document.getElementById("margin-size-slider").addEventListener("input", function() {
    const marginSize = this.value + '%';
    localStorage.setItem('margin-size', marginSize);
    document.getElementById("margin-size-value").textContent = marginSize;
    setMarginSize();
});