import { newGame, Player, printGrid } from '../../build/Connect4.js'
import { playTurn } from '../../build/PlayTurn.js'
import { colIsFull, colIsEmpty, checkWin } from '../../build/GameState.js'

const GRIDHEIGHT = 6
const GRIDLENGTH = 7

let board = newGame()
const player1 = new Player('X')
const player2 = new Player('O')
let player = player1
let power = ''
let powerCd = 0
const popup = document.getElementsByClassName('popup')[0]
const popupContent = document.getElementsByClassName('popup-content')[0]

setUp()

function setUp() {
  boardSetUp()
  columnSetUp()
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
    e.addEventListener('click', columnClick)
  })  
}

function columnHover(event) {
  event.target.classList.toggle('column-hover')
}

function powerSetUp() {
  const powerUps = document.querySelectorAll('.power-up')

  powerUps.forEach(e => {
    e.addEventListener('click', powerUpClick)
    e.addEventListener('click', updateColumnHover)
  });
}

function powerUpClick(event) {
  const powerUps = document.querySelectorAll('.power-up')
  const button = event.target

  if (button.style.backgroundColor === 'rgb(255, 61, 61)') {
    button.style.backgroundColor = 'initial'
    power = ''
  } else {
    powerUps.forEach(e => {
      if (e.style.backgroundColor === 'rgb(255, 61, 61)')
      e.style.backgroundColor = 'initial'
    })
    button.style.backgroundColor = 'rgb(255, 61, 61)'
    power = button.innerHTML
  }
}

function columnClick(event) {
  infoResponse()

  const column = event.currentTarget
  const col = parseInt(column.dataset.col)

  playTurn(board, player, col, power)

  if (power !== '') {
    const powerBtn = document.querySelectorAll(`div.power-up`)
    for (const btn of powerBtn) {
      btn.style.backgroundColor = 'initial'
    }
  }

  const cells = document.querySelectorAll('.cell')
  let winner = ''
  let xWin = false
  let oWin = false

  cells.forEach(e => {
    const row = parseInt(e.dataset.row)
    const col = parseInt(e.dataset.col)

    if (checkWin(board, row, col) !== '') {
      if (board[row][col] === 'X') {
        xWin = true
        winner = 'X'
      }
      if (board[row][col] === 'O') {
        oWin = true
        winner = 'O'
      }
    }
  })

  if (xWin || oWin) {
    //disable column

    if (xWin && oWin) {
      popupContent.innerHTML = 'Draw!'
      history.innerHTML += player + ' DRAW!<br>'
    } else {
      popupContent.innerHTML = winner + ' has won!'
      history.innerHTML += player + ' WON!<br>'
    }

    popup.style.display = 'block'
    history.scrollTop = history.scrollHeight

    const closeBtn = document.getElementsByClassName('close-btn')[0]
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none'
    })
  }

  if (power === '' || power === 'Pop') {
    player = player === player1 ? player2 : player1
    const turnDiv = document.getElementById('whose-turn')
    turnDiv.innerHTML = 'Turn = ' + player.token
    powerCd = 0
  } else {
    power = ''
    powerCd = 1
  }

  infoResponse()
}

function infoResponse() {
  columnInfoResponse()
  powerInfoResponse()
}

function powerInfoResponse() {
  const powerBtns = document.querySelectorAll('div.power-up')
  for (const powerBtn of powerBtns) {
    if (powerCd !== 1) {
      powAddListeners(powerBtn)
    }

    if (
      (powerBtn.innerHTML === 'Wall' && player.power['Wall'] !== 0)
      || (powerBtn.innerHTML === 'Anvil' && player.power['Anvil'] !== 0)
      || (powerBtn.innerHTML === 'Double' && player.power['Double'] !== 0)
      || (powerBtn.innerHTML === 'Bomb' && player.power['Bomb'] !== 0)
    ) {
      powAddListeners(powerBtn)
    }

    if (
      (powerBtn.innerHTML === 'Wall' && player.power['Wall'] === 0)
      || (powerBtn.innerHTML === 'Anvil' && player.power['Anvil'] === 0)
      || (powerBtn.innerHTML === 'Double' && player.power['Double'] === 0)
      || (powerBtn.innerHTML === 'Bomb' && player.power['Bomb'] === 0)
    ) {
      powRemoveListeners(powerBtn)
    }

    if (powerCd === 1) {
      powRemoveListeners(powerBtn)
    }
  }
}

function columnInfoResponse() {
  updateColumnInfo()
  updateColumnHover()
}

function updateColumnInfo() {
  for (let i = 0; i < GRIDLENGTH; i++) {
    const column = document.querySelector(`div.column[data-col="${i}"]`)
    const cells = column.querySelectorAll('div')
    cells.forEach(e => {
      const row = e.dataset.row
      const col = e.dataset.col
      e.innerHTML = board[row][col]
  })
  }
}

function updateColumnHover() {
  if (power === '' || power == 'Wall' || power == 'Double') {
    playPieceResponse()
  } else if (power === 'Pop' || power === 'Bomb') {
    playDestroyResponse()
  } else if (power === 'Anvil') {
    playAnvilResponse()
  }
}

function playPieceResponse() {
  for (let i = 0; i < GRIDLENGTH; i++) {
    const column = document.querySelector(`div.column[data-col="${i}"]`)
    if (colIsFull(board, i)) {
      colRemoveListeners(column)
    } else {
      colAddListeners(column)
    }
  }
}

function playDestroyResponse() {
  for (let i = 0; i < GRIDLENGTH; i++) {
    const column = document.querySelector(`div.column[data-col="${i}"]`)
    if (colIsEmpty(board, i)) {
      colRemoveListeners(column)
    } else {
      if (
        (power === 'Pop' && board[GRIDHEIGHT - 1][i] === player.token) 
        || (power === 'Bomb' && board[GRIDHEIGHT - 1][i] !== player.token)
        ) {
          colAddListeners(column)
      } else {
        colRemoveListeners(column)
      }
    }
  }
}

function playAnvilResponse() {
  for (let i = 0; i < GRIDLENGTH; i++) {
    const column = document.querySelector(`div.column[data-col="${i}"]`)
    colAddListeners(column)
  }
}

function colAddListeners(column) {
  column.addEventListener('mouseenter', columnHover)
  column.addEventListener('mouseleave', columnHover)
  column.addEventListener('click', columnClick)
}

function colRemoveListeners(column) {
  if (column.classList.contains('column-hover')) {
    column.classList.toggle('column-hover')
  }
  column.removeEventListener('mouseenter', columnHover)
  column.removeEventListener('mouseleave', columnHover)
  column.removeEventListener('click', columnClick)
}

function powAddListeners(power) {
  power.style.backgroundColor = 'initial'
  power.addEventListener('click', powerUpClick)
  power.addEventListener('click', updateColumnHover)
}

function powRemoveListeners(power) {
  power.style.backgroundColor = 'rgb(170, 170, 170)'
  power.removeEventListener('click', powerUpClick)
  power.removeEventListener('click', updateColumnHover)
}