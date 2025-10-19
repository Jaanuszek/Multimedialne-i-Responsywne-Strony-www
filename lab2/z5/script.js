const menuSection = document.querySelector('.menu-section');
const mainSection = document.querySelector('.main-section');
const menuCheck = document.querySelector('.menu-check');
const menuList = document.getElementById('menu-list');
const mainList = document.getElementById('main-list');

function addToMain(name)
{
    if (!document.querySelector(`#main-list li[data-name="${name}"]`))
    {
        const li = document.createElement('li');
        li.dataset.name = name;
        li.textContent = name;
        mainList.appendChild(li);
    }
}

function removeFromMain(name)
{
    const item = document.querySelector(`#main-list li[data-name="${name}"]`);
    if (item) {
        mainList.removeChild(item);
    }
}

async function loadData()
{
    try{
        // kategorie, produty przemyslowe i produkty spozywcze
        const [catRes, indProdRes, foodRes] = await Promise.all([
            fetch("http://localhost:3000/categories"),
            fetch("http://localhost:3000/foodProducts"),
            fetch("http://localhost:3000/industrialProducts")
        ]);
        const [catData, indProdData, foodData] = await Promise.all([
            catRes.json(),
            indProdRes.json(),
            foodRes.json()
        ]);

        console.log("Categories Data:", catData);
        console.log("Industrial Products Data:", indProdData);
        console.log("Food Products Data:", foodData);

        catData.forEach(category => {
            const li = document.createElement('li');
            const inputId = `category-${category.id}`;
            li.classList.add('category-item');
            li.innerHTML = `
                <button class="toggle-btn">▶</button>
                <input type="checkbox" id="${inputId}" class="category-checkbox" />
                <label for="${inputId}">${category.name}</label>
                <ul class="subcategory-list hidden"></ul>
                `;
            menuList.appendChild(li);

            const subcategoryList = li.querySelector('.subcategory-list');
            const toggleBtn = li.querySelector('.toggle-btn');
            const catCheckBox = li.querySelector(`.category-checkbox`);

            const mergedData = [
                ...foodData.filter(product => Number(product.categoryId) === Number(category.id)),
                ...indProdData.filter(product => Number(product.categoryId) === Number(category.id))
            ];

            // values() zwraca iteratory do wszystkich wartosci w mapie
            // operator "..." to jest "spread" operator - rozpakowuje iterowalne obiekty
            // czyli na przyklad iteratory, mapy itp
            // W tym przypadku [...] zamienia iteratory na zwykłą tablicę
            const uniqueProducts = [...new Map(mergedData.map(p => [p.name, p])).values()];

            uniqueProducts.forEach(product => {
                const item = document.createElement('li');
                const inputId = `cat-${category.id}-prod-${product.id}`;
                item.innerHTML = `
                    <input type="checkbox" id="${inputId}" />
                    <label for="${inputId}">${product.name}</label>
                `;
                subcategoryList.appendChild(item);
            });

            const uniqueProdCheckBoxes = subcategoryList.querySelectorAll('input[type="checkbox"]');

            uniqueProdCheckBoxes.forEach(checkbox => {
                checkbox.addEventListener('change', event => {
                    const input = event.target;
                    if (input.type === 'checkbox') {
                        const productName = input.nextElementSibling.textContent;
                        if (input.checked) {
                            addToMain(productName);
                        } else {
                            removeFromMain(productName);
                        }
                    }
                });
            });

            toggleBtn.addEventListener('click', () => {
                subcategoryList.classList.toggle('hidden');
                toggleBtn.textContent = toggleBtn.textContent === '▶' ? '▼' : '▶';
            });

            catCheckBox.addEventListener('change', event => {
                const isChecked = event.target.checked;
                
                uniqueProdCheckBoxes.forEach(checkbox => {
                    checkbox.checked = isChecked;

                    const productName = checkbox.nextElementSibling.textContent;
                    if (isChecked) {
                        addToMain(productName);
                    } else {
                        removeFromMain(productName);
                    }
                });
            });

        });
    }
    catch(error){
        console.error("Error fetching data:", error);
    }
}

loadData();