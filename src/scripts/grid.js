// Game values
export const cellsArray = [];
export const pathArray = [];
export const coords = 9; // always odd number
export const rows = coords;
export const columns = coords;

export function generateGameGrid() {
  const gameField = document.querySelector(".game-field");
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

export function generatePath() {
  let startValue = null;
  let targetValue = null;
  let randomDirectionIndex = null;
  let newDirectionOrder = [];
  let startCellId = null;
  let nextCell;

  const directions = [
    {
      id: "up-left",
      value: calculatePosition("up-left"),
      x: -1,
      y: 0,
      img: "../../images/neon-arrow-up.png",
    },
    {
      id: "up-right",
      value: calculatePosition("up-right"),
      x: 0,
      y: 1,
      img: "../../images/neon-arrow-right.png",
    },

    {
      id: "down-right",
      value: calculatePosition("down-right"),
      x: 1,
      y: 0,
      img: "../../images/neon-arrow-down.png",
    },
    {
      id: "down-left",
      value: calculatePosition("down-left"),
      x: 0,
      y: -1,
      img: "../../images/neon-arrow-left.png",
    },
  ];
  randomDirectionIndex = Math.floor(Math.random() * directions.length);

  function loopArrayFromStart() {
    let index = randomDirectionIndex;
    do {
      index = (index + 1) % directions.length;
      newDirectionOrder.push(directions[index]);
    } while (index !== randomDirectionIndex);
  }

  loopArrayFromStart();

  // Calculate path position
  function calculatePosition(startPosition) {
    const offset = (coords - 5) / 2;
    let initX = offset;
    let initY = offset;
    const adjustment = 4; // directions length
    switch (startPosition) {
      case "up-right":
        initY += adjustment;
        break;
      case "down-left":
        initX += adjustment;
        break;
      case "down-right":
        initX += adjustment;
        initY += adjustment;
        break;
    }
    let id = `${Math.max(0, Math.min(coords - 1, initX))}-${Math.max(
      0,
      Math.min(coords - 1, initY)
    )}`;
    return id;
  }
  // Set starting value
  startValue = cellsArray.find(
    (cell) => cell.id === calculatePosition(newDirectionOrder[3].id)
  );
  startValue.classList.add("starting-value");

  // Set target value
  targetValue = cellsArray.find(
    (cell) => cell.id === `${(rows - 1) / 2}-${(columns - 1) / 2}`
  );
  targetValue.classList.add("target-value-container");
  targetValue.innerHTML = ` <div class="target-value"> </div> <div class="current-value"></div>`;

  // Start path fun

  startCellId = startValue.id.split("-");
  function startPath() {
    for (let i = 0; i < 3; i++) {
      let nextDirection = newDirectionOrder[i];
      for (let x = 0; x < directions.length; x++) {
        nextCell = cellsArray.find((cell) => {
          if (i === 2 && x > 2) {
            return;
          } else if (i === 2 && x > 1) {
            if (nextDirection.id === "up-left") {
              if (cell.id === `${+startCellId[0]}-${+startCellId[1] + 1}`) {
                cell.classList.add("right");
                return true;
              }
              return false;
            } else if (nextDirection.id === "up-right") {
              if (cell.id === `${+startCellId[0] + 1}-${+startCellId[1]}`) {
                cell.classList.add("down");
                return true;
              }
              return false;
            } else if (nextDirection.id === "down-right") {
              if (cell.id === `${+startCellId[0]}-${+startCellId[1] - 1}`) {
                cell.classList.add("left");
                return true;
              }
              return false;
            } else if (nextDirection.id === "down-left") {
              if (cell.id === `${+startCellId[0] - 1}-${+startCellId[1]}`) {
                cell.classList.add("up");
                return true;
              }
              return false;
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
  startPath();
}
