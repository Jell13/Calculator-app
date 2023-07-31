class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }

    clear(){
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete(){
        this.current = this.current.slice(0,-1);
    }

    operations(operation){
        if(this.current === '')return;
        if(this.previous !== ''){
            this.compute();
        }
        else{
            this.operation = operation;
            this.previous = `${this.current}  ${operation}`;
            this.current = '';
        }
    }

    appendNumber(number){
        if(number === '.' && this.current.includes('.')) return;
        else{
            this.current += number
        }
    }

    compute(){
        let result;
        const curr = parseFloat(this.current);
        const prev = parseFloat(this.previous);
        if(isNaN(prev) && isNaN(curr)) return;
        switch(this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        
        this.current = result;
        this.previous = '';
        this.operation = undefined;
    }

    display(){
        this.currentOperand.innerText = this.current;
        this.previousOperand.innerText = this.previous;
    }
}

const numbers = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operation]');
const previousOperand = document.querySelector('[data-previous]');
const currentOperand = document.querySelector('[data-current]');
const equals = document.querySelector('[data-equals]');
const del = document.querySelector('[data-delete]');
const clear = document.querySelector('[data-clear]');

const calculator = new Calculator(previousOperand,currentOperand);

numbers.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.display()
    })
})

operation.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.operations(button.innerText);
        calculator.display();
    })
})

clear.addEventListener('click', () =>{
    calculator.clear();
    calculator.display();
})

equals.addEventListener('click', () =>{
    calculator.compute();
    calculator.display();
})

del.addEventListener('click', () =>{
    calculator.delete();
    calculator.display();
})


