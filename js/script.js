class Calculator{
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        this.clearDisplay();
    }

    clearDisplay() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
    }

    deleteData() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    selectOperator(operator) {
        if (this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.calculate();
        }

        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {
        let answer;
        const previousVal = parseFloat(this.previousOperand),
            currentVal = parseFloat(this.currentOperand);

        if (isNaN(previousVal) || isNaN(currentVal)) return;
        switch (this.operator) {
        case '+':
            answer = previousVal + currentVal;
            break
        case '-':
            answer = previousVal - currentVal;
            break
        case '*':
            answer = previousVal * currentVal;
            break
        case '÷':
            answer = previousVal / currentVal;
            break
        case '%':
            answer = previousVal % currentVal;
            break
        default:
            return
    }

    this.currentOperand = answer;
    this.operator = undefined;
    this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const strNumber = number.toString();
        const intDigits = parseFloat(strNumber.split('.')[0]);
        const deciDigits = strNumber.split('.')[1];

        let intDisplay;

        if(isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }

        if(deciDigits != null) {
            return `${intDisplay}.${deciDigits}`;
        } else {
            return intDisplay; 
        }
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operator != null) {
            this.previousOperandDisplay.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandDisplay.innerText = '';
        }
    }
}

const operandBtns = document.querySelectorAll('[data-operand]'),
    operatorBtns = document.querySelectorAll('[data-operator]'),
    equalsToBtn = document.querySelector('[result-equals]'),
    clearDisplayBtn = document.querySelector('[clear-diplay]'),
    deleteDataBtn = document.querySelector('[delete-data]'),
    negateDataBtn = document.querySelector('[negate-data]'),
    previousOperandDisplay = document.querySelector('[previous-operand]'),
    currentOperandDisplay = document.querySelector('[current-operand]');

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

operandBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperator(button.innerText);
        calculator.updateDisplay();
    })
});

equalsToBtn.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay(); 
});

clearDisplayBtn.addEventListener('click', () => {
    calculator.clearDisplay();
    calculator.updateDisplay();
});

deleteDataBtn.addEventListener('click', () => {
    calculator.deleteData();
    calculator.updateDisplay();
});