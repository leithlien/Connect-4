"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playTurn = void 0;
const GRIDHEIGHT = 6;
function playTurn(board, player, row, col, power) {
    switch (power) {
        case '':
            playNormal(board, player, col);
            break;
        case 'pop':
            popToken(board, row, col);
            break;
        case 'wall':
            playWall(board, player, col);
            player.power.wall -= 1;
            break;
        case 'anvil':
            playAnvil(board, player, col);
            player.power.anvil -= 1;
            break;
        case 'double':
            playNormal(board, player, col);
            player.power.double -= 1;
            break;
        case 'bomb':
            popToken(board, row, col);
            player.power.bomb -= 1;
            break;
    }
}
exports.playTurn = playTurn;
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
function popToken(board, row, col) {
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
            board[i][col] = 'W';
            return;
            // Not bottom row.
        }
        else if (board[i + 1][col] !== '') {
            board[i][col] = 'W';
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
