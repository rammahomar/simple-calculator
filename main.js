// object values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Display
const updateDsiplay = () => {
    const display = document.querySelector('.screen')
    display.value = calculator.displayValue
};
updateDsiplay();
// Handle Key Press
const keys = document.querySelector('.keys')
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')){
        return;
    }

    if (target.classList.contains ('operator')){
        handleOperator(target.value)
        updateDsiplay()
        return;
    }

    if (target.classList.contains('decimal')){
        InputDecimal(target.value);
        updateDsiplay();
        return;
    }

    if(target.classList.contains('all-clear')){
        resetCalculator()
        updateDsiplay()
        return;
    }

    inputDigit(target.value)
    updateDsiplay();
});


// Input Digit
const inputDigit = (digit) => {
    const {displayValue, waitingForSecondOperand } = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false
    } else{
        calculator.displayValue = displayValue === '0' ? digit :displayValue + digit
    }
};

// Input Decimal
const InputDecimal = (dot) => {
    if (calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

// Handle Operators
const handleOperator = (nextOperator) => {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue)

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator)

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand - result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
};

// Calculator Logic
const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === '+'){
        return firstOperand + secondOperand;
    } else if (operator === '-' ) {
        return firstOperand 
    } else if (operator === '*') {
        return firstOperand * secondOperand
    } else if (operator === '/'){
        return firstOperand / secondOperand
    }
    return secondOperand;
};

// Reset Calculator
const resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
};