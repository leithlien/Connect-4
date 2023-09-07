"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connect4_1 = require("./Connect4");
const PlayTurn_1 = require("./PlayTurn");
const GameState_1 = require("./GameState");
const board = (0, Connect4_1.newGame)();
const player1 = new Connect4_1.Player('X');
const player2 = new Connect4_1.Player('O');
(0, PlayTurn_1.playTurn)(board, player1, 0, 3, '');
(0, PlayTurn_1.playTurn)(board, player2, 0, 2, '');
(0, PlayTurn_1.playTurn)(board, player1, 0, 3, '');
(0, PlayTurn_1.playTurn)(board, player2, 0, 2, '');
(0, Connect4_1.printGrid)(board);
winChecker();
(0, PlayTurn_1.playTurn)(board, player1, 0, 3, '');
(0, PlayTurn_1.playTurn)(board, player2, 0, 2, '');
(0, PlayTurn_1.playTurn)(board, player1, 0, 3, '');
(0, PlayTurn_1.playTurn)(board, player2, 0, 2, '');
(0, Connect4_1.printGrid)(board);
winChecker();
function winChecker() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if ((0, GameState_1.checkWin)(board, i, j)) {
                console.log('win');
            }
        }
    }
}
