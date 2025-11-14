const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const imageView = document.getElementById('image-view');
const fileInfo = document.getElementById('file-info');

fileInput.addEventListener('change', uploadImage);

function uploadImage(){
    let file = fileInput.files[0];
    let imgLink = URL.createObjectURL(file);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.textContent = '';
    imageView.style.border = 0;

    fileInfo.textContent = `File name: ${file.name}, File size: ${file.size} bytes`;
}

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    uploadImage();
});