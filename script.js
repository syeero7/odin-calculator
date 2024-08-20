const display = document.querySelector("#display");
const buttons = document.querySelector("ul");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {};

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
      break;
    case "clear":
      break;
  }
});

function displayValues(value) {
  if (display.textContent === "") return;
  display.textContent += value;
}

function chooseOperation(operator) {
  firstOperand = display.textContent;
  currentOperator = operator;
}
