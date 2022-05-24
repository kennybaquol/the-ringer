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
    // secondPhase();
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
        player.y > 0 ? player.y -= 2 : null;
    }
    if (downPressed === true) {
        player.y < (board.height - player.height) ? player.y += 2 : null;
    }
    if (leftPressed === true) {
        player.x > 0 ? player.x -= 2 : null;
    }
    if (rightPressed === true) {
        player.x < (board.width - player.width) ? player.x += 2 : null;
    }
}

/**
 * COLLISION DETECTION
*/

function hitDetected() {
    let isHitDetected = false;

    isHitDetected = pieces.some(function (piece) {
        return (piece !== pieces[0]) &&
            (player.x + player.width > piece.x) &&
            (player.x < piece.x + piece.width) &&
            (player.y + player.height > piece.y) &&
            (player.y < piece.y + piece.height);
    })
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
    arrows();
    setTimeout(flames, 8000);
    setTimeout(rain, 16000);
    setTimeout(secondPhase, 32000);
    // TEST ARROW
    // const arrow = new Obstacle(100, 100, 'white', 5, 100);
    // pieces.push(arrow);
}

function secondPhase() {
    console.log("running second phase");
    bumpers();
    setTimeout(arrows2, 8000);
    // TEST ARROW
    // const arrow = new Obstacle(100, 100, 'white', 5, 100);
    // pieces.push(arrow);
}

function arrows() {
    for (let j = 0; j < 30; j++) {
        setTimeout(function () {
            for (let i = 1; i <= 4; i++) {
                if (j % 2 === 0) {
                    setTimeout(fireArrow, (i - 1) * 250, (i * 40), -99, 'white', 5, 100);
                }
                else {
                    setTimeout(fireArrow, (i - 1) * 250, board.width - (i * 40), -99, 'white', 5, 100);
                }
            }
        }, j * 1000)
    }
}

function arrows2() {
    let direction = 'left';
    for (let j = 0; j < 28; j++) {
        setTimeout(function () {
            for (let l = 0; l < 3; l++) {
                setTimeout(function () {
                    console.log(`direction: ${direction}`);
                    if (direction === 'left') {
                        for (let i = 1; i <= 3; i++) {
                            setTimeout(fireArrow, (i - 1) * 125, (i * 50), -99, 'white', 5, 100);
                        }
                        direction = 'right';
                    }
                    else if (direction === 'right') {
                        for (let i = 1; i <= 3; i++) {
                            setTimeout(fireArrow, (i - 1) * 125, board.width - (i * 50), -99, 'white', 5, 100);
                        }
                        direction = 'left';
                    }
                }, l * 250)
            }
        }, j * 2000)
    }
}

function flames() {
    for (let i = 0; i < 22; i++) {
        setTimeout(function () {
            if (i % 2 === 0) {
                launchFlame(-199, 125, 'red', 200, 30);
            }
            else {
                launchFlame(-199, 575, 'red', 200, 30);
            }
        }, i * 1000)
    }
}

function rain() {
    for (let i = 0; i < 8; i++) {
        setTimeout(function () {
            for (let j = 0; j < 8; j++) {
                setTimeout(commenceRain, j * 125, Math.floor(Math.random() * 848) + 1, -4, 'purple', 5, 5);
            }
        }, i * 2000)
    }
}

function bumpers() {
    for (let i = 0; i < 64; i++) {
        setTimeout(function () {
            if (i % 2 === 0) {
                throwBumper(0, board.height, 'blue', board.width / 2, 30);
            }
            else {
                throwBumper(board.width / 2, board.height, 'blue', board.width / 2, 30);
            }
        }, i * 500)
    }
}

function fireArrow(x, y, color, width, height) {
    const arrow = new Obstacle(x, y, color, width, height);
    pieces.push(arrow);
    movePieceDown(arrow, 8);
}

function launchFlame(x, y, color, width, height) {
    const flame = new Obstacle(x, y, color, width, height);
    pieces.push(flame);
    movePieceRight(flame, 8);
}

function commenceRain(x, y, color, width, height) {
    const rain = new Obstacle(x, y, color, width, height);
    pieces.push(rain);
    movePieceDown(rain, 4);
}

function throwBumper(x, y, color, width, height) {
    const bumper = new Obstacle(x, y, color, width, height);
    pieces.push(bumper);
    movePieceUp(bumper, 8);
}

// Move obstacles
function movePieceUp(piece, rate) {
    // console.log(piece);
    piece.y -= rate;
    // 
    if (piece.y > 0) {
        setTimeout(movePieceUp, 11, piece, rate);
    }
    // Otherwise, stop moving it, and remove it from the pieces array
    else {
        pieces.splice(pieces.indexOf(piece), 1);
        // console.log(pieces);
    }
}

function movePieceDown(piece, rate) {
    // console.log(piece);
    piece.y += rate;
    // If the piece is still on screen, keep moving it
    if (piece.y < board.height) {
        setTimeout(movePieceDown, 11, piece, rate);
    }
    // Otherwise, stop moving it, and remove it from the pieces array
    else {
        pieces.splice(pieces.indexOf(piece), 1);
        // console.log(pieces);
    }
}

function movePieceLeft(piece, rate) {
    // console.log(piece);
    piece.x -= rate;
    // If the piece is still on screen, keep moving it
    if (piece.x > 0) {
        setTimeout(movePieceLeft, 11, piece, rate);
    }
    // Otherwise, stop moving it, and remove it from the pieces array
    else {
        pieces.splice(pieces.indexOf(piece), 1);
        // console.log(pieces);
    }
}

function movePieceRight(piece, rate) {
    // console.log(piece);
    piece.x += rate;
    // If the piece is still on screen, keep moving it
    if (piece.x < board.width) {
        setTimeout(movePieceRight, 11, piece, rate);
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

// If so --> stop the music, tell the player they've lost, and prompt them to restart


/** 
 * ICEBOX 
*/

