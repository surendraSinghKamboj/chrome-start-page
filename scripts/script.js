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
