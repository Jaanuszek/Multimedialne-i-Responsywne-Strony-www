const blocksContainer = document.getElementById('blocksContainer');

let selectedBlock = null;

const blocksNumber = 16;
let availableNumbers = [0, 1 , 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function isAdjacent(i, j, cols = 4){
    if(i < 0 || j < 0) return false;
    if(Math.abs(i-j) === cols)  return true; // above or below
    if(Math.abs(i-j) === 1) return (Math.floor(i/cols) === Math.floor(j/cols)); // left or right
}


function updateDraggables()
{
    const blocks = Array.from(document.querySelectorAll('.block'));
    const emptyIndex = blocks.findIndex(b => b.classList.contains('empty'));
    blocks.forEach((block, idx) => {
        if(block.classList.contains('empty')){
            block.draggable = false;
            block.classList.remove('movable');
        }
        else{
            const movable = isAdjacent(idx, emptyIndex);
            block.draggable = movable;
            if(movable){
                block.classList.add('movable');
            }
            else{
                block.classList.remove('movable');
            }
        }
    });
}

for(let i = 0; i < blocksNumber; i++){
    const block = document.createElement('div');
    block.classList.add('block');
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    let number = availableNumbers[randomIndex];
    if(number === 0){
        block.classList.add('empty');
        number = '';
    }
    availableNumbers.splice(randomIndex, 1);
    block.textContent = number;
    block.id = `block-${number}`;
    blocksContainer.appendChild(block);
}

updateDraggables();

blocksContainer.addEventListener('dragstart', (e) => {
    const target = e.target.closest('.block');
    if(!target) return;
    if(target.classList.contains('empty')) {e.preventDefault(); return;}
    const blocksArr = Array.from(document.querySelectorAll('.block'));;
    const emptyIndex = blocksArr.findIndex(b => b.classList.contains('empty'));
    const targetIndex = blocksArr.indexOf(target);
    if(!isAdjacent(targetIndex, emptyIndex)) {e.preventDefault(); return;}
    selectedBlock = target;
    e.dataTransfer.setData('text/plain', target.textContent);
})

blocksContainer.addEventListener('dragover', (e) => {
    const target = e.target.closest('.block');
    if(!target) return;
    if(!target.classList.contains('empty')) {return;}
    const blocksArr = Array.from(document.querySelectorAll('.block'));;
    const emptyIndex = blocksArr.indexOf(target);
    const srcIndex = selectedBlock ? blocksArr.indexOf(selectedBlock) : -1;
    if (selectedBlock && isAdjacent(srcIndex, emptyIndex)) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
});

blocksContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('.block');
    if(!target || !target.classList.contains('empty')) return;
    if(!selectedBlock) return;
    const blocksArr = Array.from(document.querySelectorAll('.block'));
    const emptyIndex = blocksArr.indexOf(target);
    const srcIndex = blocksArr.indexOf(selectedBlock);
    if(!isAdjacent(srcIndex, emptyIndex)) return;

    target.textContent = selectedBlock.textContent;
    selectedBlock.textContent = '';
    selectedBlock.classList.add('empty');
    selectedBlock.draggable = false;
    target.classList.remove('empty');
    target.draggable = true;
    selectedBlock = null;
    updateDraggables();
});