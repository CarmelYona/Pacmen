'use strict'
const WALL = '🧱';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🍌'
const CHERRY = '🍒'


var gCherryInterval;
var gFoodCount = 0
var gFoodEatCount = 1

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    addCherry()
    gCherryInterval = setInterval(addCherry, 15000)
}

function restartGame() {
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    gFoodCount = 0
    gFoodEatCount = 1
    init()
    closeModal()
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--
            } else if ((i === 1) && ((j === 1) || (j === 8)) || ((i === 8) && ((j === 8) || (j === 1)))) {
                board[i][j] = SUPER_FOOD
                gFoodCount--
            }
        }
    }
    console.log(gFoodCount)
    return board;
}



function addCherry() {
    var emptyLocations = getEmptyLocations()
    if (!emptyLocations.length) return
    var emptyLocation = getRndEmptyLocation(emptyLocations)
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY)
}

function getRndEmptyLocation(emptyLocations) {
    var idx = getRandomInt(0, emptyLocations.length)
    var emptyLocation = emptyLocations[idx]
    return emptyLocation
}

function getEmptyLocations() {
    var locations = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === EMPTY) locations.push({ i, j })
        }
    }
    return locations
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

}

function checkVictory() {
    if (gFoodEatCount === gFoodCount) gameOver('Victory')
}

function openModal(msg) {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elModalH2 = elModal.querySelector('h2')
    elModalH2.innerText = msg
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function gameOver(msg) {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    openModal(msg)
}