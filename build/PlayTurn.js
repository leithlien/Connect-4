const GRIDHEIGHT = 6;
function playTurn(board, player, col, power) {
    switch (power) {
        case '':
            playNormal(board, player, col);
            break;
        case 'Pop':
            playPop(board, col);
            break;
        case 'Wall':
            playWall(board, player, col);
            player.power.Wall -= 1;
            break;
        case 'Anvil':
            playAnvil(board, player, col);
            player.power.Anvil -= 1;
            break;
        case 'Double':
            playNormal(board, player, col);
            player.power.Double -= 1;
            break;
        case 'Bomb':
            playPop(board, col);
            player.power.Bomb -= 1;
            break;
    }
}
function playNormal(board, player, col) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        // Bottom row.
        if (i === GRIDHEIGHT - 1) {
            board[i][col] = player.token;
            return;
            // Not bottom row.
        }
        else if (board[i + 1][col] !== '') {
            board[i][col] = player.token;
            return;
        }
    }
}
function playPop(board, col) {
    // Remove the token.
    board[GRIDHEIGHT - 1][col] = " ";
    // Move all above tokens down one slot.
    for (let i = GRIDHEIGHT - 1; i > 0; i--) {
        board[i][col] = board[i - 1][col];
    }
    board[0][col] = '';
    return;
}
function playWall(board, player, col) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        // Bottom row.
        if (i === GRIDHEIGHT - 1) {
            board[i][col] = player.token + 'W';
            return;
            // Not bottom row.
        }
        else if (board[i + 1][col] !== '') {
            board[i][col] = player.token + 'W';
            return;
        }
    }
}
function playAnvil(board, player, col) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        board[i][col] = '';
    }
    board[GRIDHEIGHT - 1][col] = player.token + 'A';
    return;
}
export { playTurn };
