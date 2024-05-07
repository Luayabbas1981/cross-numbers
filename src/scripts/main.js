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
let gameLevel = 0;
let currentExpressions = [];

// Declaration
let startingValueEl = null;
let currentValueEl = null;
let targetValueEl = null;
let checkZone = null;
const expressionsZone = document.querySelector(".model__expressions");
const newGameButton = document.querySelector("#newGameBtn");
const gameLevelCon = document.querySelector(".level");
const resultEl = document.querySelector(".model__result");
const levelUp = document.querySelector(".arrows-con img:first-child");
const levelDown = document.querySelector(".arrows-con img:last-child");
// event listeners
newGameButton.addEventListener("click", startGame);

//Global variables
//let gameLevel = 0; // game level starts at 0 and ends at 10
// Level cotroller
levelUp.addEventListener("click", function () {
  if (gameLevel < 6) {
    gameLevel++;
    gameLevelCon.textContent = gameLevel;
  }
});
levelDown.addEventListener("click", function () {
  if (gameLevel > 0) {
    gameLevel--;
    gameLevelCon.textContent = gameLevel;
  }
});

// Main function of the game
function startGame() {
  try {
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
      max = gameLevel * 10 - 1;
      startingValue = getRandomIntInclusive(min, max);
      maxValue = Math.ceil((startingValue + max) / 2);
      operatorString = "";
      numExpression =
        gameLevel < 6
          ? getRandomIntInclusive(gameLevel, gameLevel + 1)
          : getRandomIntInclusive(gameLevel - 1, gameLevel);
    }
    // console.log({ min, max, startingValue, maxValue, numExpression });
    resultEl.innerHTML = "";
    expressionsZone.innerHTML = "";
    const expressions = generateExpressionArray(
      startingValue,
      maxValue,
      operatorString,
      numExpression
    );
    const { expressionArray, targetValue } = expressions;

    for (let i = 0; i < numExpression; i++) {
      let expDiv = document.createElement("div");
      expDiv.classList.add("expression");
      expDiv.id = `expression-${i + 1}`;
      expDiv.setAttribute("draggable", true);
      expDiv.textContent = `${expressionArray[i]}`;
      expressionsZone.appendChild(expDiv);
    }

    let pathLength = expressionArray.length * 2 + 3 || 5;
    grid.generateZigzagPath(pathLength);
    startingValueEl = document.querySelector(".starting-value");
    currentValueEl = document.querySelector(".current-value");
    targetValueEl = document.querySelector(".target-value");

    currentValueEl.textContent = startingValue;
    startingValueEl.textContent = startingValue;
    targetValueEl.textContent = targetValue;
    checkZone = document.querySelectorAll(".model-check ");
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

  checkZone.forEach((cell) => {
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });
  });

  checkZone.forEach((cell) => {
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const expId = e.dataTransfer.getData("expId");
      // console.log(expId);
      const draggableExpression = document.getElementById(expId);
      if (e.target.classList.contains("model-check")) {
        e.target.appendChild(draggableExpression);
      }
    });
  });
  checkZone.forEach((cell) => {
    cell.addEventListener("dragend", checkPlayGame);
  });
}

function checkPlayGame() {
  // alert("check button clicked");
  let expressions = [];
  for (const ex of checkZone) {
    ex.innerHTML ? expressions.push(ex.textContent) : "";
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
