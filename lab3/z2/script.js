const shapesCanvas = document.getElementById('shapes');
const shapesCtx = shapesCanvas.getContext('2d');
const mainCanvas = document.getElementById('main');
const mainCtx = mainCanvas.getContext('2d');

const fillColorInput = document.getElementById('fillColor');
const strokeColorInput = document.getElementById('strokeColor');

let selectedShape = 0;

function drawTriangle(ctx, x, y, size = 25) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawHouse(ctx, x, y, size = 25) {
    ctx.fillRect(x - size, y - size * 0.4, size * 2, size * 1.6);
    ctx.strokeRect(x - size, y - size * 0.4, size * 2, size * 1.6);
    
    ctx.beginPath();
    ctx.moveTo(x, y - size * 1.4);
    ctx.lineTo(x - size * 1.4, y - size * 0.4);
    ctx.lineTo(x + size * 1.4, y - size * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    const originalFillStyle = ctx.fillStyle;
    ctx.fillStyle = 'brown';
    ctx.fillRect(x - size * 0.3, y + size * 0.2, size * 0.6, size);
    ctx.strokeRect(x - size * 0.3, y + size * 0.2, size * 0.6, size);
    ctx.fillStyle = originalFillStyle;
}

function drawStickFigure(ctx, x, y, size = 10) {
    ctx.beginPath();
    ctx.arc(x, y - size * 2.5, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y - size * 1.5);
    ctx.lineTo(x, y + size * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x - size * 1.5, y - size * 0.5);
    ctx.lineTo(x + size * 1.5, y - size * 0.5);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y + size * 2);
    ctx.lineTo(x - size, y + size * 3.5);
    ctx.moveTo(x, y + size * 2);
    ctx.lineTo(x + size, y + size * 3.5);
    ctx.stroke();
}

function drawDog(ctx, x, y, size = 20) {
    ctx.fillRect(x - size, y - size * 0.5, size * 2, size);
    ctx.strokeRect(x - size, y - size * 0.5, size * 2, size);
    
    ctx.beginPath();
    ctx.arc(x - size * 1.25, y, size * 0.4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    const legWidth = size * 0.2;
    const legHeight = size * 0.5;
    ctx.fillRect(x - size * 0.75, y + size * 0.5, legWidth, legHeight);
    ctx.fillRect(x - size * 0.25, y + size * 0.5, legWidth, legHeight);
    ctx.fillRect(x + size * 0.25, y + size * 0.5, legWidth, legHeight);
    ctx.fillRect(x + size * 0.75, y + size * 0.5, legWidth, legHeight);
    ctx.strokeRect(x - size * 0.75, y + size * 0.5, legWidth, legHeight);
    ctx.strokeRect(x - size * 0.25, y + size * 0.5, legWidth, legHeight);
    ctx.strokeRect(x + size * 0.25, y + size * 0.5, legWidth, legHeight);
    ctx.strokeRect(x + size * 0.75, y + size * 0.5, legWidth, legHeight);
    
    ctx.beginPath();
    ctx.moveTo(x + size, y);
    ctx.quadraticCurveTo(x + size * 1.75, y - size * 0.5, x + size * 1.5, y + size * 0.25);
    ctx.stroke();
}

function drawShapes() {
    shapesCtx.clearRect(0, 0, shapesCanvas.width, shapesCanvas.height);

    const strokeColor = strokeColorInput.value;
    const fillColor = fillColorInput.value;

    shapesCtx.strokeStyle = strokeColor;
    shapesCtx.lineWidth = 2;
    
    shapesCtx.fillStyle = selectedShape === 0 ? fillColor : '#ccc';
    drawTriangle(shapesCtx, 100, 85, 35);
    
    shapesCtx.fillStyle = selectedShape === 1 ? fillColor : '#ccc';
    drawHouse(shapesCtx, 100, 240, 40);
    
    shapesCtx.fillStyle = selectedShape === 2 ? fillColor : '#ccc';
    drawStickFigure(shapesCtx, 100, 390, 20);
    
    shapesCtx.fillStyle = selectedShape === 3 ? fillColor : '#ccc';
    drawDog(shapesCtx, 100, 540, 40);
}

function drawSelectedShape(x, y) {
    const strokeColor = strokeColorInput.value;
    const fillColor = fillColorInput.value;
    
    mainCtx.strokeStyle = strokeColor;
    mainCtx.fillStyle = fillColor;
    mainCtx.lineWidth = 2;
    
    switch(selectedShape) {
        case 0:
            drawTriangle(mainCtx, x, y);
            break;
        case 1:
            drawHouse(mainCtx, x, y);
            break;
        case 2:
            drawStickFigure(mainCtx, x, y);
            break;
        case 3:
            drawDog(mainCtx, x, y);
            break;
    }
}

shapesCanvas.addEventListener('click', function(e) {
    const rect = shapesCanvas.getBoundingClientRect();
    const y = e.clientY - rect.top;

    if (y < 150) selectedShape = 0;
    else if (y < 300) selectedShape = 1;
    else if (y < 450) selectedShape = 2;
    else selectedShape = 3;

    drawShapes();
});

strokeColorInput.addEventListener('input', drawShapes);
fillColorInput.addEventListener('input', drawShapes);

mainCanvas.addEventListener('dblclick', function(e) {
    const rect = mainCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    drawSelectedShape(x, y);
});

drawShapes();
