const GRIDHEIGHT = 6

import { Player } from './Connect4'

function playTurn(board: string[][], player: Player, row: number, col: number, power: string): void {
  switch (power) {
    case '':
      playNormal(board, player, col)
      break
    case 'pop':
      popToken(board, row, col)
      break
    case 'wall':
      playWall(board, player, col)
      player.power.wall -= 1
      break
    case 'anvil':
      playAnvil(board, player, col)
      player.power.anvil -= 1
      break
    case 'double':
      playNormal(board, player, col)
      player.power.double -= 1
      break
    case 'bomb':
      popToken(board, row, col)
      player.power.bomb -= 1
      break
  }
}

function playNormal(board: string[][], player: Player, col: number) {
  for (let i = 0; i < GRIDHEIGHT; i++) {

    // Bottom row.
    if (i === GRIDHEIGHT - 1) {
        board[i][col] = player.token
        return
    
    // Not bottom row.
    } else if (board[i + 1][col] !== '') {
        board[i][col] = player.token
        return
    }
  }
}

function popToken(board: string[][], row: number, col: number) {
  // Remove the token.
  board[GRIDHEIGHT - 1][col] = " "

  // Move all above tokens down one slot.
  for (let i = GRIDHEIGHT - 1; i > 0; i--) {
    board[i][col] = board[i - 1][col]
  }
  board[0][col] = '';
  return
}

function playWall(board: string[][], player: Player, col: number) {
  for (let i = 0; i < GRIDHEIGHT; i++) {

    // Bottom row.
    if (i === GRIDHEIGHT - 1) {
        board[i][col] = 'W';
        return;
    
    // Not bottom row.
    } else if (board[i + 1][col] !== '') {
        board[i][col] = 'W';
        return;
    }
  }
}

function playAnvil(board: string[][], player: Player, col: number) {
  for (let i = 0; i < GRIDHEIGHT; i++) {
    board[i][col] = '';
  }

  board[GRIDHEIGHT - 1][col] = player.token + 'A'
  return
}

export { playTurn }