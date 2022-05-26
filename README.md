# The Ringer
The Ringer is a single-page bullet hell game where the player must avoid an onslaught of obstacles being thrown at them in sync with the background music.

## How To Play
The player begins on a static background. When they hit the start button, the mouse disappears, the background music starts, and they gain the ability to move around using either WASD or the arrow keys. Beware! Obstacles will now be thrown at the player at any increasing pace. Avoid the obstacles with WASD or the arrow keys until the end of the song to win!

## Technical Requirements
```
- [X] Display a game in the browser
- [X] Switch turns between two players, or have the user play the computer (AI or obstacles)
- [X] Design logic for winning & visually display which player won
- [X] Include separate HTML / CSS / JavaScript files	
- [X] Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles	
- [X] Use Javascript for DOM manipulation 	
- [X] Deploy your game online, where the rest of the world can access it
- [X] Use semantic markup for HTML and CSS (adhere to best practices)	
- [X] A working game, built by me, hosted somewhere on the internet	
- [X] A git repository hosted on Github, with a link to your hosted game, and frequent commits dating back to the very beginning of the project	
- [X] A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc
```

## Technologies Used
HTML5, CSS, and Vanilla JavaScript (logic, DOM Maniuplation, & Canvas). No external libraries used in the making of this game.

## Approach Taken
This game's code revolves around functions creating objects at precise intervals that align with the music that plays in the background. Once the game starts, the canvas (along with the player and all obstacles) renders and checks for collisions every millisecond. If the player hits any obstacle at any time, the game is over...but if they manage to make it to the end, a victory message is displayed alongside a rave of 8 of the world's favorite CSS colors from 2012 to 2020. Hope you enjoy!

## Installation
No installation required if you visit the hosted website: 
*ENTER URL HERE*

## Possible Future Features
```
- [] Add "Health" or "HP" mechanic so the game doesn't end in 1 hit
- [] Split the game into "Normal" and "Hard" modes
```

## Wireframe
![wireframe](https://github.com/kennybaquol/working-title/blob/3e4c8e7e8c4cb951b2aeb8c778a837163533fbc2/imgs/project-1-wireframe.jpg)