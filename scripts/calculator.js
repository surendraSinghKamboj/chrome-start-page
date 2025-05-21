const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let lastInput = '';
let resultDisplayed = false;

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const num = button.getAttribute('data-num');
    const op = button.getAttribute('data-op');
    const id = button.id;

    if (id === 'clear') {
      currentInput = '';
      display.textContent = '0';
      resultDisplayed = false;
      return;
    }

    if (id === 'backspace') {
      if (resultDisplayed) {
        currentInput = '';
        display.textContent = '0';
        resultDisplayed = false;
        return;
      }
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
      return;
    }

    if (id === 'equals') {
      try {
        // Evaluate expression safely
        const safeResult = Function(`"use strict"; return (${currentInput})`)();
        display.textContent = safeResult;
        currentInput = safeResult.toString();
        resultDisplayed = true;
      } catch {
        display.textContent = "Error";
        currentInput = '';
        resultDisplayed = true;
      }
      return;
    }

    if (id === 'decimal') {
      if (resultDisplayed) {
        currentInput = '0.';
        display.textContent = currentInput;
        resultDisplayed = false;
        return;
      }
      // Prevent multiple decimals in the current number segment
      const parts = currentInput.split(/[\+\-\*\/]/);
      if (!parts[parts.length - 1].includes('.')) {
        currentInput += '.';
        display.textContent = currentInput;
      }
      return;
    }

    // Handle number input
    if (num !== null) {
      if (resultDisplayed) {
        currentInput = num;
        display.textContent = currentInput;
        resultDisplayed = false;
      } else {
        currentInput += num;
        display.textContent = currentInput;
      }
      return;
    }

    // Handle operator input
    if (op !== null) {
      if (currentInput === '' && op !== '-') {
        // Don't allow operators except minus at start
        return;
      }
      if (resultDisplayed) {
        resultDisplayed = false;
      }
      // Prevent consecutive operators
      if (currentInput !== '' && isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
      display.textContent = currentInput;
      return;
    }
  });
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    document.querySelector(`.btn[data-num="${e.key}"]`)?.click();
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    document.querySelector(`.btn[data-op="${e.key}"]`)?.click();
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    document.getElementById('equals').click();
  } else if (e.key === 'Backspace') {
    document.getElementById('backspace').click();
  } else if (e.key.toLowerCase() === 'c') {
    document.getElementById('clear').click();
  }
});
