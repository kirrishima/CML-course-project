let xmlDoc;
let currentPage = 1;
let productsPerPage = 8;
let selectedCategory = 'all'; 
let products;
const imagesFolder = 'xml/images/';
let productsByCategories = {
    "all": [],
    "Refrigerators": [],
    "Microwave-Ovens": [],
    "Washing-Machines": [],
    "Electric-Devices": []
};

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

function proceedProductsInXML() {
    for (let i = 0; i < products.length; i++) {
        productsByCategories[products[i].getElementsByTagName("type")[0].textContent].push(products[i]);
        productsByCategories['all'].push(products[i]);
    }
    productsByCategories['all'] = shuffleNodeList(productsByCategories['all']);
}

function shuffleNodeList(nodeList) {
    const array = Array.from(nodeList);
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray;
}

function updatePage(page, prevProductsPerPage) {
    const productContainer = document.getElementById("products-container");
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
}
document.getElementById('load-more-btn').addEventListener('click', function () {
    currentPage++;
    updatePage(currentPage, productsPerPage);
});

const toggleButton = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

toggleButton.addEventListener("click", function () {
    dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
});

dropdownMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        if (toggleButton.textContent !== e.target.textContent) {
            toggleButton.textContent = e.target.textContent;
            dropdownMenu.style.display = "none";
            const productContainer = document.getElementById("products-container");
            const cards = document.querySelectorAll(".item-card");

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

document.addEventListener("click", function (e) {
    if (!dropdownMenu.contains(e.target) && e.target !== toggleButton) {
        dropdownMenu.style.display = "none";
    }
});