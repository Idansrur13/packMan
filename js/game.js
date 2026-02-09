'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const SUPERFOOD = '&#10022;'
const SUPERGHOSTCOLOR = '#82ff72ff'
const CHERRY = '🍒'
const EMPTY = ' '
const audioFight = new Audio('audio/fright.wav')
const audioDeath = new Audio('audio/death_0.wav')
const audioEatDot = new Audio('audio/eat_dot_1.wav')
const audioEatGhost = new Audio('audio/eat_ghost.wav')

const gGame = {
  score: 0,
  isOn: false,
}
var gBoard
var countFood

function init() {
  const btnOver = document.querySelector('.gameOver')
  countFood = 0
  isSuperGhost = false
  gGhosts = []

  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)

  renderBoard(gBoard, '.board-container')
  btnOver.style.display = 'none'
  gGame.isOn = true
  countFood = counterFood()
  setInterval(addCherry, 5000)
}

function buildBoard() {
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL
      }
    }
  }

  board[1][1] = SUPERFOOD
  board[8][8] = SUPERFOOD
  board[8][1] = SUPERFOOD
  board[1][8] = SUPERFOOD
  return board
}

function updateScore(diff) {
  // update model
  gGame.score += diff
  countFood--

  if (countFood === 0) {
    gameOver()
  }

  // update DOM
  const elScore = document.querySelector('.score span')
  elScore.innerText = gGame.score
}

function superFood() {
  isSuperGhost = true

  setTimeout(ghostReturn, 5000)
}

function addCherry() {
  var cherryPos = {
    i: getRandomIntInclusive(1, gBoard.length - 2),
    j: getRandomIntInclusive(1, gBoard[0].length - 2),
  }

  if (
    gBoard[cherryPos.i][cherryPos.j] === EMPTY ||
    gBoard[cherryPos.i][cherryPos.j] === FOOD
  ) {
    renderCell(cherryPos, CHERRY)
    gBoard[cherryPos.i][cherryPos.j] = CHERRY
  }
}

function eatSuperGhost(nextPos) {
  audioEatGhost.play()
  for (let i = 0; i < gGhosts.length; i++) {
    const ghost = gGhosts[i]
    if (ghost.pos.i === nextPos.i && ghost.pos.j === nextPos.j) {
      var indxGhost = gGhosts.indexOf(ghost)
      gGhosts.splice(indxGhost, 1)
      setTimeout(createGhost, 4000)
    }
  }
}

function ghostReturn() {
  isSuperGhost = false
}

function gameOver() {
  const btnOver = document.querySelector('.gameOver')
  console.log('Game Over')
  gGame.isOn = false
  btnOver.style.display = 'block'
  audioDeath.play()
}

function counterFood() {
  var count = 0
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      const currCell = gBoard[i][j]
      if (currCell === FOOD) {
        count++
      }
    }
  }
  return count
}
