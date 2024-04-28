// Game elements
const gameWrapper = document.querySelector(".game-wrapper");
const gameField = document.querySelector(".game-field");
let startValue = null;
let currentValue = null;
let targetValue = null;
// Game values
const cellsArray = [];
const pathArray = [];
let coords = 9;
const rows = coords;
const columns = coords;

function generateGameGrid() {
  gameField.style.setProperty("--rows", rows);
  gameField.style.setProperty("--columns", columns);
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gameField.appendChild(row);
    for (let c = 0; c < columns; c++) {
      const column = document.createElement("div");
      column.id = `${r}-${c}`;
      column.classList.add("cell");
      row.appendChild(column);
      cellsArray.push(column);
    }
  }
}
generateGameGrid();

function generatePath() {
  let randomDirectionIndex = null;
  let randomDirection = null;
  let newDirectionOrder = [];
  let changeDirectionAfter = null;
  let startCellId = null;
  let nextCell;

  const directions = [
    {
      id: "up-left",
      value: calculatePosition("up-left"),
      x: -1,
      y: 0,
    },
    {
      id: "up-right",
      value: calculatePosition("up-right"),
      x: 0,
      y: 1,
    },

    {
      id: "down-right",
      value: calculatePosition("down-right"),
      x: 1,
      y: 0,
    },
    { id: "down-left", value: calculatePosition("down-left"), x: 0, y: -1 },
  ];
  randomDirectionIndex = Math.floor(Math.random() * directions.length);
  randomDirection = directions[randomDirectionIndex];

  function loopArrayFromStart() {
    let index = randomDirectionIndex;
    do {
      index = (index + 1) % directions.length;
      newDirectionOrder.push(directions[index]);
    } while (index !== randomDirectionIndex);
  }

  loopArrayFromStart();

  // Set starting value
  startValue = document.getElementById(randomDirection.value);
  startValue.classList.add("starting-value");

  // Set target value
  targetValue = cellsArray.find(
    (cell) => cell.id === `${(rows - 1) / 2}-${(columns - 1) / 2}`
  );
  targetValue.classList.add("target-value");
  function calculatePosition(startPosition) {
    let initX = null;
    let initY = null;
    switch (startPosition) {
      case "up-left":
        initX = (coords - 5) / 2;
        initY = (coords - 5) / 2;
        break;
      case "up-right":
        initX = (coords - 5) / 2;
        initY = (coords - 5) / 2 + 4;
        break;
      case "down-left":
        initX = (coords - 5) / 2 + 4;
        initY = (coords - 5) / 2;
        break;
      case "down-right":
        initX = (coords - 5) / 2 + 4;
        initY = (coords - 5) / 2 + 4;
        break;
    }
    let id = `${initX}-${initY}`;
    return id;
  }
  changeDirectionAfter = directions.length;
  startCellId = startValue.id.split("-");

  for (let i = 0; i < changeDirectionAfter; i++) {
    let nextDirection = newDirectionOrder[i];
    if (i > 2) {
      break;
    }
    for (let x = 0; x < changeDirectionAfter; x++) {
      nextCell = cellsArray.find((cell) => {
        if (i === 2 && x > 2) {
          return;
        } else if (i === 2 && x > 1) {
          if (nextDirection.id === "up-left") {
            return cell.id === `${+startCellId[0]}-${+startCellId[1] + 1}`;
          } else if (nextDirection.id === "up-right") {
            return cell.id === `${+startCellId[0] + 1}-${+startCellId[1]}`;
          } else if (nextDirection.id === "down-right") {
            return cell.id === `${+startCellId[0]}-${+startCellId[1] - 1}`;
          } else if (nextDirection.id === "down-left") {
            return cell.id === `${+startCellId[0] - 1}-${+startCellId[1]}`;
          }
        } else {
          return (
            cell.id ===
            `${+startCellId[0] + nextDirection.x}-${
              +startCellId[1] + nextDirection.y
            }`
          );
        }
      });
      if (nextCell) {
        startCellId = nextCell.id.split("-");
        pathArray.push(nextCell);
      } else {
        break;
      }
    }
  }
  
}
generatePath();


// Add path class and delay var for path array elements
pathArray.forEach((cell, index) => {
    cell.classList.add("path");
    cell.style.setProperty("--delay", index);
  });