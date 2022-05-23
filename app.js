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
        console.log(`ran render`);
    }
}

// Create and render the player, then run the game
(function () {
    player = new Player();
    player.render();
    // const runGame = setInterval(gameLoop, 100);
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

// Create and render the player
function startGame() {
    player = new Player();
    console.log(player);
    player.render();
    prompt = document.getElementById('prompt');
    prompt.style.display = "none";
    isRunning = true;
}

// After the game starts, run movementHandler when a key is pressed

/**
 * KEYBOARD INTERACTION LOGIC
*/

// Movement handler that lets the player move with WASD or the Arrow Keys


/**
 * GAME PROCESSES
*/


/**
 * COLLISION DETECTION
*/

// Detect if the player has been hit

// If so --> stop the music, tell the player they've lost, and prompt them to restart


/** 
 * ICEBOX 
*/

