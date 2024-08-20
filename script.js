const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let displayReset = false;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {
  num1 = +num1;
  num2 = +num2; //convert string to number
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
};

buttons.addEventListener("click", (event) => {
  const target = event.target;

  switch (target.className) {
    case "number":
      displayValues(target.textContent);

      break;
    case "operator":
      chooseOperation(target.textContent);

      break;
    case "equals":
      calculate();
      displayReset = true;

      break;
    case "clear":
      clear();

      break;
  }
});

function displayValues(value) {
  if (display.textContent === "0" || displayReset) {
    resetDisplay();
  }
  if (value === "." && display.textContent.includes(".")) return;
  if (display.textContent.length > 7) return
  display.textContent += value;
}

function chooseOperation(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  firstOperand = display.textContent;
  currentOperator = operator;
  displayReset = true;
}

function resetDisplay() {
  display.textContent = "";
  displayReset = false;
}

function calculate() {
  if (currentOperator === null || displayReset) return;
  secondOperand = display.textContent;

  if (currentOperator === "/" && secondOperand === "0") {
    display.textContent = "XDD";
    displayReset = true;
  } else {
    display.textContent = roundDecimal(
      operate(currentOperator, firstOperand, secondOperand),
    );
  }
  currentOperator = null;
}

function clear() {
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  display.textContent = "";
}

function roundDecimal(value) {
  return Math.round(value * 100) / 100;
}
