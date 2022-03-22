'use strict'
const GHOST = '👻';
var gGhosts;
var gIntervalGhosts;
var gRemovedGhosts = []

function createGhost(board) {
    var color = getRandomColor()
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: color,
        originalColor: color
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST
}

function reviveGhosts() {
    for (var i = 0; i < gRemovedGhosts.length; i++) {
        gGhosts.push(gRemovedGhosts[i])
    }
    gRemovedGhosts = []
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if ((ghost.location.i === location.i) &&
            (ghost.location.j === location.j)) {
            checkCurrCellContent(ghost)
            gRemovedGhosts.push(ghost)
            gGhosts.splice(i, 1)
        }
    }
}

function checkCurrCellContent(ghost) {
    var contant = ghost.currCellContent
    if (contant === FOOD) {
        gFoodCount++
        updateScore(1)
    }
    ghost.currCellContent = EMPTY
}

function changeGhostColor(isSuper) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (isSuper) {
            ghost.color = 'blue'
        } else ghost.color = gGhosts[i].originalColor
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell);

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
        // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver('you lose');
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location.i = nextLocation.i;
    ghost.location.j = nextLocation.j;
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST
        // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}