const scoreDisplay = document.getElementById('score')
const startButton = document.getElementById('start-button')
const width = 28
let score = 0
let gameOverId
let checkWinId
let leftId
let rightId
let upId
let downId

const background = document.querySelector('body')
background.style.backgroundColor = 'red';

const grid = document.querySelector('.grid')
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const squares = []

//create your board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    //add layout to the board
    if(layout[i] === 0) {
      squares[i].classList.add('pac-dot')
      squares[i].innerHTML = '.'
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    }
  }
}
createBoard()

function startGame() {
  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))
  document.addEventListener('keyup', movePacman)
  checkWinId = setInterval(checkForWin, 100)
  gameOverId = setInterval(checkForGameOver, 100)
}
startButton.addEventListener('click', startGame)

//create Characters
//draw pacman onto the board
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pac-man')
squares[pacmanCurrentIndex].classList.add('pac-man-right')

function removePacman() {
  squares[pacmanCurrentIndex].classList.remove('pac-man')
  squares[pacmanCurrentIndex].classList.remove('pac-man-right')
  squares[pacmanCurrentIndex].classList.remove('pac-man-left')
  squares[pacmanCurrentIndex].classList.remove('pac-man-down')
  squares[pacmanCurrentIndex].classList.remove('pac-man-up')
}

function goLeft() {
  clearInterval(rightId)
  clearInterval(upId)
  clearInterval(downId)
  leftId = setInterval(function () {
    if (
    squares[pacmanCurrentIndex -1].classList.contains('wall') ||
    squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
    ) {
      clearInterval(leftId)
    } else {
      removePacman()
      pacmanCurrentIndex -= 1
      if (squares[pacmanCurrentIndex -1] === squares[363]) {
        pacmanCurrentIndex = 391
      }
      pacDotEaten()
      powerPelletEaten()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    squares[pacmanCurrentIndex].classList.add('pac-man-left')
  }, 500)
}

function goRight() {
  clearInterval(leftId)
  clearInterval(upId)
  clearInterval(downId)
  rightId = setInterval(function () {
    if(
      squares[pacmanCurrentIndex +1].classList.contains('wall') ||
      squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
    ) {
      clearInterval(rightId)
    } else {
      removePacman()
      pacmanCurrentIndex += 1
      if (squares[pacmanCurrentIndex +1] === squares[392]) {
        pacmanCurrentIndex = 364
      }
      pacDotEaten()
      powerPelletEaten()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    squares[pacmanCurrentIndex].classList.add('pac-man-right')
  }, 500)
}

function goUp() {
  clearInterval(rightId)
  clearInterval(leftId)
  clearInterval(downId)
  upId = setInterval(function () {
  if(
    squares[pacmanCurrentIndex -width].classList.contains('wall') ||
    squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
    ) {
      clearInterval(upId)
    } else {
      removePacman()
      pacmanCurrentIndex -= width
      squares[pacmanCurrentIndex].classList.add('pac-man')
      squares[pacmanCurrentIndex].classList.add('pac-man-up')
      pacDotEaten()
      powerPelletEaten()
    }
  }, 500)
}

function goDown() {
  clearInterval(rightId)
  clearInterval(upId)
  clearInterval(leftId)
  downId = setInterval(function () {
    if (
      squares[pacmanCurrentIndex +width].classList.contains('wall') ||
      squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
    ) {
      clearInterval(downId)
    } else {
      removePacman()
      pacmanCurrentIndex += width
      squares[pacmanCurrentIndex].classList.add('pac-man')
      squares[pacmanCurrentIndex].classList.add('pac-man-down')
      pacDotEaten()
      powerPelletEaten()
    }
  }, 500)
}

//move pacman
function movePacman(e) {
  switch(e.keyCode) {
    case 37:
       goLeft()
      break
    case 38:
        goUp()
      break
    case 39:
        goRight()
      break
    case 40:
        goDown()
      break
  }
}

// what happens when you eat a pac-dot
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    squares[pacmanCurrentIndex].innerHTML = ''
  }
}

//what happens when you eat a power-pellet
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    score +=10
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhosts, 10000)
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
  }
}

//make the ghosts stop flashing
function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
}

//create ghosts using Constructors
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

//all my ghosts
ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
  ]

//draw my ghosts onto the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
  })

function moveGhost(ghost) {
  const directions =  [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function() {
    //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
    if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
        //remove the ghosts classes
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        //move into that space
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    //else find a new random direction ot go in
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is currently scared and pacman is on it
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score +=100
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
  }, ghost.speed)
}

//check for a game over
function checkForGameOver() {
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'YOU LOSE!'
    clearInterval(gameOverId)
    clearInterval(checkWinId)
  }
}

//check for a win - more is when this score is reached
function checkForWin() {
  if (score > 274) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'YOU WIN!'
    clearInterval(gameOverId)
    clearInterval(checkWinId)
  }
}

// Please hide your SDK key and do not publish onto GitHub or share on the internet. This project is for your own local use only and not to be published onto
// your GitHub with your Key visible to others.
// This is advice for your own benefit. You can hide your SDK Key by converting this project to use packages such as .dotenv. 
var alanBtnInstance = alanBtn({
  key: process.env.ALAN_SDK,
  onCommand: function (commandData) {
    if (commandData.command === "go-left") {
      goLeft()
    }
    if (commandData.command === "go-right") {
      goRight()
    }
    if (commandData.command === "go-down") {
      goDown()
    }
    if (commandData.command === "go-up") {
      goUp()
    }
    if (commandData.command === "start-game") {
      startGame()
    }
  },
  rootEl: document.getElementById("alan-btn"),
});
