const calculatorCloseButton = document.querySelector("#calculator-close");
const themeCloseButton = document.querySelector("#theme-close");
const contextItems = document.querySelectorAll(".context-menu-option");
const calculator = document.querySelector(".calculator");
const themeContainer = document.querySelector(".theme-container");

contextItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "Themes":
        themeContainer.style.display = "grid"
        break;

      case "Settings":
        break;

      case "Calculator":
        calculator.style.display = "block";
        break;

      case "Widgets":
        break;

      case "Help":
        break;

      case "About Us":
        break;

      default:
        break;
    }
  });
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Prevent default context menu

  const context = document.querySelector(".context");

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const menuWidth = 200;
  const menuHeight = 300;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Adjust position to prevent overflow (Right & Bottom edge)
  let posX = mouseX;
  let posY = mouseY;

  if (mouseX + menuWidth > windowWidth) {
    posX = windowWidth - menuWidth - 10; // 10px padding from edge
  }

  if (mouseY + menuHeight > windowHeight) {
    posY = windowHeight - menuHeight - 10;
  }

  context.style.display = "block";
  context.style.position = "absolute";
  context.style.width = `${menuWidth}px`;
  context.style.height = `${menuHeight}px`;
  context.style.left = `${posX}px`;
  context.style.top = `${posY}px`;

  console.log(`Adjusted X: ${posX}, Y: ${posY}`);
});

// Hide menu on click anywhere
document.addEventListener("click", () => {
  document.querySelector(".context").style.display = "none";
});

calculatorCloseButton.addEventListener(
  "click",
  () => (calculator.style.display = "none")
);

themeCloseButton.addEventListener(
  "click",
  () => (themeContainer.style.display = "none")
);
