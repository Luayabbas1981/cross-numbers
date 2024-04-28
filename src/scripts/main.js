import {
  getRandomIntInclusive,
  // generateRandomIntegers,
  // calculateExpressions,
  isTargetValueReached,
  // generateExpression,
  generateExpressionArray,
} from "./helper.js";
import * as grid from "./grid.js";

// Game values
grid.cellsArray;
grid.pathArray;
grid.coords;
grid.rows;
grid.columns;

grid.generateGameGrid();
grid.generatePath();
// Declaration
const startingValueEl = document.querySelector(".starting-value");
const currentValueEl = document.querySelector(".current-value");
const targetValueEl = document.querySelector(".target-value");
const gameLevelInput = document.getElementById("game-level");
const newGameButton = document.querySelector("#newGameBtn");
const checkZone = document.querySelector(".model__check ");
const expressionsZone = document.querySelector(".model__expressions");
const resultEl = document.querySelector(".model__result");
// event listeners
newGameButton.addEventListener("click", startGame);

//Global variables
//let gameLevel = 0; // game level starts at 0 and ends at 10

// Main function of the game
function startGame() {
  try {
    let gameLevel = parseInt(gameLevelInput.value);
    // console.log(gameLevel);
    let min, max, startingValue, maxValue, operatorString, numExpression;
    if (gameLevel === 0) {
      min = 1;
      max = 10;
      startingValue = getRandomIntInclusive(min, max);
      maxValue = max;
      operatorString = "+";
      numExpression = 1;
    } else {
      min = gameLevel;
      max = gameLevel * 5 - 1;
      startingValue = getRandomIntInclusive(min, max);
      maxValue = Math.ceil((startingValue + max) / 2);
      operatorString = "";
      numExpression =
        gameLevel < 6
          ? getRandomIntInclusive(gameLevel, gameLevel + 1)
          : getRandomIntInclusive(gameLevel - 1, gameLevel);
    }
    // console.log({ min, max, startingValue, maxValue, numExpression });

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
  const draggableExpressionEls = document.getElementsByClassName("expression");
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
    const draggableExpression = document.getElementById(expId);
    e.target.appendChild(draggableExpression);
  });

  checkZone.addEventListener("dragend", checkPlayGame);
}

function checkPlayGame() {
  // alert("check button clicked");
  let expressions = [];
  for (const ex of checkZone.children) {
    expressions.push(ex.innerHTML);
  }
  const startingValue = startingValueEl.textContent;
  const targetValue = Number(targetValueEl.textContent);
  const checkObject = isTargetValueReached(
    startingValue,
    targetValue,
    expressions
  );
  // console.log(checkObject);
  const { currentValue, targetReached } = checkObject;
  currentValueEl.textContent = !Number.isInteger(currentValue)
    ? currentValue.toFixed(2)
    : currentValue;
  if (targetReached && expressionsZone.children.length === 0) {
    resultEl.innerHTML = "GREAT! 🤩";
  } else if (!targetReached && expressionsZone.children.length === 0) {
    currentValueEl.classList.add("shake-horizontal");
    setTimeout(() => {
      currentValueEl.classList.remove("shake-horizontal");
    }, 800);
  }
}
