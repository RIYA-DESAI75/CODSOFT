let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

// Event listener for buttons
let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.getAttribute('data-value');

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else {
            updateDisplay(value);
        }
    });
});

// Update the display with the clicked number or operator
function updateDisplay(value) {
    if (value === '.' && currentInput.includes('.')) return; // Prevent multiple dots

    currentInput += value;
    display.textContent = currentInput;
}

// Perform calculation
function calculate() {
    if (previousInput && operator && currentInput) {
        let result;
        switch (operator) {
            case '+':
                result = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                result = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                result = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case '/':
                if (currentInput === '0') {
                    alert("Cannot divide by zero!");
                    return;
                }
                result = parseFloat(previousInput) / parseFloat(currentInput);
                break;
            default:
                return;
        }

        currentInput = result.toString();
        display.textContent = currentInput;
        previousInput = '';
        operator = '';
    }
}

// Clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}

// Store the previous input and the operator for the next calculation
document.querySelectorAll('.operator').forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        if (currentInput === '') return;
        
        if (previousInput === '') {
            previousInput = currentInput;
        } else {
            calculate();
        }

        operator = operatorButton.getAttribute('data-value');
        currentInput = '';
    });
});
