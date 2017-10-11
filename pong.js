'use strict';

const framesPerSecond = 30;
const defaultWidth = 800;
const defaultHeight = 600;

let playGround = null;
let context = null;

const keydown = () => {};

const dot = {
  x: 0,
  y: 0,
};

const ball = {
  pos: Object.assign({}, dot),
  vel: {
    x: Math.floor(Math.random() * 5),
    y: Math.floor(Math.random() * 5),
  },
  color: 'red',
  radius: 10,
};

const pad = {
  pos: Object.assign({}, dot),
  vel: Object.assign({}, dot),
  color: 'white',
  size: {
    x: 10,
    y: 50,
  },
  side: null,
};

const playerOne = Object.assign({}, pad, {
  side: 'left',
  pos: {
    x: 0,
    y: Math.floor(Math.random() * defaultHeight),
  },
});

const playerTwo = Object.assign({}, pad, {
  side: 'right',
  pos: {
    x: defaultWidth,
    y: Math.floor(Math.random() * defaultHeight),
  },
});

////////////////////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////////////////////

const middle = (width, height) => ({ x: width / 2, y: height / 2 });

const xPosBySide = (pad) => 'left' === pad.side ? 0 : context.canvas.width;

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

const drawNet = () => {};

const drawBackground = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

const drawScore = () => {};

const drawBall = (ball) => {
  context.beginPath();
  context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI, false);
  context.fillStyle = ball.color;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = ball.color;
  context.stroke();
};

const drawPad = (pad) => {
  context.fillStyle = pad.color;
  context.fillRect(xPosBySide(pad), pad.pos.y, pad.size.x, pad.size.y);
};

const drawLeftPad = () => {};

const drawRightPad = () => {};

const drawEverything = () => {
  drawBackground();
  drawBall(ball);
  drawPad(playerOne);
  drawPad(playerTwo);
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
  document.addEventListener('keydown', keydown);
  setInterval(() => game(), 1000 / framesPerSecond);
};


window.onload = main;
