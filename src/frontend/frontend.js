import { newGame, Player, printGrid } from '../../build/Connect4.js'
import { playTurn } from '../../build/PlayTurn.js'
import { colIsFull, checkWin } from '../../build/GameState.js'

const GRIDHEIGHT = 6
const GRIDLENGTH = 7

let board = newGame()
const player1 = new Player('X')
const player2 = new Player('O')
let player = player1
let power = ''
setUp()

function setUp() {
  boardSetUp()
  columnSetUp()
  cellSetUp()
  powerSetUp()
}

function boardSetUp() {
  const board = document.getElementById('game-board');
  for (let i = 0; i < GRIDLENGTH; i++) {
    const column = document.createElement('div')
    column.classList.add('column')
    column.dataset.col = i.toString();
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

function columnSetUp() {
  const columns = document.querySelectorAll('.column')

  columns.forEach(e => {
    e.addEventListener('mouseenter', columnHover)
    e.addEventListener('mouseleave', columnHover)
  })  
}

function columnHover(event) {
  event.target.classList.toggle('column-hover')
}

function cellSetUp() {
  const cells = document.querySelectorAll('.cell')

  cells.forEach(e => {
    e.addEventListener('mouseenter', cellHover)
    e.addEventListener('mouseleave', cellHover)
    e.addEventListener('click', cellClick)
  })
}

function cellHover(event) {
  event.target.classList.toggle('cell-hover')
}

function powerSetUp() {
  const powerUps = document.querySelectorAll('.power-up')

  powerUps.forEach(e => {
    e.addEventListener('click', powerUpClick)
  });

  function powerUpClick(event) {
    const button = event.target

    if (button.style.backgroundColor === 'rgb(255, 61, 61)') {
      button.style.backgroundColor = 'initial'
      power = ''
    } else {
      powerUps.forEach(e => {
        e.style.backgroundColor = 'initial'
      })
      button.style.backgroundColor = 'rgb(255, 61, 61)'
      power = button.innerHTML
    }
  }
}

function cellClick(event) {
  const cell = event.target
  const col = parseInt(cell.dataset.col)

  playTurn(board, player, col, power)

  if (power !== '') {
    const powerBtn = document.querySelectorAll(`div.power-up`)
    for (const btn of powerBtn) {
      btn.style.backgroundColor = 'initial'
    }
  }
  columnInfoResponse(col)

  const column = document.querySelector(`div.column[data-col="${col}"]`)
  const cells = column.querySelectorAll('div')

  //console.log(getEventListeners(column))

  cells.forEach(e => {
    const row = parseInt(e.dataset.row)
    const col = parseInt(e.dataset.col)
    if (checkWin(board, row, col)) {
      console.log('winner')
    }
  })

  if (colIsFull(board, col)) {
    column.classList.toggle('column-hover')
    column.removeEventListener('mouseenter', columnHover)
    column.removeEventListener('mouseleave', columnHover)
    cell.classList.toggle('cell-hover')
    cells.forEach(e => {
      e.removeEventListener('mouseenter', cellHover)
      e.removeEventListener('mouseleave', cellHover)
      e.removeEventListener('click', cellClick)
    })
  }

  if (power === '' || power === 'Pop') {
    player = player === player1 ? player2 : player1
  } {
    power = ''
  }
}

function columnInfoResponse(checkCol) {
  const column = document.querySelector(`div.column[data-col="${checkCol}"]`)
  const cells = column.querySelectorAll('div')
  cells.forEach(e => {
    const row = e.dataset.row
    const col = e.dataset.col
    e.innerHTML = board[row][col]
  })
}
