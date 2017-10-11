'use strict';

const framesPerSecond = 30;
const defaultWidth = 800;
const defaultHeight = 600;
const defaultBallRadius = 10;

let playGround = null;
let context = null;

const keydown = () => {};

const dot = {
  x: 0,
  y: 0,
};

const ball = {
  pos: Object.assign({}, dot),
  vel: Object.assign({}, dot),
};

const pad = {
  pos: Object.assign({}, dot),
  vel: Object.assign({}, dot),
  size: Object.assign({}, dot),
};

const playerOne = Object.assign({}, pad);
const playerTwo = Object.assign({}, pad);

////////////////////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////////////////////

const middle = (width, height) => ({ x: width / 2, y: height / 2 });

////////////////////////////////////////////////////////////////////////////////
// Initialization
////////////////////////////////////////////////////////////////////////////////

const initPlayerOne = () => {
  playerOne.pos.x = 0;
  playerOne.pos.y = Math.floor(Math.random() * playGround.height);
  playerOne.vel.x = 0;
  playerOne.vel.y = 0;
  playerOne.color = 'red';
  playerOne.size = {
    x: 10,
    y: 100,
  };
  playerOne.side = 'left';
};

const initPlayerTwo = () => {
  playerTwo.pos.x = playGround.width - playerTwo.size.x;
  playerTwo.pos.y = Math.floor(Math.random() * playGround.height);
  playerTwo.vel.x = 0;
  playerTwo.vel.y = 0;
  playerTwo.color = 'blue';
  playerTwo.size = {
    x: 10,
    y: 100,
  };
  playerTwo.side = 'right';
};

const initBall = () => {
  ball.pos.x = Math.floor(Math.random() * (playGround.width / 2));
  ball.pos.y = Math.floor(Math.random() * (playGround.height / 2));
  ball.vel.x = Math.floor(Math.random() * 10) + 3;
  ball.vel.y = Math.floor(Math.random() * 10) + 3;
  ball.color = 'yellow';
  ball.radius = defaultBallRadius;
};

const initGame = () => {
  initBall();
  initPlayerOne();
  initPlayerTwo();
};

////////////////////////////////////////////////////////////////////////////////
// Movement functions
////////////////////////////////////////////////////////////////////////////////

const moveCharacter = (c) => {
  c.pos.x += c.vel.x;
  c.pos.y += c.vel.y;
};

const moveEverything = () => {
  moveCharacter(ball);
  moveCharacter(playerOne);
  moveCharacter(playerTwo);
};

////////////////////////////////////////////////////////////////////////////////
// Draw functions
////////////////////////////////////////////////////////////////////////////////

const drawBackground = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

const drawNet = () => {};

const drawScore = () => {};

const drawBall = () => {
  context.beginPath();
  context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI, false);
  context.fillStyle = ball.color;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = ball.color;
  context.stroke();
};

const drawPlayerOne = () => {
  context.fillStyle = playerOne.color;
  context.fillRect(0, playerOne.pos.y, playerOne.size.x, playerOne.size.y);
};

const drawPlayerTwo = () => {
  context.fillStyle = playerTwo.color;
  context.fillRect(playGround.width - playerTwo.size.x, playerTwo.pos.y, playerTwo.size.x, playerTwo.size.y);
};

const drawEverything = () => {
  drawBackground();
  drawBall();
  drawPlayerOne();
  drawPlayerTwo();
};

const updateCanvasSize = () => {
  // look up the size the canvas is being displayed
  const width = Math.min(document.body.clientWidth, window.innerWidth || defaultWidth);
  const height = Math.min(document.body.clientHeight, window.innerHeight || defaultHeight);

  // If it's resolution does not match change it
  if (playGround.width !== width || playGround.height !== height) {
    playGround.width = width;
    playGround.height = height;
    return true;
  }

  return false;
};


////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

const game = () => {
  updateCanvasSize();
  moveEverything();
  drawEverything();
};

const main = () => {
  playGround = document.getElementById('playGround');
  context = playGround.getContext('2d');
  initGame();
  document.addEventListener('keydown', keydown);
  setInterval(() => game(), 1000 / framesPerSecond);
};


window.onload = main;
