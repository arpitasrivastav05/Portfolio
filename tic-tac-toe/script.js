const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupBtn = document.getElementById("popupBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  const winningPattern = getWinningPattern();
  if (winningPattern) {
    highlightWinningCells(winningPattern);
    statusText.textContent = `Player ${currentPlayer} wins!`;
    showPopup("🎉 Winner!", `Player ${currentPlayer} wins the game!`);
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    showPopup("😅 Draw!", "Nobody won this round. Try again!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningPattern() {
  return winPatterns.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => cells[index].classList.add("winner-cell"));
}

function showPopup(title, message) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.classList.add("show");
  popup.setAttribute("aria-hidden", "false");
}

function closePopup() {
  popup.classList.remove("show");
  popup.setAttribute("aria-hidden", "true");
  resetGame();
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner-cell");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
popupBtn.addEventListener("click", closePopup);
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.classList.contains("show")) closePopup();
});
