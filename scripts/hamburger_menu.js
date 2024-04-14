// Получаем ссылки на элементы SVG
const topLine = document.getElementById("top-line-1");
const middleLine = document.getElementById("middle-line-1");
const bottomLine = document.getElementById("bottom-line-1");

// Функция для изменения графики на крестик с анимацией
function toggleCross() {
    topLine.setAttribute("class", "menu-to-cross-1");
    bottomLine.setAttribute("class", "menu-to-cross-2");
    middleLine.setAttribute("class", "menu-to-cross-3");
}

// Функция для изменения графики на меню с анимацией
function toggleOriginal() {
    topLine.setAttribute("class", "cross-to-menu-1");
    bottomLine.setAttribute("class", "cross-to-menu-2");
    middleLine.setAttribute("class", "cross-to-menu-3");
}

function ToggleMenu() {
    let body = document.querySelector("body");
    body.classList.toggle("menu-open");

    let navBar = document.querySelector(".nav-bar");
    if (navBar.classList.contains("active")) {
        navBar.classList.toggle("active");
        navBar.style.animation =
            "slideOut 0.2s cubic-bezier(0.42, 0, 0.58, 1) forwards";
        body.style.overflow = "auto";
        toggleOriginal();
    } else {
        navBar.classList.toggle("active");
        navBar.style.display = "flex"; // Показываем блок
        navBar.style.animation = "slideIn 0.2s cubic-bezier(0.42, 0, 0.58, 1) forwards";
        // Отключаем прокрутку страницы
        body.style.overflow = "hidden";
        toggleCross();
    }

    let navElement = document.querySelector("div.navigation");
    let navHeight = navElement.offsetHeight;
    let navBarActive = document.querySelector(".nav-bar");
    navBarActive.style.top = navHeight + "px";
}
document.querySelector(".box").addEventListener("click", ToggleMenu);
document.querySelectorAll(".nav-items").forEach((navItem) => {
    navItem.addEventListener("click", function () {
        if (document.querySelector(".nav-bar").classList.contains("active")) {
            ToggleMenu();
        }
    });
});