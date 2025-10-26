const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const restartButton = document.getElementById('restartButton');
const scoreValue = document.getElementById('scoreValue');

const COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

const RADIUS = 30;
let circleArr = [];
let selectedIndex = null;
let currentCols = 0;
let currentRows = 0;
let currentHGap = 0;
let currentVGap = 0;
let isAnimating = false;
let animatingMatchesSet = null;
let animProgress = 0;

function drawCircle(x, y, color){
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawCirclesInGrid(){
    circleArr = [];

    const maxCols = Math.max(1, Math.floor(canvas.width / (2 * RADIUS)));
    const maxRows = Math.max(1, Math.floor(canvas.height / (2 * RADIUS)));
    currentCols = maxCols;
    currentRows = maxRows;

    const hGap = (maxCols === 1) ? 0 : (canvas.width - 2 * RADIUS) / (maxCols - 1);
    const vGap = (maxRows === 1) ? 0 : (canvas.height - 2 * RADIUS) / (maxRows - 1);
    currentHGap = hGap;
    currentVGap = vGap;

    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            const x = RADIUS + j * hGap;
            const y = RADIUS + i * vGap;
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            circleArr.push({ x, y, color });
        }
    }
    redrawAll();
    clearInitialMatches();
}

function clearInitialMatches() {
    let iter = 0;
    const MAX_ITER = 20;
    while (iter < MAX_ITER) {
        const matches = findMatches();
        if (matches.size === 0) break;
        matches.forEach(idx => {
            if (idx >= 0 && idx < circleArr.length) {
                circleArr[idx].color = COLORS[Math.floor(Math.random() * COLORS.length)];
            }
        });
        recomputePositionsFromGrid();
        redrawAll();
        iter++;
    }
}

function recomputePositionsFromGrid() {
    if (currentCols <= 0) return;
    for (let i = 0; i < circleArr.length; i++) {
        const row = Math.floor(i / currentCols);
        const col = i % currentCols;
        circleArr[i].x = RADIUS + col * currentHGap;
        circleArr[i].y = RADIUS + row * currentVGap;
    }
}

function animateSwap(i1, i2, duration = 300, onComplete) {
    if (isAnimating) return;
    // isAnimating to jest globalna flaga blokujaca inne animacje
    isAnimating = true;
    const a = circleArr[i1];
    const b = circleArr[i2];
    const ax0 = a.x, ay0 = a.y;
    const bx0 = b.x, by0 = b.y;
    const start = performance.now();

    // ease-in-out
    function ease(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const e = ease(t);
        a.x = ax0 + (bx0 - ax0) * e;
        a.y = ay0 + (by0 - ay0) * e;
        b.x = bx0 + (ax0 - bx0) * e;
        b.y = by0 + (ay0 - by0) * e;
        redrawAll();
        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            isAnimating = false;
            if (typeof onComplete === 'function') onComplete();
        }
    }

    requestAnimationFrame(step);
}

function findMatches() {
    const matches = new Set();
    const total = circleArr.length;
    if (currentCols <= 0 || currentRows <= 0) return matches;

    // horyzontalne sprawdzenie
    for (let r = 0; r < currentRows; r++) {
        let c = 0;
        while (c < currentCols) {
            const idx = r * currentCols + c;
            if (idx >= total) break;
            const color = circleArr[idx].color;
            let end = c + 1;
            while (end < currentCols) {
                const idx2 = r * currentCols + end;
                if (idx2 >= total) break;
                if (circleArr[idx2].color !== color) break;
                end++;
            }
            const len = end - c;
            if (len >= 3) {
                for (let k = c; k < end; k++) matches.add(r * currentCols + k);
            }
            c = end;
        }
    }

    // wertykalne sprawdzenie
    for (let c = 0; c < currentCols; c++) {
        let r = 0;
        while (r < currentRows) {
            const idx = r * currentCols + c;
            if (idx >= total) break;
            const color = circleArr[idx].color;
            let end = r + 1;
            while (end < currentRows) {
                const idx2 = end * currentCols + c;
                if (idx2 >= total) break;
                if (circleArr[idx2].color !== color) break;
                end++;
            }
            const len = end - r;
            if (len >= 3) {
                for (let k = r; k < end; k++) matches.add(k * currentCols + c);
            }
            r = end;
        }
    }

    return matches;
}

