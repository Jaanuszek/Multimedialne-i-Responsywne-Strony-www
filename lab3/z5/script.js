const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;

const redControl = document.getElementById('control1');
const greenControl = document.getElementById('control2');
const blueControl = document.getElementById('control3');
const pinkControl = document.getElementById('control4');

const ColorsControl = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    PINK: 'pink'
}

var formValues = {
    [ColorsControl.RED]: 0,
    [ColorsControl.GREEN]: 0,
    [ColorsControl.BLUE]: 0,
    [ColorsControl.PINK]: 0
};

function drawBlankCircle(){
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, 100, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
drawBlankCircle();

function updateHistogram(){
    const total = Object.values(formValues).reduce((sum, val) => sum + parseInt(val), 0);
    let currAngle = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!total) {
        drawBlankCircle();
        return;
    }
    for(const [colorControl, value] of Object.entries(formValues)){
        const colorAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(xCenter, yCenter);
        ctx.arc(xCenter, yCenter, 100, currAngle, currAngle + colorAngle);
        currAngle += colorAngle;
        ctx.closePath();
        ctx.fillStyle = colorControl;
        ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(xCenter, yCenter, 100, 0, Math.PI * 2, false);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

redControl.addEventListener('input', () => {
    formValues[ColorsControl.RED] = redControl.value;
    updateHistogram();
});

greenControl.addEventListener('input', () => {
    formValues[ColorsControl.GREEN] = greenControl.value;
    updateHistogram();
});

blueControl.addEventListener('input', () => {
    formValues[ColorsControl.BLUE] = blueControl.value;
    updateHistogram();
});

pinkControl.addEventListener('input', () => {
    formValues[ColorsControl.PINK] = pinkControl.value;
    updateHistogram();
});