const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const playActionBtn = document.getElementById("play-action");
const restartBtn = document.getElementById("restart");
const currentPlayerText = document.getElementById("current-player");
const scoreXText = document.getElementById("score-x");
const scoreOText = document.getElementById("score-o");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let playing = true;
let startingPlayer = "X";
let scores = {
  X: 0,
  O: 0,
};
let roundStarted = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateTurn() {
  statusText.textContent = `Turno: ${currentPlayer}`;
  currentPlayerText.textContent = currentPlayer;
}

function updateScores() {
  scoreXText.textContent = scores.X;
  scoreOText.textContent = scores.O;
}

function clearBoard() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

function updateControls() {
  board.classList.toggle("disabled", !playing);

  if (!roundStarted) {
    playActionBtn.textContent = "Jugar";
    playActionBtn.disabled = false;
    return;
  }

  if (playing) {
    playActionBtn.textContent = "Jugando";
    playActionBtn.disabled = true;
    return;
  }

  playActionBtn.textContent = "Revancha";
  playActionBtn.disabled = false;
}

function startRound() {
  clearBoard();
  currentPlayer = startingPlayer;
  playing = true;
  roundStarted = true;
  updateTurn();
  updateControls();
  startingPlayer = startingPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;

    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      scores[gameState[a]] += 1;
      updateScores();
      statusText.textContent = `Gano ${gameState[a]}`;
      combo.forEach(index => cells[index].classList.add("win"));
      playing = false;
      updateControls();
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Empate";
    playing = false;
    updateControls();
  }
}

function handleClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (gameState[index] !== "" || !playing) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  checkWinner();

  if (playing) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurn();
  }
}

function restartGame() {
  clearBoard();
  currentPlayer = "X";
  startingPlayer = "X";
  playing = false;
  roundStarted = false;
  scores = {
    X: 0,
    O: 0,
  };
  statusText.textContent = "Presiona Jugar para empezar";
  currentPlayerText.textContent = "X";
  updateScores();
  updateControls();
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
playActionBtn.addEventListener("click", startRound);
restartBtn.addEventListener("click", restartGame);
restartGame();
updateScores();
