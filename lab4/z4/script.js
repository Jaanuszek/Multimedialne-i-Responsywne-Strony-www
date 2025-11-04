const contentItems = document.querySelectorAll('.content-item');
const endItem = document.getElementById('end');

console.log(endItem);

function addHtmlElements(){
    observer.unobserve(endItem);
    for (let i = 0; i < 5; i++) {
        const newItem = document.createElement('div');
        newItem.classList.add('content-item');
        newItem.innerHTML = `
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque similique quasi earum, rem molestias in ea maiores doloremque ipsum doloribus. Rem eius nulla, iste corrupti ducimus doloremque aliquid aperiam earum?</p>
            <img src="jpg/${Math.floor(Math.random() * 7) + 1}.jpg" alt="Image">
        `;
        endItem.parentNode.insertBefore(newItem, endItem);
    }
    observer.observe(endItem);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(({isIntersecting }) => {
            if (isIntersecting) {
                console.log('Loading more content...');
                addHtmlElements();
            }
        });
    },
    { 
        threshold: 0.1
    }
);

observer.observe(endItem);