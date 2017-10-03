'use strict';

const keydown = () => {};

const drawNet = () => {};

const drawBackground = ({ context, width, height }) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

const drawScore = () => {};

const drawBall = (x, y) => {};

const drawPad = (x, y) => {};

const drawLeftPad = () => {};

const drawRightPad = () => {};

const updateCanvasSize = (canvas) => {
  // look up the size the canvas is being displayed
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
};

const game = ({ canvas, context }) => {
  updateCanvasSize(canvas);
  drawBackground({ context, width: canvas.width, height: canvas.height });

};

const main = () => {
  const playGround = document.getElementById('playGround');
  const context = playGround.getContext('2d');
  document.addEventListener('keydown', keydown);
  setInterval(() => game({ canvas: playGround, context }), 1000/15);
};


window.onload = main;
