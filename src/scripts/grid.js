// Game values
const coords = 12; // always odd number
const rows = coords;
const columns = coords;
const cellsArray = [];
let pathArray = null; // Path cells id
let pathLength = 9;

function generateGameGrid() {
  const gameField = document.querySelector(".game-field");
  gameField.style.setProperty("--rows", rows);
  gameField.style.setProperty("--columns", columns);
  for (let x = 0; x < rows; x++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gameField.appendChild(row);
    for (let y = 0; y < columns; y++) {
      const column = document.createElement("div");
      column.id = `${x}-${y}`;
      column.classList.add("cell");
      row.appendChild(column);
      cellsArray.push(column);
    }
  }
}

generateGameGrid();

// create zigzag path
function generateZigzagPath(steps) {
  let attempt = 0;
  while (attempt < pathLength) {
    let currentRow = Math.floor(Math.random() * (rows - 2)) + 1;
    let currentCol = Math.floor(Math.random() * (columns - 2)) + 1;
    let lastDirection = Math.random() < 0.5 ? "horizontal" : "vertical";
    let changeDirectionAfter = 4;
    let currentDirectionSteps = 0;

    const visitedCells = new Set([`${currentRow}-${currentCol}`]);
    let moveCount = 1;
    document
      .getElementById(`${currentRow}-${currentCol}`)
      .classList.add("visited");

    while (moveCount < steps) {
      if (currentDirectionSteps >= changeDirectionAfter || moveCount === 1) {
        lastDirection =
          lastDirection === "vertical" ? "horizontal" : "vertical";
        currentDirectionSteps = 0;
      }

      if (moveCount === 5) {
        changeDirectionAfter = 2;
      }

      let potentialMoves = [];
      if (lastDirection === "horizontal") {
        if (
          currentCol > 1 &&
          !visitedCells.has(`${currentRow}-${currentCol - 1}`)
        ) {
          potentialMoves.push({
            row: currentRow,
            col: currentCol - 1,
            dir: "left",
          });
        }
        if (
          currentCol < columns - 2 &&
          !visitedCells.has(`${currentRow}-${currentCol + 1}`)
        ) {
          potentialMoves.push({
            row: currentRow,
            col: currentCol + 1,
            dir: "right",
          });
        }
      } else {
        if (
          currentRow > 1 &&
          !visitedCells.has(`${currentRow - 1}-${currentCol}`)
        ) {
          potentialMoves.push({
            row: currentRow - 1,
            col: currentCol,
            dir: "up",
          });
        }
        if (
          currentRow < rows - 2 &&
          !visitedCells.has(`${currentRow + 1}-${currentCol}`)
        ) {
          potentialMoves.push({
            row: currentRow + 1,
            col: currentCol,
            dir: "down",
          });
        }
      }

      if (potentialMoves.length === 0) {
        break; // No more valid moves
      }

      const move =
        potentialMoves[Math.floor(Math.random() * potentialMoves.length)];
      currentRow = move.row;
      currentCol = move.col;

      if (!visitedCells.has(`${currentRow}-${currentCol}`)) {
        visitedCells.add(`${currentRow}-${currentCol}`);
        const cell = document.getElementById(`${currentRow}-${currentCol}`);
        cell.classList.add("visited", move.dir);
        moveCount++;
        currentDirectionSteps++;
      }

      if (visitedCells.size === pathLength) {
        // To get path cells id
        pathArray = Array.from(visitedCells);
        // To get path cells div's
        // pathArray = [];
        // cellsArray.forEach((cell) => {
        //   if (visitedCells.has(cell.id)) {
        //     pathArray.push(cell);
        //   }
        // });
        console.log(pathArray);
        
      }
    }

    if (moveCount === steps) {
      break; // Successful path creation
    } else {
      visitedCells.forEach((cell) => {
        const elem = document.getElementById(cell);
        elem.classList.remove("visited", "up", "down", "left", "right");
      });
      attempt++;
    }
  }
}

generateZigzagPath(pathLength);
