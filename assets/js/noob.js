function noobMove(board) {
    const empty = board
        .map((v, i) => (v === "" ? i : null))
        .filter(v => v !== null);

    return empty[Math.floor(Math.random() * empty.length)];
}