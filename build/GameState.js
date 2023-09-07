"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWin = void 0;
const GRIDHEIGHT = 6;
const GRIDLENGTH = 7;
var Direction;
(function (Direction) {
    Direction[Direction["UPLEFT"] = 0] = "UPLEFT";
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["UPRIGHT"] = 2] = "UPRIGHT";
    Direction[Direction["LEFT"] = 3] = "LEFT";
    Direction[Direction["RIGHT"] = 4] = "RIGHT";
    Direction[Direction["DOWNLEFT"] = 5] = "DOWNLEFT";
    Direction[Direction["DOWN"] = 6] = "DOWN";
    Direction[Direction["DOWNRIGHT"] = 7] = "DOWNRIGHT";
})(Direction || (Direction = {}));
function checkWin(board, row, col) {
    if (board[row][col] === '') {
        return false;
    }
    const player = board[row][col];
    const streak = 0;
    const values = Object.values(Direction);
    values.forEach((value) => {
        if (recurseFour(board, row, col, player, value, streak)) {
            return true;
        }
    });
    return false;
}
exports.checkWin = checkWin;
function recurseFour(board, row, col, player, direction, streak) {
    console.log('\n');
    console.log(row);
    console.log(col);
    console.log(direction);
    console.log(streak);
    console.log(player);
    let newRow = row;
    let newCol = col;
    // Four in a row have been found (base case).
    if (streak === 4) {
        return true;
    }
    if (player !== board[row][col]) {
        return false;
    }
    // Current slot is correct, determine the next coordinates to recurse on depending on the direction.
    streak += 1;
    if (direction === Direction.UP || direction === Direction.UPRIGHT || direction === Direction.UPLEFT) {
        newRow = row - 1;
    }
    else if (direction === Direction.DOWN || direction === Direction.DOWNLEFT || direction === Direction.DOWNRIGHT) {
        newRow = row + 1;
    }
    if (direction === Direction.RIGHT || direction === Direction.UPRIGHT || direction === Direction.DOWNRIGHT) {
        newCol = col + 1;
    }
    else if (direction === Direction.LEFT || direction === Direction.UPLEFT || direction === Direction.DOWNLEFT) {
        newCol = col - 1;
    }
    if (newRow < 0 || newRow >= GRIDHEIGHT || newCol < 0 || newCol >= GRIDLENGTH) {
        return false;
    }
    return recurseFour(board, newRow, newCol, player, direction, streak);
}
