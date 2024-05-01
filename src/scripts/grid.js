// Game values
export const coords = 9; // always odd number
export const rows = coords;
export const columns = coords;
export const cellsArray = [];
export let pathArray = [];

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
  let startCellId = null;
  let nextCell;
  let newDirectionOrder = [];
  pathArray = [];
  cellsArray.forEach((cell) => {
    cell.className = "";
    cell.classList.add("cell");
  });

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

  // Wrap directions array form the first randomly direction
  function loopArrayFromStart() {
    randomDirectionIndex = Math.floor(Math.random() * directions.length);
    let index = randomDirectionIndex;
    do {
      index = (index + 1) % directions.length;
      newDirectionOrder.push(directions[index]);
    } while (index !== randomDirectionIndex);
  }

  loopArrayFromStart();

  // Calculate start cell position in grid
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
  targetValue.children[1].classList.add(
    newDirectionOrder[newDirectionOrder.length - 1].id,
    "position-absolute"
  );

  // Start path fun
  let lastDirection = null;
  startCellId = startValue.id.split("-");
  function startPath() {
    for (let i = 0; i < 3; i++) {
      let nextDirection = newDirectionOrder[i];
      for (let x = 0; x < directions.length; x++) {
        nextCell = cellsArray.find((cell) => {
          if (i === 2 && x > 1) {
            lastDirection = newDirectionOrder[x + 1].id;
            return;
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
          nextCell.classList.add(newDirectionOrder[i].id);
        } else {
          break;
        }
      }
    }

    function lastCellHandler(direction) {
      let centerCellId = targetValue.id.split("-");
      let deltaX = 0;
      let deltaY = 0;
      switch (direction) {
        case "down-right":
          deltaX = -1;
          break;
        case "down-left":
          deltaY = 1;
          break;
        case "up-right":
          deltaY = -1;
          break;
        case "up-left":
          deltaX = 1;
          break;
      }

      let lastCell = cellsArray.find(
        (cell) =>
          cell.id ===
          `${+centerCellId[0] + deltaX}-${+centerCellId[1] + deltaY}`
      );

      lastCell.classList.add(direction, "path");
      pathArray.push(lastCell);
    }
    lastCellHandler(lastDirection);
    // Add path class and delay var for path array elements
    pathArray.forEach((cell, index) => {
      cell.classList.add("path");
      cell.style.setProperty("--delay", index);
    });
  }
  startPath();
}
