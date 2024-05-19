//initialization
const foodSound = new Audio("./Assets/food.mp3");
const gameOverSound = new Audio("./Assets/move.mp3");
const moveSound = new Audio("./Assets/gameOver.mp3");
const board = document.getElementById("board");
const scoreBox = document.getElementById("score");

let score = 0;
let inputDir = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let snakeArr = [{ x: 13, y: 9 }];
let lastPaintTime = 0;
const speed = 4;

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 > 1 / speed) {
    lastPaintTime = ctime;
    gameEngine();
  }
}

//functions
function gameEngine() {
  if (isCollapsed()) {
    gameOverSound.play();
    alert("Game over. Press any key to PLAY AGAIN ");
    snakeArr = [{ x: 13, y: 9 }];
    inputDir = { x: 0, y: 0 };
    score = 0;
    scoreBox.innerHTML = `Score : ${score}`;
  }

  //if we have eatten the food than we have to update the snake and create the food;
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    foodGeneration_And_SnakeUpdate();
  }

  //moving the snake
  moveTheSnake();

  //displaying snake and food;
  board.innerHTML = "";

  displaySnake();

  displayFood();
}

function moveTheSnake() {
  const n = snakeArr.length;
  for (let i = n - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
}
function isCollapsed() {
  let n = snakeArr.length;
  //if u bump into yourself
  for (let i = 1; i < n; i++) {
    if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
      return true;
    }
  }
  //if u bump into wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function foodGeneration_And_SnakeUpdate() {
  foodSound.play();
  score++;
  scoreBox.innerHTML = `Score : ${score}`;
  snakeArr.unshift({
    x: snakeArr[0].x + inputDir.x,
    y: snakeArr[0].y + inputDir.y,
  });
  const a = 2;
  const b = 16;
  food = {
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random()),
  };
}

function displayFood() {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

function displaySnake() {
  snakeArr.forEach((e, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
}

//Event handlers
window.addEventListener("keydown", (e) => {
  const action = e.key;
  moveSound.play();
  switch (action) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

window.requestAnimationFrame(main);
