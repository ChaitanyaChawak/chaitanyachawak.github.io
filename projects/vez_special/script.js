const board_border_color = 'black';
const board_border_width = 3;
const board_background = '#339966';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
  {x: 200, y: 200},
  {x: 185, y: 200},
  {x: 170, y: 200},
  {x: 155, y: 200},
  {x: 140, y: 200}
]

let score = 0;
// True if switch direction
let changing_direction = false;
let food_x;
let food_y;
// Horizontal velocity
let dx = 12;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();

gen_food();

document.addEventListener("keydown", change_direction);

// main function called repeatedly to keep the game running
function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    // Repeat
    main();
  }, 100)
}

// draw a border around the canvas
function clear_board() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border_color;
  //  Select the width the border of the canvas
  snakeboard_ctx.lineWidth = board_border_width;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
  head_img()
}

function drawFood() {

	this.image = new Image();
	this.image.src = 'assets/banana.png'  	
  snakeboard_ctx.drawImage(this.image, food_x, food_y, 60, 60);

}

// Draw one snake part
function drawSnakePart(snakePart) {

  // Set the colour of the snake part
  snakeboard_ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  snakeboard_ctx.strokestyle = snake_border;
  // Set the border width of the snake part
  snakeboard_ctx.lineWidth = 1;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 30, 30);
  // Draw a border around the snake part
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 30, 30);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x - 15 < 0;
  const hitRightWall = snake[0].x + 25 > snakeboard.width - 20;
  const hitToptWall = snake[0].y - 15 < 0;
  const hitBottomWall = snake[0].y + 25 > snakeboard.height - 20;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  // Generate a random number the food x-coordinate
  food_x = random_food(50, snakeboard.width - 50);
  food_x_arr = [];
	for (var i = food_x-50; i <= food_x+50; i++) {
	food_x_arr.push(i);
	}
  // Generate a random number for the food y-coordinate
  food_y = random_food(50, snakeboard.height - 50);
  food_y_arr = [];
	for (var i = food_y-50; i <= food_y+50; i++) {
	food_y_arr.push(i);
	}
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = food_x_arr.includes(part.x) && food_y_arr.includes(part.y);
    if (has_eaten) gen_food();
  });
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -15;
  const goingDown = dy === 15;
  const goingRight = dx === 15;
  const goingLeft = dx === -15;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -15;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -15;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 15;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 15;
  }
  
  if (keyPressed === LEFT_KEY && goingLeft) {
    dx = -30;
    dy = 0;
  }
  if (keyPressed === UP_KEY && goingUp) {
    dx = 0;
    dy = -30;
  }
  if (keyPressed === RIGHT_KEY && goingRight) {
    dx = 30;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && goingDown) {
    dx = 0;
    dy = 30;
  }
}

function move_snake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_food = food_x_arr.includes(snake[0].x) && food_y_arr.includes(snake[0].y);;
  
  if (has_eaten_food) {
    // Increase score
    score += 1;
    
    const prompts = ["Wisdom Drop: The Vez snake gets longer everytime you eat a banana", "Even my grandma can do better ~Vez", "Pffft. Noob banana eater", "Accha score banana", "Respect the banana", "Appeal to the banana", "Here's a fun fact - Banana", "You're nuts! -No sir, I'm bananas"];
    
    var prompt = prompts[Math.floor(Math.random()*prompts.length)];
    // Display score on screen
  
    if (score%5 == 0) {
    document.getElementById('score').innerHTML=prompt;
  
    } else {
		document.getElementById('score').innerHTML=score;
    }
    
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

function head_img() {
	this.image = new Image();
	this.image.src = 'assets/vez1.jpeg'  	
  snakeboard_ctx.drawImage(this.image, snake[0].x-12, snake[0].y-12, 50, 50);
}

