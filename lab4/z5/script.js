let endItem = document.querySelector('.end');
let lastSection = document.querySelector('section:last-of-type');
const navList = document.querySelector('nav ul');

let currentSection = 1;
const MAX_SECTIONS = 6;

async function fetchData(sectionID) {
    try {
        const response = await fetch(`http://localhost:3000/section${sectionID}`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        alert('Błąd podczas pobierania danych.\nUruchom serwer: json-server db.json --port 3000');
        console.error('Fetch error:', error);
        return null;
    }
}

function createNavLink(sectionID, sectionNumber){
    const li = document.createElement('li');
    li.classList.add('li_section');
    const link = document.createElement('a');
    link.href = `#${sectionID}`;
    link.textContent = `Sekcja ${sectionNumber}`;
    link.classList.add('link');
    li.appendChild(link);
    navList.appendChild(li);
}

async function addSection(){
    if(currentSection >= MAX_SECTIONS) return;

    currentSection++;
    const newSection = document.createElement('section');

    const data = await fetchData(currentSection);
    if(!data) return;

    newSection.classList.add(`section${currentSection}`);
    newSection.id = `section${currentSection}`;
    newSection.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.text}</p>
        <img src="${data.image}" alt="${data.alt}" class="end">
    `;

    endItem.classList.remove('end');
    lastSection.after(newSection);
    lastSection = newSection;
    endItem = document.querySelector('.end');
    
    observer.observe(endItem);
    sectionObserver.observe(newSection);
    createNavLink(newSection.id, currentSection);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(({ isIntersecting }) => {
            if (isIntersecting) {
                observer.unobserve(endItem);
                addSection();
            }
        });
    },
    { 
        threshold: 0.9
    }
);

observer.observe(endItem);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            const navItem = document.querySelector(`a[href="#${target.id}"]`);
            if (isIntersecting) {
                document.querySelectorAll('nav ul li').forEach(li => li.classList.remove('selected'));
                if(navItem){
                    navItem.parentElement.classList.add('selected');
                }
            }
        });
    },
    { 
        threshold: 0.8
    }
);

document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));
createNavLink('section1', 1);
