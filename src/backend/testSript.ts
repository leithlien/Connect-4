import { newGame, Player, printGrid } from './Connect4'
import { playTurn } from './PlayTurn'
import { checkWin } from './GameState'

const board = newGame()

const player1 = new Player('X')
const player2 = new Player('O')

playTurn(board, player1, 0, 3, '')
playTurn(board, player2, 0, 2, '')
playTurn(board, player1, 0, 3, '')
playTurn(board, player2, 0, 2, '')
printGrid(board)
console.log(checkWin(board, 5, 3))

playTurn(board, player1, 0, 3, '')
playTurn(board, player2, 0, 2, '')
playTurn(board, player1, 0, 3, '')
playTurn(board, player2, 0, 2, '')
printGrid(board)
console.log(checkWin(board, 5, 3))
