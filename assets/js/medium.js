function mediumMove(board) {
    const human = "X";
    const bot = "O";

    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // 1. Can bot win?
    for (let p of winPatterns) {
        let [a,b,c] = p;
        let line = [board[a], board[b], board[c]];
        if (line.filter(v => v === bot).length === 2 && line.includes("")) {
            return p[line.indexOf("")];
        }
    }

    // 2. Can player win? block him
    for (let p of winPatterns) {
        let [a,b,c] = p;
        let line = [board[a], board[b], board[c]];
        if (line.filter(v => v === human).length === 2 && line.includes("")) {
            return p[line.indexOf("")];
        }
    }

    // 3. Otherwise random
    return noobMove(board);
}
