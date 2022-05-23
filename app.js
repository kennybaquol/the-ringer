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

// Variable to tell if the game is live
let isRunning = false;

// Array that holds all current game pieces
let pieces = [];

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

// Create and render the player, then run the game
(function () {
    player = new Player();
    player.render();
    pieces.push(player);
})()

/** 
 * EVENT LISTENERS
*/

// window.addEventListener("DOMContentLoaded", function (e) {

// })

// When the user presses Enter, create and render the player then start the game
window.addEventListener('keydown', function (e) {
    console.log(`the ${e.key} key was pressed`);

    if (!isRunning) {
        switch (e.key) {
            case "Enter":
                startGame();
                break;
        }
    }
})

// Run the game
function startGame() {
    // player = new Player();
    // console.log(player);
    // player.render();
    prompt = document.getElementById('prompt');
    prompt.style.display = "none";
    isRunning = true;
    setTimeout(firstLaser, 1000);
    const runGame = setInterval(gameLoop, 100);
}

// After the game starts, run movementHandler when a key is pressed
window.addEventListener('keydown', movementHandler);

/**
 * GAME PROCESSES
*/

// Begin game loop/constantly clear and re-render the player
function gameLoop() {
    ctx.clearRect(0, 0, board.width, board.height);
    renderAll();
}

// Spawn first laser (obstacle)
function firstLaser() {
    console.log("ran first laser");
    const arrow = new Obstacle(50, 5, 'white', 5, 100);
    // arrow.render();
    pieces.push(arrow);
    animatePiece(arrow);
}


function movePiece(piece) {
    piece.y += 10;
    console.log(piece);
}

// Animate arrow
function animatePiece(piece) {
    console.log(`running animatePiece`);
    setInterval(movePiece, 100, piece);
}

/**
 * COLLISION DETECTION
*/



/**
 * KEYBOARD INTERACTION LOGIC
*/

// Movement handler that lets the player move with WASD or the Arrow Keys
function movementHandler(e) {
    switch (e.key) {
        case "w":
            player.y > 0 ? player.y -= 10 : null;
            break;
        case "s":
            player.y < (board.height - player.height) ? player.y += 10 : null;
            break;
        case "a":
            player.x > 0 ? player.x -= 10 : null;
            break;
        case "d":
            player.x < (board.width - player.width) ? player.x += 10 : null;
            break;
        case "ArrowUp":
            player.y > 0 ? player.y -= 10 : null;
            break;
        case "ArrowDown":
            player.y < (board.height - player.height) ? player.y += 10 : null;
            break;
        case "ArrowLeft":
            player.x > 0 ? player.x -= 10 : null;
            break;
        case "ArrowRight":
            player.x < (board.width - player.width) ? player.x += 10 : null;
            break;
    }
    console.log(player);
}

// Detect if the player has been hit

// If so --> stop the music, tell the player they've lost, and prompt them to restart


/** 
 * ICEBOX 
*/

