const ToDoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');
const pannelsList = document.querySelectorAll('.panel');
const copyModeCheckbox = document.getElementById('copyMode');
let dragSrcEl = null;

ToDoList.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains('item')) return;
    dragSrcEl = e.target;
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.target.classList.add('dragging');
});

ToDoList.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.list').forEach(l => l.classList.remove('dragover-accept','dragover-deny'));
});

doneList.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains('item')) return;
    dragSrcEl = e.target;
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.target.classList.add('dragging');
});

doneList.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.list').forEach(l => l.classList.remove('dragover-accept','dragover-deny'));
});

pannelsList.forEach(panel => {
    panel.addEventListener('dragenter', (e) => {
        e.preventDefault();
        const list = panel.querySelector('.list');
        const canDrop = (copyModeCheckbox && copyModeCheckbox.checked) || (dragSrcEl && dragSrcEl.parentElement !== list);
        if (canDrop) {
            list.classList.add('dragover-accept');
            list.classList.remove('dragover-deny');
        } else {
            list.classList.add('dragover-deny');
            list.classList.remove('dragover-accept');
        }
    });

    panel.addEventListener('dragover', (e) => {
        e.preventDefault();
        const list = panel.querySelector('.list');
        const canDrop = (copyModeCheckbox && copyModeCheckbox.checked) || (dragSrcEl && dragSrcEl.parentElement !== list);
        e.dataTransfer.dropEffect = canDrop ? (copyModeCheckbox && copyModeCheckbox.checked ? 'copy' : 'move') : 'none';
    });

    panel.addEventListener('dragleave', (e) => {
        const list = panel.querySelector('.list');
        list.classList.remove('dragover-accept','dragover-deny');
    });
});

function createLiItem(text) {
    const newItem = document.createElement('li');
    newItem.className = 'item';
    newItem.draggable = true;
    newItem.innerText = text;

    newItem.addEventListener('dragstart', (e) => {
        dragSrcEl = e.target;
        e.dataTransfer.setData('text/plain', e.target.innerText);
        e.target.classList.add('dragging');
    });
    newItem.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });
    return newItem;
}

pannelsList.forEach(panel => {
    panel.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const list = panel.querySelector('.list');
        if (copyModeCheckbox && copyModeCheckbox.checked) {
            const newItem = createLiItem(data);
            list.appendChild(newItem);
        } else {
            if (dragSrcEl && dragSrcEl.parentElement) {
                list.appendChild(dragSrcEl);
            } else {
                const newItem = document.createElement('li');
                newItem.className = 'item';
                newItem.draggable = true;
                newItem.innerText = data;
                list.appendChild(newItem);
            }
        }
        list.classList.remove('dragover-accept','dragover-deny');
        dragSrcEl = null;
    });
});