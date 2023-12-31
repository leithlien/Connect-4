const GRIDHEIGHT = 6
const GRIDLENGTH = 7

enum Direction {
  UPLEFT, UP, UPRIGHT,
  LEFT, RIGHT,
  DOWNLEFT, DOWN, DOWNRIGHT
}

function colIsFull(board: string[][], col: number): boolean {
  for (let i = 0; i < GRIDHEIGHT; i++) {
    if (board[i][col] === '') {
      return false
    }
  }
  return true
}

function colIsEmpty(board: string[][], col: number): boolean {
  for (let i = 0; i < GRIDHEIGHT; i++) {
    if (board[i][col] !== '') {
      return false
    }
  }
  return true
}

function checkWin(board: string[][], row: number, col: number): string {
  if (board[row][col] === '') {
    return ''
  }

  const player = board[row][col]
  const streak = 0

  for (const key in Direction) {
    if (isNaN(Number(key))) {
      if (recurseFour(board, row, col, player, Direction[key as keyof typeof Direction], streak)) {
        return player
      }
    }
  }
  return ''
}

function recurseFour(board:string[][], row: number, col: number, player: string, direction: Direction, streak: number): boolean {
  let newRow = row
  let newCol = col

  // Four in a row have been found (base case).
  if (streak === 4) {
      return true;
  }

  if (player !== board[row][col]) {
    return false
  }

  // Current slot is correct, determine the next coordinates to recurse on depending on the direction.
  streak += 1;

  if (direction === Direction.UP || direction === Direction.UPRIGHT || direction === Direction.UPLEFT) {
      newRow = row - 1
  } else if (direction === Direction.DOWN || direction === Direction.DOWNLEFT || direction === Direction.DOWNRIGHT) {
      newRow = row + 1
  }

  if (direction === Direction.RIGHT || direction === Direction.UPRIGHT || direction === Direction.DOWNRIGHT) {
      newCol = col + 1
  } else if (direction === Direction.LEFT || direction === Direction.UPLEFT || direction === Direction.DOWNLEFT) {
      newCol = col - 1
  }

  if (newRow < 0 || newRow >= GRIDHEIGHT || newCol < 0 || newCol >= GRIDLENGTH) {
    return false
  }

  return recurseFour(board, newRow, newCol, player, direction, streak)
}

export { colIsFull, colIsEmpty, checkWin }
