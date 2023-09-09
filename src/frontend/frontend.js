const GRIDHEIGHT = 6
const GRIDLENGTH = 7

const board = document.getElementById('game-board');

createBoard()

const columns = document.querySelectorAll('.column')

columns.forEach(e => {
  e.addEventListener('mouseenter', columnHover)
  e.addEventListener('mouseleave', columnHover)
})

function columnHover(event) {
  event.target.classList.toggle('column-hover')
}

const cells = document.querySelectorAll('.cell')

cells.forEach(e => {
  e.addEventListener('mouseenter', cellHover)
  e.addEventListener('mouseleave', cellHover)
})

function cellHover(event) {
  event.target.classList.toggle('cell-hover')
}

const powerUps = document.querySelectorAll('.power-up')

powerUps.forEach(e => {
  e.addEventListener('click', powerUpClick)
});

function powerUpClick(event) {
  const button = event.target

  if (button.style.backgroundColor === '' || button.style.backgroundColor === 'initial') {
    button.style.backgroundColor = 'rgb(255, 61, 61)'
  } else if (button.style.backgroundColor === 'rgb(255, 61, 61)') {
    button.style.backgroundColor = 'initial'
  }
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