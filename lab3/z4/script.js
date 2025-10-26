const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImageData = null;
let currentImageData = null;

const invertBtn = document.getElementById('invert');
const brightnessBtn = document.getElementById('brightness');
const addColorToAllBtn = document.getElementById('addColorToAll');
const cropBtn = document.getElementById('cropBtn');
const addMaskBtn = document.getElementById('addMask');
const removeMaskBtn = document.getElementById('removeMask');
const resetBtn = document.getElementById('reset');

const img = new Image();
img.src = 'jpg/avatar-1.jpg';
img.onload = function() {
    const maxWidth = 600;
    const maxHeight = 400;
    let width = img.width;
    let height = img.height;
    
    if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(img, 0, 0, width, height);
    
    originalImageData = ctx.getImageData(0, 0, width, height);
    currentImageData = ctx.getImageData(0, 0, width, height);
};

function applyInvert() {
    if (!currentImageData) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        // odwrocenie wartosci pikseli
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    
    ctx.putImageData(imageData, 0, 0);
    currentImageData = imageData;
}

function adjustBrightness() {
    if (!currentImageData) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        // dodanie do wsyzstkich kolorow tej samej stalej wartosci
        data[i] = Math.min(255, Math.max(0, data[i] + 30));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + 30));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + 30));
    }
    
    ctx.putImageData(imageData, 0, 0);
    currentImageData = imageData;
}

function addColorToAll() {
    if (!currentImageData) return;
    
    const maskColor = document.getElementById('maskColor').value;
    ctx.fillStyle = maskColor;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    
    currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function cropCenter() {
    if (!currentImageData) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    const cropWidth = Math.floor(width * 0.5);
    const cropHeight = Math.floor(height * 0.5);
    
    const x = Math.floor((width - cropWidth) / 2);
    const y = Math.floor((height - cropHeight) / 2);
    
    const croppedImageData = ctx.getImageData(x, y, cropWidth, cropHeight);
    
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    
    ctx.putImageData(croppedImageData, 0, 0);
    currentImageData = croppedImageData;
}

function addMask() {
    if (!currentImageData) return;
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.clip();
    
    const maskColor = document.getElementById('maskColor').value;
    ctx.fillStyle = maskColor;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.restore();
    
    currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function removeMask() {
    if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);
        currentImageData = originalImageData;
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function reset() {
    if (originalImageData) {
        canvas.width = originalImageData.width;
        canvas.height = originalImageData.height;
        ctx.putImageData(originalImageData, 0, 0);
        currentImageData = originalImageData;
    }
}

invertBtn.addEventListener('click', applyInvert);
brightnessBtn.addEventListener('click', adjustBrightness);
addColorToAllBtn.addEventListener('click', addColorToAll);
cropBtn.addEventListener('click', cropCenter);
addMaskBtn.addEventListener('click', addMask);
removeMaskBtn.addEventListener('click', removeMask);
resetBtn.addEventListener('click', reset);
