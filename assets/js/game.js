// ----------------------
// GAME STATE
// ----------------------
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // human
let botPlayer = "O";
let difficulty = null;

// ----------------------
// GET DIFFICULTY FROM URL
// ----------------------
(function setDifficultyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const bot = urlParams.get("bot"); // "noob", "medium", or "hard"

    if (bot === "noob") difficulty = "easy";
    else if (bot === "medium") difficulty = "medium";
    else if (bot === "hard") difficulty = "hard";
})();

// ----------------------
// ELEMENTS
// ----------------------
const cells = document.querySelectorAll(".column-tic");

// ----------------------
// RESET GAME
// ----------------------
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    cells.forEach(c => {
        c.classList.remove("column-tic1");
        const cercle = c.querySelector(".cercle");
        const tick = c.querySelector(".tick");
        if (cercle) cercle.style.display = "none";
        if (tick) tick.style.display = "none";
    });
    
    const line = document.querySelector(".line");
    if (line) line.style.display = "none";
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
// SHOW WIN LINE
// ----------------------
function showWinLine() {
    const line = document.querySelector(".line");
    if (line) line.style.display = "block";
}

// ----------------------
// PLAY MOVE FUNCTION
// ----------------------
function playMove(index, player) {
    board[index] = player;
    
    const cell = cells[index];
    
    if (player === "X") {
        // X = tick (croix)
        const tick = cell.querySelector(".tick");
        if (tick) tick.style.display = "inline-block";
    } else {
        // O = cercle
        cell.classList.add("column-tic1");
        const cercle = cell.querySelector(".cercle");
        if (cercle) cercle.style.display = "inline-block";
    }
}

// ----------------------
// HANDLE USER CLICK
// ----------------------
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;

        if (board[index] !== "" || difficulty === null) return;

        // Human move (X)
        playMove(index, "X");

        if (checkWin("X")) {
            showWinLine();
            setTimeout(() => {
                alert("You win!");
                resetGame();
            }, 500);
            return;
        }
        if (checkDraw()) {
            alert("Draw!");
            resetGame();
            return;
        }

        // BOT move (O)
        setTimeout(() => {
            let botMove;
            if (difficulty === "easy") botMove = noobMove(board);
            else if (difficulty === "medium") botMove = mediumMove(board);
            else if (difficulty === "hard") botMove = hardMove(board);

            playMove(botMove, "O");

            if (checkWin("O")) {
                showWinLine();
                setTimeout(() => {
                    alert("Bot wins!");
                    resetGame();
                }, 500);
                return;
            }
            if (checkDraw()) {
                alert("Draw!");
                resetGame();
                return;
            }
        }, 400);
    });
});