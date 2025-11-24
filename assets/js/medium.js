function mediumMove(board) {
    const human = "X";
    const bot = "O";

    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // 1. Can bot win? Take the winning move
    for (let p of winPatterns) {
        let [a,b,c] = p;
        let line = [board[a], board[b], board[c]];
        let botCount = line.filter(v => v === bot).length;
        let emptyCount = line.filter(v => v === "").length;
        
        if (botCount === 2 && emptyCount === 1) {
            if (board[a] === "") return a;
            if (board[b] === "") return b;
            if (board[c] === "") return c;
        }
    }

    // 2. Can human win? Block them
    for (let p of winPatterns) {
        let [a,b,c] = p;
        let line = [board[a], board[b], board[c]];
        let humanCount = line.filter(v => v === human).length;
        let emptyCount = line.filter(v => v === "").length;
        
        if (humanCount === 2 && emptyCount === 1) {
            if (board[a] === "") return a;
            if (board[b] === "") return b;
            if (board[c] === "") return c;
        }
    }

    // 3. Otherwise random move
    return noobMove(board);
}