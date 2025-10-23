canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

ctx.fillStyle = "lightblue";

ctx.beginPath();
ctx.save();
ctx.fillStyle = "red";
ctx.moveTo(50, 50);
ctx.rect(50, 50, 50, 75);
ctx.fill();
ctx.stroke();
ctx.restore();

ctx.beginPath();
ctx.save();
ctx.beginPath();
ctx.arc(250, 60, 40, 0, Math.PI * 2);
ctx.fillStyle = "lightblue";
ctx.fill();
ctx.restore();

ctx.globalCompositeOperation = 'destination-out';
ctx.beginPath();
ctx.moveTo(230, 50);
ctx.lineTo(220, 40);
ctx.lineTo(220, 60);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.moveTo(260, 60);
ctx.lineTo(270, 80);
ctx.lineTo(280, 60);
ctx.closePath();
ctx.fill();
ctx.restore();

ctx.globalCompositeOperation = 'source-over';
ctx.beginPath();
ctx.moveTo(360, 30);
ctx.lineTo(420, 30);
ctx.lineTo(440, 90);
ctx.lineTo(340, 90);
ctx.closePath();
ctx.stroke();

// https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
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
    ctx.strokeStyle='gold';
    ctx.stroke();
    ctx.fillStyle='gold';
    ctx.fill();
}

drawStar(550,50,8,30,15);

ctx.beginPath();
ctx.moveTo(550, 50);
ctx.quadraticCurveTo(660, 10, 780, 80);
ctx.lineTo(770, 90);
ctx.quadraticCurveTo(670, 30, 550, 60);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.moveTo(150, 150);
ctx.quadraticCurveTo(100, 150, 100, 187.5);
ctx.quadraticCurveTo(100, 225, 125, 225);
ctx.quadraticCurveTo(125, 245, 105, 250);
ctx.quadraticCurveTo(135, 245, 140, 225);
ctx.quadraticCurveTo(200, 225, 200, 187.5);
ctx.quadraticCurveTo(200, 150, 150, 150);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(350, 150);
ctx.bezierCurveTo(350, 147, 345, 135, 325, 135);
ctx.bezierCurveTo(295, 135, 295, 172.5, 295, 172.5);
ctx.bezierCurveTo(295, 190, 315, 212, 350, 230);
ctx.bezierCurveTo(385, 212, 405, 190, 405, 172.5);
ctx.bezierCurveTo(405, 172.5, 405, 135, 375, 135);
ctx.bezierCurveTo(360, 135, 350, 147, 350, 150);
ctx.fill();

const image = new Image();
image.src = 'jpg/chmurka.png';
image.onload = () => {
    ctx.save();
    ctx.shadowColor = 'white';
    const shadowSize = 3;

    for (let x = -shadowSize; x <= shadowSize; x++) {
        for (let y = -shadowSize; y <= shadowSize; y++) {
        ctx.shadowOffsetX = x;
        ctx.shadowOffsetY = y;
        ctx.drawImage(image, 300, 300, 150, 150);
        }
    }

    ctx.restore();
};
