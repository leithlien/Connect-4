const GRIDHEIGHT = 6
const GRIDLENGTH = 7

const board = document.getElementById('game-board');

createBoard()

const cells = document.querySelectorAll('.cell')
const powerUps = document.querySelectorAll('.power-up')

powerUps.forEach(e => {
  e.addEventListener('click', powerUpClick)
});

function powerUpClick(event) {
  console.log('here')
  const button = event.target
  button.style.backgroundColor = '#ff3d3d'
}


function createBoard() {
  for (let i = 0; i < GRIDLENGTH; i++) {
    const column = document.createElement('div')
    column.classList.add('column')
    for (let j = 0; j < GRIDHEIGHT; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.row = j.toString();
      cell.dataset.col = i.toString();
      column.appendChild(cell)
    }
    board.appendChild(column)
  }
}