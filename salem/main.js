import {
    // getRandomIntInclusive,
    // generateRandomIntegers,
    // calculateExpressions,
    isTargetValueReached,
    // generateExpression,
    generateExpressionArray,
} from "./helper.js";


// console.log("Test");
const startingValueEl = document.querySelector(".starting-value");
const currentValueEl = document.querySelector(".current-value");
const targetValueEl = document.querySelector(".target-value");
const newGameButton = document.querySelector("#newGameBtn");
const checkButton = document.querySelector("#checkBtn");
const checkZone = document.querySelector(".model__check ");
const expressionsZone = document.querySelector(".model__expressions");
const resultEl = document.querySelector(".model__result");
// console.log(newGameButton, checkButton, expressionsZone, resultEl);

newGameButton.addEventListener("click", startNewGame);
checkButton.addEventListener("click", check);



const startingValue = 1;

function startNewGame() {
    const maxValue = 10;
    const operatorString = "";
    const numExpression = 3;
    checkZone.innerHTML = "";
    resultEl.innerHTML = "";
    try {
        const expressions = generateExpressionArray(startingValue, maxValue, operatorString, numExpression);
        // console.log(expressions);
        const { expressionArray, targetValue } = expressions;
        // startingValueEl.textContent = "StartingValue";
        // targetValueEl.textContent = "TargetValue";
        currentValueEl.textContent = "CurrentValue";
        startingValueEl.textContent = startingValue;
        targetValueEl.textContent = targetValue;
        expressionsZone.innerHTML = "";
        for (let i = 0; i < numExpression; i++) {
            let expDiv = document.createElement("div");
            expDiv.classList.add("expression", `expression${i + 1}`);
            expDiv.setAttribute("draggable", true);
            expDiv.textContent = `${expressionArray[i]}`;
            expressionsZone.appendChild(expDiv);
        }
        const draggableExpressionEls = document.getElementsByClassName('expression');
        // console.log({ draggableExpressionEls });
        for (const draggableExpEl of draggableExpressionEls) {
            draggableExpEl.addEventListener("dragstart", function (event) {
                // console.log("draggableExpEl dragstart ", event);
                // console.log(this);
                let draggedExpDiv = event.target
                console.log({ draggedExpDiv });
                checkZone.addEventListener("dragover", function (event) {
                    event.preventDefault();
                });
                checkZone.addEventListener("drop", function (event) {
                    // checkZone.appendChild(draggedExpDiv); 
                    this.insertAdjacentElement('beforeend', draggedExpDiv);
                    draggedExpDiv = null;
                });

                expressionsZone.addEventListener("dragover", function (event) {
                    event.preventDefault();
                });
                expressionsZone.addEventListener("drop", function (event) {
                    // expressionsZone.appendChild(draggedExpDiv);
                    this.insertAdjacentElement('beforeend', draggedExpDiv);
                    draggedExpDiv = null;
                });
            });
        }
    } catch (error) {
        resultEl.textContent = "Error: " + error.message;
    }
}

function check() {
    // alert("check button clicked");
    let expressions = []
    for (const ex of checkZone.children) {
        expressions.push(ex.innerHTML)
    }
    const targetValue = Number(targetValueEl.textContent);
    const checkObject = isTargetValueReached(startingValue, targetValue, expressions);
    // console.log(checkObject);
    const { currentValue, targetReached } = checkObject;
    currentValueEl.textContent = currentValue;
    resultEl.innerHTML = targetReached ? "GREAT! 🤩" : "☹️ Try again."

}
