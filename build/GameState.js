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
function colIsFull(board, col) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        if (board[i][col] === '') {
            return false;
        }
    }
    return true;
}
function colIsEmpty(board, col) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        if (board[i][col] !== '') {
            return false;
        }
    }
    return true;
}
function checkWin(board, row, col) {
    if (board[row][col] === '') {
        return '';
    }
    const player = board[row][col];
    const streak = 0;
    for (const key in Direction) {
        if (isNaN(Number(key))) {
            if (recurseFour(board, row, col, player, Direction[key], streak)) {
                return player;
            }
        }
    }
    return '';
}
function recurseFour(board, row, col, player, direction, streak) {
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
export { colIsFull, colIsEmpty, checkWin };
