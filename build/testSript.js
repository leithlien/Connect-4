import { newGame, Player, printGrid } from './Connect4.js';
import { playTurn } from './PlayTurn.js';
const board = newGame();
const player1 = new Player('X');
const player2 = new Player('O');
playTurn(board, player2, 2, '');
playTurn(board, player1, 3, '');
playTurn(board, player1, 3, '');
playTurn(board, player2, 2, '');
printGrid(board);
playTurn(board, player1, 3, '');
playTurn(board, player2, 2, '');
playTurn(board, player1, 3, '');
playTurn(board, player2, 2, '');
printGrid(board);
