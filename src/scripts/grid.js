// Game elements
const gameWrapper = document.querySelector(".game-wrapper");
const gameField = document.querySelector(".game-field");
let startValue = null;
let currentValue = null;
let targetValue = null;
// Game values
const cellsArray = [];
const pathArray = [];
let coords = 7;
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
  function getNumLength(n) {
    let number = parseInt("1".repeat(n));
    return number.toString().length - 2;
  }

  const directions = [
    { position: "up-left", value: "1-1", x: -1, y: 0 },
    { position: "up-right", value: `1-${getNumLength(columns)}`, x: 0, y: 1 },

    {
      position: "down-right",
      value: `${getNumLength(rows)}-${getNumLength(columns)}`,
      x: 1,
      y: 0,
    },
    { position: "down-left", value: `${getNumLength(rows)}-1`, x: 0, y: -1 },
  ];
  let randomDirectionIndex = Math.floor(Math.random() * directions.length);
  let randomDirection = directions[randomDirectionIndex];
  let newDirectionOrder = [];
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

  const changeDirectionAfter = (coords - 1) / 2 + 1;
  let startCellId = startValue.id.split("-");
  let nextCell;
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
          if (nextDirection.position === "up-left") {
            return cell.id === `${+startCellId[0]}-${+startCellId[1] + 1}`;
          } else if (nextDirection.position === "up-right") {
            return cell.id === `${+startCellId[0] + 1}-${+startCellId[1]}`;
          } else if (nextDirection.position === "down-right") {
            return cell.id === `${+startCellId[0]}-${+startCellId[1] - 1}`;
          } else if (nextDirection.position === "down-left") {
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
  // Add path class and delay var for path array elements
  pathArray.forEach((cell, index) => {
    cell.classList.add("path");
    cell.style.setProperty("--delay", index);
  });
}
generatePath();
