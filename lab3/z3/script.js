const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const img = new Image();
img.src = 'jpg/avatar-1.jpg';

ctx.save();
ctx.rect(50, 50, 150, 75);
ctx.fill();
ctx.restore();

for(let i=0; i<12; i++)
{
    ctx.save();
    ctx.translate(500, 75);
    ctx.rotate((i*30 * Math.PI) / 180);
    ctx.scale(0.5, 0.25);
    ctx.fillStyle = 'red';
    ctx.fillRect(20, -5, 60, 10);
    ctx.restore();
}

ctx.save();
ctx.translate(400, 50);
ctx.rotate((90 * Math.PI) / 180);
ctx.rect(0, 0, 150, 75);
ctx.fill();
ctx.restore();

ctx.save();
ctx.translate(650, 50);
ctx.transform(1.5, 0.5, 0.3, 2, 0, 0);
ctx.rect(0, 0, 150, 75);
ctx.fill();
ctx.restore();

img.onload = () => {
  ctx.save();
  ctx.drawImage(img, 50, 300, 150, 150);
  ctx.restore();

  ctx.save();
  ctx.translate(600, 300);
  ctx.scale(-1, 0.5);
  ctx.drawImage(img, 0, 0, 150, 150);
  ctx.restore();

  ctx.save();
  ctx.translate(400, 500);
  ctx.rotate((180 * Math.PI) / 180);
  ctx.drawImage(img, 0, 0, 150, 150);
  ctx.restore();

  ctx.save();
  ctx.translate(650, 300);
  ctx.transform(1.2, 0.3, 0.2, 1.8, 0, 0);
  ctx.drawImage(img, 0, 0, 150, 150);
  ctx.restore();
};