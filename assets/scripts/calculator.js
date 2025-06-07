// Calculator app logic

const calculatorIcon = document.getElementById('calculator-icon');
const calculatorApp = document.getElementById('calculator-app');
const closeCalcBtn = document.getElementById('close-calculator');
const calcDisplay = document.getElementById('calc-display');
const calcButtons = calculatorApp.querySelectorAll('.calc-buttons button');

calculatorIcon.addEventListener('click', () => {
  calculatorApp.classList.remove('hidden');
  calcDisplay.value = '';
});

closeCalcBtn.addEventListener('click', () => {
  calculatorApp.classList.add('hidden');
});

// Calculator buttons logic
calcButtons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.getAttribute('data-value');

    if(button.id === 'calc-clear') {
      calcDisplay.value = '';
    } else if(button.id === 'calc-equals') {
      try {
        // Evaluate expression (be cautious with eval)
        calcDisplay.value = eval(calcDisplay.value);
      } catch {
        calcDisplay.value = 'Error';
      }
    } else if(val) {
      calcDisplay.value += val;
    }
  });
});

// ----------- Draggable functionality ------------

const header = calculatorApp.querySelector('.app-header');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

header.style.cursor = 'move';

header.addEventListener('mousedown', (e) => {
  // Don't start dragging if user clicked the close button
  if (e.target === closeCalcBtn || closeCalcBtn.contains(e.target)) {
    return; // ignore drag start
  }

  e.preventDefault();
  isDragging = true;

  const rect = calculatorApp.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  calculatorApp.style.pointerEvents = 'none';
});


document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  let left = e.clientX - offsetX;
  let top = e.clientY - offsetY;

  // constrain inside viewport
  const maxLeft = window.innerWidth - calculatorApp.offsetWidth;
  const maxTop = window.innerHeight - calculatorApp.offsetHeight;

  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > maxLeft) left = maxLeft;
  if (top > maxTop) top = maxTop;

  calculatorApp.style.position = 'fixed';
  calculatorApp.style.left = left + 'px';
  calculatorApp.style.top = top + 'px';

  console.log('mousedown', { mouseX: e.clientX, mouseY: e.clientY });
  console.log('window rect', calculatorApp.getBoundingClientRect());
  console.log('offsetX, offsetY', offsetX, offsetY);
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  calculatorApp.style.pointerEvents = 'auto';
});
