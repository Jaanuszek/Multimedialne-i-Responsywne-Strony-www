const apiKey=`XrhHrc4ls5bgXnYADKEWKXjcdSEoBzat2dbVgbS7QIY`;
// const apiURL=`https://api.unsplash.com/search/photos?query='+input.value+'&per_page=30&client_id=${apiKey}`;

const input = document.getElementById('inputQuery');
const button = document.getElementById('searchButton');


function displayJPG(data){
    const jpgCollection = document.getElementById('jpg');
    jpgCollection.innerHTML = '';
    data.results.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.thumb;
        img.alt = photo.alt_description;
        jpgCollection.appendChild(img);
    });
}

function fetchData(url){
    if (!url) return;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayJPG(data);
    });
}

button.addEventListener('click', () =>{
    const value = input.value;
    console.log(value);
    apiURL=`https://api.unsplash.com/search/photos?query=${value}&per_page=30&client_id=${apiKey}`;
    fetchData(apiURL);
});


