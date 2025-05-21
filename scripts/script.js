// script.js

// Function to apply theme to body
function applyTheme(theme, font) {
  document.body.setAttribute("data-theme", theme);
  document.body.setAttribute("data-font", theme);
}

// Check for theme in localStorage
let currentTheme = localStorage.getItem("theme");
let currentFont = localStorage.getItem("font");
if (!currentFont) {
  currentFont = "roboto";
  localStorage.setItem("font", currentFont);
}

// If not found, set default theme to 'light'
if (!currentTheme) {
  currentTheme = "light";
  localStorage.setItem("theme", currentTheme);
}

// Apply the theme
applyTheme(currentTheme, currentFont);

setInterval(() => {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.querySelector('.digitalclock').textContent = timeString;
}, 1000);



document.querySelectorAll('.history-widget button').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});