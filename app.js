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
    const song = new Audio("audio/workingTitle.mp3");
    song.play();
    fadeBackground('body');
    setTimeout(firstPhase, 8000);
    runGame = setInterval(gameLoop, 1);
}

// Fades the background color slowly to black one quarter note at a time
function fadeBackground(element) {
    let background = document.querySelector(element);
    let colorValue1 = 144;
    let colorValue2 = 208;
    let colorValue3 = 255;

    for (let i = 1; i <= 16; i++) {
        setTimeout(function () {
            colorValue1 = 144 - (i * 9);
            colorValue2 = 208 - (i * 13);
            colorValue3 = 255 - (i * 16);
            background.style.backgroundColor = `rgb(${colorValue1}, ${colorValue2}, ${colorValue3})`;
        }, (i - 1) * 500);
    }
}

// Alternates the background's colors every quarter note
function raveBackground() {
    let background = document.querySelector('body');
    let colors = [
        "#34568B", // Classic Blue
        "#FF6F61", // Living Coral
        "#6B5B95", // Ultra Violet
        "rgb(136, 176, 75)", // Greenery
        "rgb(247, 202, 201)", // Rose Quartz
        "rgb(146, 168, 209)", // Serenity
        "rgb(181, 101, 167)", // Radiand Orchid
        "rgb(0, 155, 119)" // Emerald
    ];
    let currentColor;

    for (let t = 0; t < 8; t++) {
        setTimeout(function () {
            for (let i = 0; i < 8; i++) {
                setTimeout(function () {
                    currentColor = colors[i];
                    console.log(currentColor);
                    background.style.backgroundColor = `${currentColor}`;
                }, i * 500);
            }
        }, t * 4000);
    }
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
    if (hitDetected() === true && 1 === 2) {
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
    arrows(31, 'one');
    setTimeout(flames, 8000, 16);
    setTimeout(rain, 16000, 8);
    setTimeout(secondPhase, 32000);
}

// Start second phase
function secondPhase() {
    console.log("running second phase");
    raveBackground();
    bumpers();
    setTimeout(arrows2, 8000, 20);
    setTimeout(lasers, 16000);
    setTimeout(interludePhase, 32000);
}

// Start interlude phase
function interludePhase() {
    let background = document.querySelector('body');
    background.style.backgroundColor = "black";
    fadeBackground('canvas');
    rain(4);
    setTimeout(finalPhase, 16000);
}

// Start final phase
function finalPhase() {
    let background = document.querySelector('canvas');
    background.style.backgroundColor = "rgb(144,208,255)";
    raveBackground();
    arrows(32, 'final');
    flames(32);
    setTimeout(arrows2, 8000, 16);
    setTimeout(rain, 16000, 8);
    setTimeout(lasers, 16000);
    setTimeout(throwBumper, 42000, 0, board.height, 'blue', board.width - 100, 30);
}

function arrows(duration, phase) {
    let startingWidth;
    for (let j = 0; j < duration; j++) {
        setTimeout(function () {
            for (let i = 1; i <= 4; i++) {
                if (phase === 'final') {
                    setTimeout(fireArrow, (i - 1) * 250, Math.floor(Math.random() * board.width - 1), -99, 'white', 5, 100);
                }
                else if (phase === 'one') {
                    startingWidth = i * 65;
                    if (j % 2 === 0) {
                        setTimeout(fireArrow, (i - 1) * 250, startingWidth, -99, 'white', 5, 100);
                    }
                    else {
                        setTimeout(fireArrow, (i - 1) * 250, board.width - startingWidth, -99, 'white', 5, 100);
                    }
                }
            }
        }, j * 1000)
    }
}

function arrows2(duration) {
    let direction = 'left';
    for (let j = 0; j < duration; j++) {
        setTimeout(function () {
            for (let l = 0; l < 3; l++) {
                setTimeout(function () {
                    console.log(`direction: ${direction}`);
                    if (direction === 'left') {
                        for (let i = 1; i <= 3; i++) {
                            setTimeout(fireArrow, (i - 1) * 125, (i * 50), -99, 'whitesmoke', 5, 100);
                        }
                        direction = 'right';
                    }
                    else if (direction === 'right') {
                        for (let i = 1; i <= 3; i++) {
                            setTimeout(fireArrow, (i - 1) * 125, board.width - (i * 50), -99, 'whitesmoke', 5, 100);
                        }
                        direction = 'left';
                    }
                }, l * 250)
            }
        }, j * 2000)
    }
}

function flames(duration) {
    for (let i = 0; i < duration; i++) {
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

function rain(duration) {
    for (let i = 0; i < duration; i++) {
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

function lasers() {
    for (let i = 0; i < 16; i++) {
        setTimeout(function () {
            if (i % 2 === 0) {
                fireLaser(197, -880, 'orange', 6, 900);
            }
            else {
                fireLaser(647, -880, 'orange', 6, 900);
            }
        }, i * 1000)
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

function fireLaser(x, y, color, width, height) {
    const bumper = new Obstacle(x, y, color, width, height);
    pieces.push(bumper);
    // movePieceDown(bumper, 16);
    setTimeout(movePieceDown, 500, bumper, 32);
}

// Move obstacles
function movePieceUp(piece, rate) {
    // console.log(piece);
    piece.y -= rate;
    // 
    if (piece.y > 0 - piece.height) {
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

