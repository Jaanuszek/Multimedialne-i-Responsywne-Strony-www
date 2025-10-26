const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')

let yellow='yellow';
let black='black';

function drawSun() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = 300;
    const centerY = 200;
    
    ctx.strokeStyle = yellow;
    ctx.lineWidth = 3;
    
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const startX = centerX + Math.cos(angle) * 60;
        const startY = centerY + Math.sin(angle) * 60;
        const endX = centerX + Math.cos(angle) * 80;
        const endY = centerY + Math.sin(angle) * 80;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    
    ctx.fillStyle = yellow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fill();
    
    // uzylem tego poradnika
    // https://www.c-sharpcorner.com/UploadFile/219d4d/how-to-create-a-smiley-face-using-javascript/
    ctx.fillStyle = black;
    ctx.beginPath();
    ctx.arc(centerX - 15, centerY - 10, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX + 15, centerY - 10, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = black;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 5, 20, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

drawBtn.addEventListener('click', drawSun);
clearBtn.addEventListener('click', clearCanvas);
