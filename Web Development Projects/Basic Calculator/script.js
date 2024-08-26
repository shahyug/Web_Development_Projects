// Variables to hold the calculator's state
let currentInput = '0';
let previousInput = '';
let operator = null;

// Get the display element
const display = document.getElementById('display').querySelector('span');

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput;
}

// Function to handle button clicks
function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        // If the input is a number or a decimal point
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    } else if (value === 'AC') {
        // Clear everything
        currentInput = '0';
        previousInput = '';
        operator = null;
    } else if (value === '+/-') {
        // Toggle negative/positive
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (value === '%') {
        // Percentage
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === '=') {
        // Calculate the result
        if (operator && previousInput !== '') {
            calculate();
            operator = null;
        }
    } else {
        // Operator (+, -, ×, ÷)
        if (operator) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = value;
    }
    updateDisplay();
}

// Function to perform calculations
function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            currentInput = (prev + current).toString();
            break;
        case '-':
            currentInput = (prev - current).toString();
            break;
        case '×':
            currentInput = (prev * current).toString();
            break;
        case '÷':
            currentInput = (prev / current).toString();
            break;
    }
    previousInput = '';
}

// Add event listeners to buttons
document.querySelectorAll('.buttons').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleButtonClick(value);
    });
});

// Initial display update
updateDisplay();