async function animateMatches(matches, duration = 400) {
    if (!matches || matches.size === 0) return;
    animatingMatchesSet = new Set(matches);
    animProgress = 0;
    isAnimating = true;
    const start = performance.now();
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    return new Promise(resolve => {
        function step(now) {
            const t = Math.min(1, (now - start) / duration);
            animProgress = easeOut(t);
            redrawAll();
            if (t < 1) requestAnimationFrame(step);
            else {
                animProgress = 1;
                redrawAll();
                animatingMatchesSet = null;
                animProgress = 0;
                resolve();
            }
        }
        requestAnimationFrame(step);
    });
}

async function handleMatches() {
    while (true) {
        const matches = findMatches();
        if (matches.size === 0) break;
        await animateMatches(matches, 400);
        const prev = parseInt(scoreValue.textContent || '0', 10) || 0;
        scoreValue.textContent = String(prev + matches.size);
        matches.forEach(idx => {
            if (idx >= 0 && idx < circleArr.length) {
                circleArr[idx].color = COLORS[Math.floor(Math.random() * COLORS.length)];
            }
        });
        recomputePositionsFromGrid();
        redrawAll();
    }
    isAnimating = false;
}

function redrawAll(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circleArr.forEach((c, idx) => {
        if (animatingMatchesSet && animatingMatchesSet.has(idx)) {
            const p = animProgress; // 0..1
            const scale = 1 + 0.6 * p;
            const alpha = 1 - p;
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(0, 0, RADIUS * scale, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        } else {
            drawCircle(c.x, c.y, c.color);
        }
        if (selectedIndex === idx) {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#47FF0F';
            ctx.arc(c.x, c.y, RADIUS + 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
    });
}

function circleClicked(x, y, circleX, circleY){
    const dx = x - circleX;
    const dy = y - circleY;
    return dx * dx + dy * dy <= RADIUS * RADIUS;
}

function checkIfNeihbour(x, y, circleX, circleY) {
    const dx = x - circleX;
    const dy = y - circleY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= RADIUS * 2;
}

function indicesAreNeighbours(i1, i2) {
    if (currentCols <= 0) return false;
    const r1 = Math.floor(i1 / currentCols);
    const c1 = i1 % currentCols;
    const r2 = Math.floor(i2 / currentCols);
    const c2 = i2 % currentCols;
    const dr = Math.abs(r1 - r2);
    const dc = Math.abs(c1 - c2);
    // drugi element moze byc maksymalnie o 1 wiersz i 1 kolumne oddalony
    // czyli moze byc na lewo prawo, gora dol, lub na skos
    // dr+dc >0 , bo gdyby bylo == 0 to by byly te same elementy
    return (dr <= 1 && dc <= 1) && (dr + dc > 0);
}

drawCirclesInGrid();

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (isAnimating) return;
    let clickedIndex = null;
    for (let i = 0; i < circleArr.length; i++) {
        const c = circleArr[i];
        if (circleClicked(x, y, c.x, c.y)) {
            clickedIndex = i;
            break;
        }
    }

    if (clickedIndex === null) {
        selectedIndex = null;
        redrawAll();
        return;
    }

    if (selectedIndex === null) {
        selectedIndex = clickedIndex;
        redrawAll();
        return;
    }

    if (selectedIndex === clickedIndex) {
        selectedIndex = null;
        redrawAll();
        return;
    }

    const a = circleArr[selectedIndex];
    const b = circleArr[clickedIndex];
    if (indicesAreNeighbours(selectedIndex, clickedIndex)) {
        const i1 = selectedIndex;
        const i2 = clickedIndex;
        selectedIndex = null;
        animateSwap(i1, i2, 300, () => {
            const tmp = circleArr[i1];
            circleArr[i1] = circleArr[i2];
            circleArr[i2] = tmp;
            recomputePositionsFromGrid();
            handleMatches();
            redrawAll();
        });
        return;
    }

    selectedIndex = clickedIndex;
    redrawAll();
    return;

});

restartButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circleArr = [];
    selectedIndex = null;
    drawCirclesInGrid();
    scoreValue.textContent = '0';
});
