const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let playing = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6],            // diagonales
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      statusText.textContent = `Ganó ${gameState[a]} 🎉`;
      playing = false;
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Empate 😐";
    playing = false;
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "" || !playing) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (playing) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Turno: ${currentPlayer}`;
  }
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  playing = true;
  statusText.textContent = "Turno: X";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);