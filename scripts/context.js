// Step 1: Define default theme settings
const defaultThemeSettings = {
  bg: "blue",
  col: "white",
};

// Step 2: Check if settings already exist in localStorage
let contextTheme = localStorage.getItem("contextTheme");

// Step 3: If not set, save default settings
if (!contextTheme) {
  localStorage.setItem("contextTheme", JSON.stringify(defaultThemeSettings));
  contextTheme = defaultThemeSettings;
} else {
  // Parse stored JSON string into object
  contextTheme = JSON.parse(contextTheme);
}

// Step 4: Apply hover effects to context menu options
const contextMenus = document.querySelectorAll(".context-menu-option");

contextMenus.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.background = contextTheme.bg;
    item.style.color = contextTheme.col;
    item.style.cursor = "pointer";
  });

  item.addEventListener("mouseout", () => {
    item.style.background = "";
    item.style.color = "";
  });
});

