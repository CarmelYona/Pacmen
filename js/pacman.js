'use strict'
var PACMAN = '😷';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    if (nextCell === WALL) return

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver('you lose');
        } else {
            removeGhost(nextLocation)
            checkVictory()
        }
    } else if (nextCell === FOOD) {
        gFoodEatCount++
        updateScore(1);
        checkVictory()
    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        PACMAN = '😈'
        superPacmenStart()
        setTimeout(superPacmenEnd, 5000)
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }





    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
    renderCell(gPacman.location, EMPTY);

    // Move the pacman to new location
    // update the model
    gPacman.location.i = nextLocation.i;
    gPacman.location.j = nextLocation.j;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
        // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function superPacmenStart() {
    gPacman.isSuper = true
    changeGhostColor(gPacman.isSuper)
}

function superPacmenEnd() {
    PACMAN = '😷'
    gPacman.isSuper = false
    changeGhostColor(gPacman.isSuper)
    reviveGhosts()
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }
    return nextLocation;
}