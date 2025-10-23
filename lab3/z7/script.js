const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const xCenter = width / 2;
const yCenter = height / 2;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

var isRunning = true;

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, elem) {
        window.setTimeout(callback, 1000 / 60);
    };

function draw(radius, degrees){
    var radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(xCenter, yCenter);
    ctx.arc(xCenter, yCenter, radius, 0, radians);
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'blue';
}

var radius = 1;
var mult = 1;

var cx = xCenter;
const floorY = yCenter + (height / 2);
var cy = floorY - radius;
var vx = -3;

var currentColor = 'blue';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColor() {
    currentColor = getRandomColor();
}

function draw(radius, degrees){
    var radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, 0, radians);
    ctx.lineWidth = 3;
    ctx.fillStyle = currentColor;
    ctx.fill();
}

function animate(){
    if (!isRunning) {
        return;
    }
    ctx.clearRect(0, 0, width, height);

    cx += vx;
    if (cx >= xCenter) {
        mult = -1;
    } else if (cx <= xCenter) {
        mult = 1;
    }
    radius += mult * 1;
    if(radius < 0 ) radius = 1;

    cy = floorY - radius;

    if (cx + radius >= width) {
        cx = width - radius;
        vx = -Math.abs(vx);
        changeColor();
    } else if (cx - radius <= 0) {
        cx = radius;
        vx = Math.abs(vx);
        changeColor();
    }

    draw(radius, 360);
    requestAnimFrame(animate);
}

requestAnimFrame(animate);

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        requestAnimFrame(animate);
    }
});

stopButton.addEventListener('click', () => {
    isRunning = false;
});