"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printGrid = exports.Player = exports.newGame = void 0;
const GRIDHEIGHT = 6;
const GRIDLENGTH = 7;
function newGame() {
    return Array.from({ length: GRIDHEIGHT }, () => Array(GRIDLENGTH).fill(''));
}
exports.newGame = newGame;
class Player {
    constructor(token) {
        this.token = token;
        this.power = {
            wall: 1,
            anvil: 1,
            double: 1,
            bomb: 1
        };
    }
}
exports.Player = Player;
function printGrid(board) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        process.stdout.write("| ");
        for (let j = 0; j < GRIDLENGTH; j++) {
            if (board[i][j] === '') {
                process.stdout.write('  ');
            }
            else {
                process.stdout.write(`${board[i][j]} `);
            }
        }
        console.log("|");
    }
    console.log("-----------------");
    console.log("--0-1-2-3-4-5-6--\n");
}
exports.printGrid = printGrid;
