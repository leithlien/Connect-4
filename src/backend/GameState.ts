const GRIDHEIGHT = 6
const GRIDLENGTH = 7

enum Direction {
  UPLEFT, UP, UPRIGHT,
  LEFT, RIGHT,
  DOWNLEFT, DOWN, DOWNRIGHT
}

function checkWin(board: string[][], row: number, col: number): boolean {
  if (board[row][col] === '') {
    return false
  }

  const player = board[row][col]
  const streak = 0

  const values =  Object.values(Direction)
  values.forEach((value) => {
    if (recurseFour(board, row, col, player, value as Direction, streak)) {
      return true
    }
  })
  return false
}

function recurseFour(board:string[][], row: number, col: number, player: string, direction: Direction, streak: number): boolean {
  console.log('\n')
  console.log(row)
  console.log(col)
  console.log(direction)
  console.log(streak)
  console.log(player)
  let newRow = row;
  let newCol = col;

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
      newRow = row - 1;
  } else if (direction === Direction.DOWN || direction === Direction.DOWNLEFT || direction === Direction.DOWNRIGHT) {
      newRow = row + 1;
  }

  if (direction === Direction.RIGHT || direction === Direction.UPRIGHT || direction === Direction.DOWNRIGHT) {
      newCol = col + 1;
  } else if (direction === Direction.LEFT || direction === Direction.UPLEFT || direction === Direction.DOWNLEFT) {
      newCol = col - 1;
  }

  if (newRow < 0 || newRow >= GRIDHEIGHT || newCol < 0 || newCol >= GRIDLENGTH) {
    return false
  }

  return recurseFour(board, newRow, newCol, player, direction, streak)
}

export { checkWin }
