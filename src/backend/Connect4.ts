const GRIDHEIGHT = 6
const GRIDLENGTH = 7

function newGame(): string[][] {
  return Array.from({ length: GRIDHEIGHT }, () => Array(GRIDLENGTH).fill(''))
}

class Player {
  public token: string
  public power: { [key: string]: number }

  constructor(token: string) {
    this.token = token
    this.power = {
      Wall: 1,
      Anvil: 1,
      Double: 1,
      Bomb: 1
    }
  }
}

function printGrid(board: string[][]): void {
  for (let i = 0; i < GRIDHEIGHT; i++) {
      let str = '| '
      for (let j = 0; j < GRIDLENGTH; j++) {
        if (board[i][j] === '') {
          str += '  '
        } else {
          str += board[i][j] + ' '
        }
      }
      str += '|'
      console.info(str)
  }
  console.info("-----------------");
  console.info("--0-1-2-3-4-5-6--\n");
}

export { newGame, Player, printGrid }
