let xmlDoc; // Переменная для хранения XML-документа
let currentPage = 1;
let productsPerPage = 6; // Количество товаров на странице, 8 по умолчанию
let selectedCategory = 'all'; // Выбранная категория
let products; // Список с товарами
const imagesFolder = 'xml/images/';
// словарь для хранения товаров по категориям
let productsByCategories = {
    "all": [],
    "Refrigerators": [],
    "Microwave-Ovens": [],
    "Washing-Machines": [],
    "Electric-Devices": []
};

// Загрузка XML-файла
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        xmlDoc = this.responseXML;
        products = xmlDoc.getElementsByTagName("item-card");
        proceedProductsInXML();
        updatePage(currentPage, productsPerPage);
    }
};
xmlhttp.open("GET", "xml/data.xml", true);
xmlhttp.send();

// function checkOverflow() {
//     let descriptions = document.getElementsByClassName("description");
//     // Используем цикл for...of для перебора элементов HTMLCollection
//     for (let block of descriptions) {
//         block.classList.toggle(
//             "has-scrollbar",
//             block.scrollWidth > block.clientWidth ||
//             block.scrollHeight > block.clientHeight
//         );
//     }
// }

function proceedProductsInXML() {
    for (let i = 0; i < products.length; i++) {
        productsByCategories[products[i].getElementsByTagName("type")[0].textContent].push(products[i]);
        productsByCategories['all'].push(products[i]);
    }
    productsByCategories['all'] = shuffleNodeList(productsByCategories['all']);
}

function shuffleNodeList(nodeList) {
    // Преобразование NodeList в массив
    const array = Array.from(nodeList);

    // Перемешивание массива
    const shuffledArray = array.sort(() => Math.random() - 0.5);

    return shuffledArray;
}

// Обработка данных XML
function updatePage(page, prevProductsPerPage) {
    // Очищаем контейнер перед добавлением новых товаров
    const productContainer = document.getElementById("products-container");

    // Рассчитываем индексы для отображения нужной страницы
    const startIndex = (page - 1) * prevProductsPerPage;
    const endIndex = startIndex + productsPerPage;

    let products = productsByCategories[selectedCategory];
    for (let i = startIndex; i < products.length && i < endIndex; i++) {
        const type = products[i].getElementsByTagName("type")[0].textContent;
        const apath = products[i].getElementsByTagName("a")[0].textContent;
        const imgpath = products[i].getElementsByTagName("img")[0].textContent.trim();
        const name = products[i].getElementsByTagName("name")[0].textContent;
        const description = products[i].getElementsByTagName("description")[0].textContent;
        const price = products[i].getElementsByTagName("price")[0].textContent;

        const productElement = document.createElement("div");
        productElement.classList.add("item-card");
        productElement.classList.add(type);
        productElement.innerHTML = `
            <a href="${apath}">
                <img src="${imagesFolder + imgpath}">
            </a>
            <div class="name-and-price">
                <div class="name">${name}</div>
                <div class="price">${price}</div>
                <div class="description" id="description">${description}</div>
            </div>
        `;

        productContainer.appendChild(productElement);
    }
    const loadMoreButton = document.getElementById('load-more-btn');
    loadMoreButton.style.display = (startIndex + productsPerPage < products.length) ? 'block' : 'none';
    // checkOverflow();
}
document.getElementById('load-more-btn').addEventListener('click', function () {
    currentPage++;
    updatePage(currentPage, productsPerPage);
    // window.scroll(0, 0);
});
// Получаем ссылки на элементы кнопки и выпадающего меню
const toggleButton = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

// Обработчик клика по кнопке
toggleButton.addEventListener("click", function () {
    dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
});

// Обработчик клика по элементам выпадающего меню
dropdownMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        if (toggleButton.textContent !== e.target.textContent) {
            toggleButton.textContent = e.target.textContent;
            dropdownMenu.style.display = "none";
            const productContainer = document.getElementById("products-container");
            const cards = document.querySelectorAll(".item-card");

            // Проходим по каждому элементу с классом "item-card" и удаляем его
            cards.forEach(card => {
                productContainer.removeChild(card);
            });
            currentPage = 1;
            selectedCategory = e.target.id;

            updatePage(currentPage, productsPerPage);
        } else {
            dropdownMenu.style.display = "none";
        }
    }
});

// Обработчик клика по документу для закрытия меню при клике вне его области
document.addEventListener("click", function (e) {
    if (!dropdownMenu.contains(e.target) && e.target !== toggleButton) {
        dropdownMenu.style.display = "none";
    }
});

// Вызов функции при загрузке страницы и изменении размеров экрана
// window.addEventListener("DOMContentLoaded", checkOverflow);
// window.addEventListener("resize", checkOverflow);
