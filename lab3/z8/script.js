const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const starCountControl = document.getElementById('starCount');
const speedControl = document.getElementById('speedControl');

var starCount = parseInt(starCountControl.value);
var starSpeed = parseInt(speedControl.value);

const outerRadius = 15;
const innerRadius = 7;

let starsArray = [];

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, elem) {
        window.setTimeout(callback, 1000 / 60);
    };


function drawStar(cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    ctx.beginPath();
    ctx.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
    x=cx+Math.cos(rot)*outerRadius;
    y=cy+Math.sin(rot)*outerRadius;
    ctx.lineTo(x,y)
    rot+=step

    x=cx+Math.cos(rot)*innerRadius;
    y=cy+Math.sin(rot)*innerRadius;
    ctx.lineTo(x,y)
    rot+=step
    }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='brown';
    ctx.stroke();
    ctx.fillStyle='gold';
    ctx.fill();
}

function renderStar() {
    const margin = outerRadius + 3;
    let x = margin + Math.random() * (canvas.width - margin * 2);
    let y = margin + Math.random() * (canvas.height - margin * 2);
    let vx = Math.random() < 0.5 ? -1 : 1;
    let vy = Math.random() < 0.5 ? -1 : 1;
    starsArray.push({ x, y, vx, vy });
    drawStar(x, y, 5, outerRadius, innerRadius);
}

function updateArray(){
    if (starsArray.length > starCount) {
        starsArray.splice(0, starsArray.length - starCount);
    }
}

function updateStarPos(star){
    if (star.x <= outerRadius || star.x >= canvas.width - outerRadius) {
        star.vx *= -1;
    }
    if (star.y <= outerRadius || star.y >= canvas.height - outerRadius) {
        star.vy *= -1;
    }
    star.x += star.vx * starSpeed;
    star.y += star.vy * starSpeed;
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starsArray.forEach(star => {
        console.log(star);
        updateStarPos(star);
        drawStar(star.x, star.y, 5, outerRadius, innerRadius);
    });
    requestAnimFrame(animate);
}

requestAnimFrame(animate);

starCountControl.addEventListener('input', (e) => {
    starCount = parseInt(e.target.value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starsArray = [];
    for(let i = 0; i < starCount; i++) {
        renderStar();
    }
});

speedControl.addEventListener('input', (e) => {
    starSpeed = parseInt(e.target.value);
});