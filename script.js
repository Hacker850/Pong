const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100;
const paddleWidth = 10;
const ballRadius = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;

function draw() {
  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  //Draw the paddles
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

  //Collision Detection
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX + ballRadius > canvas.width - paddleWidth) {
    if (ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballSpeedX = 5;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
    }
  }

  if (ballX - ballRadius < paddleWidth) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballSpeedX = -5;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
    }
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  //Move player2 paddle
  if (ballY - paddleHeight / 2 > player2Y + paddleHeight / 2) {
    player2Y += 5;
  } else {
    player2Y -= 5;
  }

  //Keep the paddles on the screen
  if (player1Y < 0) {
    player1Y = 0;
  }

  if (player1Y + paddleHeight > canvas.height) {
    player1Y = canvas.height - paddleHeight;
  }

  if (player2Y < 0) {
    player2Y = 0;
  }

  if (player2Y + paddleHeight > canvas.height) {
    player2Y = canvas.height - paddleHeight;
  }
}

setInterval(draw, 10);
