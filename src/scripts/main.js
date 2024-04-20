import {
  // getRandomIntInclusive,
  // generateRandomIntegers,
  // calculateExpressions,
  isTargetValueReached,
  // generateExpression,
  generateExpressionArray,
} from "./helper.js";

// Declaration
const startingValueEl = document.querySelector(".starting-value");
const currentValueEl = document.querySelector(".current-value");
const targetValueEl = document.querySelector(".target-value");
const newGameButton = document.querySelector("#newGameBtn");
const checkZone = document.querySelector(".model__check ");
const expressionsZone = document.querySelector(".model__expressions");
const resultEl = document.querySelector(".model__result");

// event listeners
newGameButton.addEventListener("click", startGame);

//Global variables
const startingValue = 1;

// Main function of the game
function startGame() {
  try {
    const maxValue = 10;
    const operatorString = "";
    const numExpression = 3;

    checkZone.innerHTML = "";
    resultEl.innerHTML = "";

    const expressions = generateExpressionArray(
      startingValue,
      maxValue,
      operatorString,
      numExpression
    );

    const { expressionArray, targetValue } = expressions;
    currentValueEl.textContent = startingValue;
    startingValueEl.textContent = startingValue;
    targetValueEl.textContent = targetValue;
    expressionsZone.innerHTML = "";

    for (let i = 0; i < numExpression; i++) {
      let expDiv = document.createElement("div");
      expDiv.classList.add("expression");
      expDiv.id = `expression-${i + 1}`;
      expDiv.setAttribute("draggable", true);
      expDiv.textContent = `${expressionArray[i]}`;
      expressionsZone.appendChild(expDiv);
    }
    dragDropExpression();

  } catch (error) {
    resultEl.textContent = "Error: " + error.message;
  }
}

function dragDropExpression() {
  const draggableExpressionEls =
    document.getElementsByClassName("expression");
  for (const draggableExpEl of draggableExpressionEls) {
    draggableExpEl.addEventListener("dragstart", (e) => {
      // console.log(e.target);
      e.dataTransfer.setData("expId", e.target.id);
    });
  }
  checkZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  checkZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const expId = e.dataTransfer.getData("expId");
    // console.log(expId);
    const draggableExpression = document.getElementById(expId)
    e.target.appendChild(draggableExpression)
  })

  checkZone.addEventListener("dragend", checkPlayGame)
}


function checkPlayGame() {
  // alert("check button clicked");
  let expressions = [];
  for (const ex of checkZone.children) {
    expressions.push(ex.innerHTML);
  }
  const targetValue = Number(targetValueEl.textContent);
  const checkObject = isTargetValueReached(
    startingValue,
    targetValue,
    expressions
  );
  // console.log(checkObject);
  const { currentValue, targetReached } = checkObject;
  currentValueEl.textContent = currentValue;
  resultEl.innerHTML = targetReached ? "GREAT! 🤩" : "☹️ Try again.";
}
