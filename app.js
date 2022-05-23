/**
 * GLOBAL VARIABLES
*/

// Get 2D context for the game board
let board = document.querySelector('#board');
board.setAttribute('width', '850');
board.setAttribute('height', '700');
let ctx = board.getContext("2d");

// Variable for the player
let player;

// Variable to control the text below the game board
let prompt;

// Variable to control interval timer
let runGame;

// Variable to tell if the game is live
let isRunning = false;

// Array that holds all current game pieces
let pieces = [];

// Booleans to keep track of which keys are pressed down
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

// Player class with constructor and render function
class Player {
    constructor() {
        this.x = 400;
        this.y = 325;
        this.color = 'green';
        this.width = 50;
        this.height = 50;
        this.alive = true;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Obstacles class with constructor and render function
class Obstacle {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Render all current game pieces
function renderAll() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].render();
    }
}

// Create and render the player
createPlayer();
function createPlayer() {
    player = new Player();
    player.render();
    pieces.push(player);
}

/** 
 * EVENT LISTENERS
*/

// window.addEventListener("DOMContentLoaded", function (e) {

// })

// When the user presses Enter, create and render the player then start the game
window.addEventListener('keydown', function (e) {
    // console.log(`the ${e.key} key was pressed`);

    if (!isRunning) {
        switch (e.key) {
            case "Enter":
                startGame();
                break;
        }
    }
})

// After the game starts, run keydownHandler when a key is pressed
window.addEventListener('keydown', keydownHandler);

// After the game starts, run keyupHandler when a key is released
window.addEventListener('keyup', keyupHandler);

// Run the game
function startGame() {
    prompt = document.getElementById('prompt');
    prompt.style.display = "none";
    isRunning = true;
    firstPhase();
    runGame = setInterval(gameLoop, 1);
}

/**
 * GAME PROCESSES
*/

// Begin game loop/constantly clear and re-render the player
function gameLoop() {
    ctx.clearRect(0, 0, board.width, board.height);
    checkPlayerMovement();
    renderAll();
    // console.log(hitDetected());
    if (hitDetected() === true) {
        clearInterval(runGame);
        gameOver();
        return;
    }
}

function checkPlayerMovement() {
    if (upPressed === true) {
        player.y > 0 ? player.y -= 4 : null;
    }
    if (downPressed === true) {
        player.y < (board.height - player.height) ? player.y += 4 : null;
    }
    if (leftPressed === true) {
        player.x > 0 ? player.x -= 4 : null;
    }
    if (rightPressed === true) {
        player.x < (board.width - player.width) ? player.x += 4 : null;
    }
}

/**
 * COLLISION DETECTION
*/
let something = 0;
function hitDetected() {
    let isHitDetected = false;

    // for (let i = 1; i < pieces.length; i++) {
    for (let i = 0; i < 8; i++) {
        // if the player is touching the current element of the array
        isHitDetected = (player.x + player.width > pieces[1].x) &&
            (player.x < pieces[1].x + pieces[1].width) &&
            (player.y + player.height > pieces[1].y) &&
            (player.y < pieces[1].y + pieces[1].height) ||

            (player.x + player.width > pieces[2].x) &&
            (player.x < pieces[2].x + pieces[2].width) &&
            (player.y + player.height > pieces[2].y) &&
            (player.y < pieces[2].y + pieces[2].height) ||

            (player.x + player.width > pieces[3].x) &&
            (player.x < pieces[3].x + pieces[3].width) &&
            (player.y + player.height > pieces[3].y) &&
            (player.y < pieces[3].y + pieces[3].height)
            ;
        // console.log(`checking piece ${i}:`);
        // console.log(pieces[i]);
    }
    something++;
    console.log(something);
    return isHitDetected;
}

// End game
function gameOver() {
    // isRunning = false;
    // prompt.style.display = "inline";
    pieces = [];
    console.log(pieces);
    // createPlayer();
}

// Start first phase
function firstPhase() {
    console.log("running first phase");
    for (let j = 0; j < 16; j++) {
        setTimeout(function () {
            for (let i = 1; i <= 8; i++) {
                if (j % 2 === 0) {
                    setTimeout(fireArrow, i * 10, (i * 20), -99, 'white', 5, 100);
                    fireArrow((i * 20), -99, 'white', 5, 100);
                }
                else {
                    fireArrow(board.width - (i * 20), -99, 'white', 5, 100);
                }
            }
        }, j * 1000)
    }

    // TEST ARROW
    // const arrow = new Obstacle(100, 100, 'white', 5, 100);
    // pieces.push(arrow);
}

function fireArrow(x, y, color, width, height) {
    const arrow = new Obstacle(x, y, color, width, height);
    pieces.push(arrow);
    movePiece(arrow);
}

// Move obstacles
function movePiece(piece) {
    // console.log(piece);
    piece.y += 8;

    // If the piece is still on screen, keep moving it
    if (piece.y < board.height) {
        setTimeout(movePiece, 10, piece);
    }
    // Otherwise, stop moving it, and remove it from the pieces array
    else {
        pieces.splice(pieces.indexOf(piece), 1);
        // console.log(pieces);
    }
}

/**
 * KEYBOARD INTERACTION LOGIC
*/

// Movement handler that lets the player move with WASD or the Arrow Keys
function keydownHandler(e) {
    if (e.key === "w" || e.key === "ArrowUp") {
        upPressed = true;
    }
    if (e.key === "s" || e.key === "ArrowDown") {
        downPressed = true;
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
    if (e.key === "d" || e.key === "ArrowRight") {
        rightPressed = true;
    }
}

// Movement handler that lets the player move with WASD or the Arrow Keys
function keyupHandler(e) {
    if (e.key === "w" || e.key === "ArrowUp") {
        upPressed = false;
    }
    if (e.key === "s" || e.key === "ArrowDown") {
        downPressed = false;
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
    if (e.key === "d" || e.key === "ArrowRight") {
        rightPressed = false;
    }
}

// Detect if the player has been hit

// If so --> stop the music, tell the player they've lost, and prompt them to restart


/** 
 * ICEBOX 
*/

