const topLine = document.getElementById("top-line-1");
const middleLine = document.getElementById("middle-line-1");
const bottomLine = document.getElementById("bottom-line-1");

function toggleCross() {
    topLine.setAttribute("class", "menu-to-cross-1");
    bottomLine.setAttribute("class", "menu-to-cross-2");
    middleLine.setAttribute("class", "menu-to-cross-3");
}

function toggleOriginal() {
    topLine.setAttribute("class", "cross-to-menu-1");
    bottomLine.setAttribute("class", "cross-to-menu-2");
    middleLine.setAttribute("class", "cross-to-menu-3");
}

function ToggleMenu() {
    let body = document.querySelector("body");
    let navBar = document.querySelector(".menu");
    if (navBar.classList.contains("active")) {
        navBar.style.animation =
            "slideOut 0.2s cubic-bezier(0.42, 0, 0.58, 1) forwards";
        body.style.overflow = "auto";
        toggleOriginal();
    } else {
        navBar.style.display = "flex";
        navBar.style.animation = "slideIn 0.2s cubic-bezier(0.42, 0, 0.58, 1) forwards";
        body.style.overflow = "hidden";
        toggleCross();
    }
    navBar.classList.toggle("active");
    let navElement = document.querySelector("div.navigation");
    let navHeight = navElement.offsetHeight;
    navBar.style.top = navHeight + "px";
}
document.querySelector(".hamburger-menu").addEventListener("click", ToggleMenu);
function disableMenu() {
    if (document.querySelector(".menu").classList.contains("active")) {
        ToggleMenu();
    }
}
document.querySelectorAll(".menu-item").forEach((navItem) => {
    navItem.addEventListener("click", function () {
        disableMenu();
    });
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        disableMenu();
        document.querySelector(".menu").removeAttribute('style');
        document.querySelector("body").removeAttribute('style');
    }
})