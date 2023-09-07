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
      wall: 1,
      anvil: 1,
      double: 1,
      bomb: 1
    }
  }
}

function printGrid(board: string[][]): void {
  for (let i = 0; i < GRIDHEIGHT; i++) {
      process.stdout.write("| ");
      for (let j = 0; j < GRIDLENGTH; j++) {
        if (board[i][j] === '') {
          process.stdout.write('  ')
        } else {
          process.stdout.write(`${board[i][j]} `);
        }
      }
      console.log("|");
  }
  console.log("-----------------");
  console.log("--0-1-2-3-4-5-6--\n");
}

export { newGame, Player, printGrid }
