// ----------------------
// GAME STATE
// ----------------------
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // human
let botPlayer = "O";
let difficulty = null; // declare first

// ----------------------
// GET DIFFICULTY FROM URL
// ----------------------
const urlParams = new URLSearchParams(window.location.search);
const bot = urlParams.get("bot"); // "noob", "medium", or "hard"

if (bot === "noob") difficulty = "easy";
if (bot === "medium") difficulty = "medium";
if (bot === "hard") difficulty = "hard";

// ----------------------
// ELEMENTS
// ----------------------
const cells = document.querySelectorAll(".cell");

// ----------------------
// RESET GAME
// ----------------------
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    cells.forEach(c => {
        c.textContent = "";
        c.classList.remove("taken");
    });
}

// ----------------------
// CHECK WIN
// ----------------------
function checkWin(player) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => 
        pattern.every(i => board[i] === player)
    );
}

function checkDraw() {
    return board.every(c => c !== "");
}

// ----------------------
// HANDLE USER CLICK
// ----------------------
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;

        if (board[index] !== "" || difficulty === null) return;

        playMove(index, "X");
        if (checkWin("X")) {
            alert("You win!");
            resetGame();
            return;
        }
        if (checkDraw()) {
            alert("Draw!");
            resetGame();
            return;
        }

        // BOT TURN
        setTimeout(() => {
            let botMove;

            if (difficulty === "easy") botMove = noobMove(board);
            if (difficulty === "medium") botMove = mediumMove(board);
            if (difficulty === "hard") botMove = hardMove(board);

            playMove(botMove, "O");

            if (checkWin("O")) {
                alert("Bot wins!");
                resetGame();
            }
            if (checkDraw()) {
                alert("Draw!");
                resetGame();
            }
        }, 400);
    });
});

// ----------------------
// PLAY MOVE FUNCTION
// ----------------------
function playMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add("taken");
}
