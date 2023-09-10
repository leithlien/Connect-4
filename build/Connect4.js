const GRIDHEIGHT = 6;
const GRIDLENGTH = 7;
function newGame() {
    return Array.from({ length: GRIDHEIGHT }, () => Array(GRIDLENGTH).fill(''));
}
class Player {
    constructor(token) {
        this.token = token;
        this.power = {
            Wall: 1,
            Anvil: 1,
            Double: 1,
            Bomb: 1
        };
    }
}
function printGrid(board) {
    for (let i = 0; i < GRIDHEIGHT; i++) {
        let str = '| ';
        for (let j = 0; j < GRIDLENGTH; j++) {
            if (board[i][j] === '') {
                str += '  ';
            }
            else {
                str += board[i][j] + ' ';
            }
        }
        str += '|';
        console.info(str);
    }
    console.info("-----------------");
    console.info("--0-1-2-3-4-5-6--\n");
}
export { newGame, Player, printGrid };
