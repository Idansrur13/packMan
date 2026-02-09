'use strict'

const GHOST = '&#9865;'
var gGhosts = []
var isSuperGhost = false

var gGhostsInterval

function createGhosts() {
  // TODO: Create 3 ghosts and an interval
  for (var i = 0; i < 3; i++) {
    createGhost()
  }
  gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost() {
  // TODO: Create a ghost with arbitrary start pos & currCellContent
  const ghost = {
    pos: { i: 3, j: 3 },
    currCellContent: EMPTY,
    color: rundomColor(),
  }
  // TODO: Add the ghost to the ghosts array
  gGhosts.push(ghost)

  // TODO: Update the board
  gBoard[ghost.pos.i][ghost.pos.j] = GHOST
}

function moveGhosts() {
  // TODO: loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i])
  }
}

function moveGhost(ghost) {
  // TODO: figure out moveDiff, nextPos, nextCell
  const diff = getMoveDiff()
  const nextPos = {
    i: ghost.pos.i + diff.i,
    j: ghost.pos.j + diff.j,
  }
  const nextCell = gBoard[nextPos.i][nextPos.j]

  // TODO: return if cannot move
  if (nextCell === WALL || nextCell === GHOST) return

  // TODO: hitting a pacman? call gameOver
  if (nextCell === PACMAN && !isSuperGhost) {
    gameOver()
    return
  } else if (nextCell === PACMAN && isSuperGhost) {
    eatSuperGhost(nextPos)
    gBoard[ghost.pos.i][ghost.pos.j] = PACMAN
    renderCell(ghost.pos, PACMAN)
    gBoard[ghost.pos.i][ghost.pos.j] = PACMAN
    console.log(gBoard[ghost.pos.i][ghost.pos.j])
    return
  }

  // TODO: moving from current pos:
  // TODO: update the model (restore prev cell contents)
  gBoard[ghost.pos.i][ghost.pos.j] = ghost.currCellContent

  // TODO: update the DOM
  renderCell(ghost.pos, ghost.currCellContent)

  // TODO: Move the ghost to new pos:
  // TODO: update the model (save cell contents so we can restore later)
  ghost.pos = nextPos
  ghost.currCellContent = nextCell

  gBoard[ghost.pos.i][ghost.pos.j] = GHOST

  // TODO: update the DOM
  renderCell(ghost.pos, getGhostHTML(ghost))
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4)

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 }
    case 2:
      return { i: 1, j: 0 }
    case 3:
      return { i: 0, j: -1 }
    case 4:
      return { i: -1, j: 0 }
  }
}

function getGhostHTML(ghost) {
  var color
  if (isSuperGhost) {
    color = SUPERGHOSTCOLOR
  } else color = ghost.color
  return `<span class="ghost" style="color:${color};">${GHOST}</span>`
}

function rundomColor() {
  const hex = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)]
  }
  return color
}
