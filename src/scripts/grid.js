// Game values
export const coords = 9; // always odd number
export const rows = coords;
export const columns = coords;
export const cellsArray = [];
export let pathArray = [];

export function generateGameGrid() {
  const gameField = document.querySelector(".game-field");
  console.log("hi");
  
  gameField.style.setProperty("--rows", rows);
 
  for (let x = 0; x < rows; x++) {
    const row = document.createElement("div");
    row.classList.add("row");
     row.style.setProperty("--columns", columns);
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
generateGameGrid()