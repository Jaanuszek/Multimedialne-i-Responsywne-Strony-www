const cards = document.querySelectorAll('.card');

let newX = 0, newY = 0;
let startX = 0, startY = 0;
let activeCard = null;

cards.forEach(card => {
    card.addEventListener('mousedown', mousedown);
});


function mousedown(e) {
    activeCard = e.currentTarget;

    const rect = activeCard.getBoundingClientRect();

    if (!activeCard.classList.contains('placeHoldered')) {
        // placeholder zeby divy sie nie rozjezdzaly
        placeholder = document.createElement('div');
        placeholder.classList.add('card');
        placeholder.style.visibility = 'hidden';
        activeCard.parentNode.insertBefore(placeholder, activeCard);

        activeCard.classList.add('placeHoldered');
    }

    activeCard.style.position = 'absolute';
    activeCard.style.left = rect.left + 'px';
    activeCard.style.top = rect.top + 'px';
    activeCard.style.zIndex = 1000;

    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
}

function mousemove(e) {
    if (!activeCard) return;

    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    activeCard.style.top = (activeCard.offsetTop - newY) + "px";
    activeCard.style.left = (activeCard.offsetLeft - newX) + "px";
}

function mouseup() {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);

    if (activeCard) {
        activeCard.style.zIndex = "";
        activeCard = null;
    }
}