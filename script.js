const displayValue = document.querySelector(".display-value");
const displayOperator = document.querySelector(".display-operator");
const buttons = document.querySelector(".buttons");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let clearDisplay = false;

window.addEventListener("keyup", handleKeyup);
buttons.addEventListener("click", handleClick);

function updateDisplay(value) {
  if (clearDisplay) {
    displayValue.textContent = "0";
    clearDisplay = false;
  }
  if (value === "." && displayValue.textContent.includes(".")) return;
  if (value === "0" && displayValue.textContent === "0") return;
  if (displayValue.textContent.length > 10) return;
  if (displayValue.textContent === "0" && value !== ".") {
    displayValue.textContent = value;
    return;
  }

  displayValue.textContent += value;
}

function chooseOperation(operator) {
  if (currentOperator) calculate();
  firstOperand = displayValue.textContent;
  currentOperator = operator;
  displayOperator.textContent = operator;
  clearDisplay = true;
}

function calculate() {
  if (!currentOperator || clearDisplay) return;
  secondOperand = displayValue.textContent;
  clearDisplay = true;

  if (currentOperator === "/" && secondOperand === "0") {
    displayValue.textContent = "BAKA";
    displayOperator.textContent = "";
    return;
  }

  const result = operate(currentOperator, firstOperand, secondOperand);
  displayValue.textContent = Math.round(result * 100) / 100;
  currentOperator = null;
  displayOperator.textContent = "";
}

const operate = (operator, num1, num2) => {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
};

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  displayValue.textContent = "0";
}

function backspace() {
  if (currentOperator) {
    currentOperator = null;
    displayOperator.textContent = "";
    return;
  }

  displayValue.textContent = displayValue.textContent.slice(0, -1);
}

function handleClick(e) {
  const target = e.target;

  switch (target.className) {
    case "number":
      updateDisplay(target.textContent);
      break;
    case "operator":
      chooseOperation(target.textContent);
      break;
    case "equals":
      calculate();
      break;
    case "clear":
      clear();
      break;
    case "backspace":
      backspace();
      break;
  }
}

function handleKeyup(e) {
  const key = e.key;

  if (key === "." || (key >= 0 && key <= 9)) updateDisplay(key);
  if (key === "+" || key === "-" || key === "*" || key === "/") chooseOperation(key);
  if (key === "Enter" || key === "=") calculate();
  if (key === "Backspace" || key === "Delete") backspace();
  if (key === "Shift") clear();
}
