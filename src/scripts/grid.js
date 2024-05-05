// Game values
const coords = 12; // always odd number
const rows = coords;
const columns = coords;
const cellsArray = [];
let pathArray = null;
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
    // Allow up to pathLength attempts to find a valid path
    let currentRow = Math.floor(Math.random() * (rows - 2)) + 1;
    let currentCol = Math.floor(Math.random() * (columns - 2)) + 1;
    let lastDirection = "vertical";
    let changeDirectionAfter = 4;
    let currentDirectionSteps = 0;

    const visitedCells = new Set([`${currentRow}-${currentCol}`]);

    document
      .getElementById(`${currentRow}-${currentCol}`)
      .classList.add("visited");

    let moveCount = 1; // Start count at 1 for the initial cell

    while (moveCount < steps) {
      let potentialMoves = [];

      if (currentDirectionSteps >= changeDirectionAfter || moveCount === 1) {
        // if it's first move or time to change
        lastDirection =
          lastDirection === "vertical" ? "horizontal" : "vertical";
        currentDirectionSteps = 0;
      }
      if (moveCount === 5) {
        changeDirectionAfter = 2;
      }
      if (lastDirection === "horizontal") {
        if (
          currentCol > 1 &&
          !visitedCells.has(`${currentRow}-${currentCol - 1}`)
        ) {
          potentialMoves.push({ row: currentRow, col: currentCol - 1 });
        }
        if (
          currentCol < columns - 2 &&
          !visitedCells.has(`${currentRow}-${currentCol + 1}`)
        ) {
          potentialMoves.push({ row: currentRow, col: currentCol + 1 });
        }
      } else {
        if (
          currentRow > 1 &&
          !visitedCells.has(`${currentRow - 1}-${currentCol}`)
        ) {
          potentialMoves.push({ row: currentRow - 1, col: currentCol });
        }
        if (
          currentRow < rows - 2 &&
          !visitedCells.has(`${currentRow + 1}-${currentCol}`)
        ) {
          potentialMoves.push({ row: currentRow + 1, col: currentCol });
        }
      }

      if (potentialMoves.length === 0) {
        break; // No more valid moves, break and retry
      }

      // Select a random move from the potential moves
      const move =
        potentialMoves[Math.floor(Math.random() * potentialMoves.length)];
      currentRow = move.row;
      currentCol = move.col;

      if (!visitedCells.has(`${currentRow}-${currentCol}`)) {
        visitedCells.add(`${currentRow}-${currentCol}`);
        document
          .getElementById(`${currentRow}-${currentCol}`)
          .classList.add("visited");
        moveCount++;
        currentDirectionSteps++;
      }
      if (visitedCells.size === pathLength) {
        pathArray = Array.from(visitedCells);
      }
    }

    if (moveCount === steps) {
      break; // Successful path creation
    } else {
      // Reset visited cells if path was not completed successfully
      visitedCells.forEach((cell) => {
        document.getElementById(cell).classList.remove("visited");
      });
      attempt++;
    }
  }
}

generateZigzagPath(pathLength);
