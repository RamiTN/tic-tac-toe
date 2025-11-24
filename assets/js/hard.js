function hardMove(board) {
    return minimax(board, "O").index;
}

function minimax(newBoard, player) {
    const human = "X";
    const bot = "O";

    const availSpots = newBoard
        .map((v, i) => (v === "" ? i : null))
        .filter(v => v !== null);

    if (checkWinner(newBoard, human)) return { score: -10 };
    if (checkWinner(newBoard, bot)) return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];

    for (let i of availSpots) {
        let move = {};
        move.index = i;
        newBoard[i] = player;

        if (player === bot) {
            let result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, bot);
            move.score = result.score;
        }

        newBoard[i] = "";
        moves.push(move);
    }

    let bestMove;
    if (player === bot) {
        let bestScore = -10000;
        moves.forEach((m, i) => {
            if (m.score > bestScore) {
                bestScore = m.score;
                bestMove = i;
            }
        });
    } else {
        let bestScore = 10000;
        moves.forEach((m, i) => {
            if (m.score < bestScore) {
                bestScore = m.score;
                bestMove = i;
            }
        });
    }

    return moves[bestMove];
}

// Helper for minimax
function checkWinner(board, player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(p => p.every(i => board[i] === player));
}
