const cardsContainer = document.getElementById('cardsContainer');

let selectedCard = null;

cardsContainer.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.card');
    if(!card) return;
    selectedCard = card;
    card.classList.add('dragging');
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
});

cardsContainer.addEventListener('dragend', (e) => {
    if(selectedCard){
        selectedCard.classList.remove('dragging');
        selectedCard = null;
    }
});

cardsContainer.addEventListener('dragover', (e) => {
    if(!selectedCard) return;
    const target = e.target.closest('.card');
    if(!target || target === selectedCard) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
});


cardsContainer.addEventListener('drop', (e) =>{
    const target = e.target.closest('.card');
    if(!target || target === selectedCard) return;

    const rect = target.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const insertBefore = offsetY < rect.height / 2;

    if(insertBefore){
        cardsContainer.insertBefore(selectedCard, target);
    }
    else{
        cardsContainer.insertBefore(selectedCard, target.nextSibling);
    }

    selectedCard.classList.remove('dragging');
    selectedCard = null;
});