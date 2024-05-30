// script.js

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    // Update display
    function updateDisplay() {
        display.innerText = currentInput;
    }

    // Handle number button click
    function handleNumberClick(number) {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay();
    }

    // Handle operator button click
    function handleOperatorClick(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && shouldResetDisplay) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(firstOperand, inputValue, operator);
            currentInput = `${result}`;
            firstOperand = result;
        }

        operator = nextOperator;
        shouldResetDisplay = true;
        updateDisplay();
    }

    // Perform calculation based on operator
    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return second !== 0 ? first / second : 'Error';
            case '%': return first % second;
        }
    }

    // Handle clear button click
    function handleClear() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    // Handle square button click
    function handleSquare() {
        const inputValue = parseFloat(currentInput);
        currentInput = `${inputValue * inputValue}`;
        updateDisplay();
    }

    // Handle decimal button click
    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    // Add event listeners to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                handleNumberClick(button.innerText);
            } else if (button.classList.contains('operator')) {
                handleOperatorClick(button.innerText);
            } else if (button.id === 'clear') {
                handleClear();
            } else if (button.id === 'square') {
                handleSquare();
            } else if (button.id === 'equals') {
                handleOperatorClick(null);
                shouldResetDisplay = true;
            } else if (button.id === 'decimal') {
                handleDecimal();
            }
        });
    });

    // Initialize the display
    updateDisplay();
});
