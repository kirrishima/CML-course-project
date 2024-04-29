document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signUpForm = document.getElementById("sign-up");
    const signupLink = document.querySelectorAll(".signup-link");

    signupLink.forEach((element) => {
        element.addEventListener("click", function (event) {
            event.preventDefault();

            // Добавляем класс для анимации
            loginForm.classList.toggle("hidden");
            signUpForm.classList.toggle("hidden");
        });
    });

    const togglePasswordButtonLogin = document.querySelector(
        ".login.toggle-password img"
    );
    const loginPassword = document.getElementById("login-password");

    const togglePasswordButtonSignup = document.querySelector(
        ".signup.toggle-password img"
    );
    const signupPassword = document.getElementById("signup-password");
    const confirmPassword = document.getElementById("confirm_password");

    togglePasswordButtonLogin.addEventListener("click", function () {
        if (loginPassword.type === "password") {
            loginPassword.type = "text";
            togglePasswordButtonLogin.setAttribute("src", "images/hide.png");
        } else {
            loginPassword.type = "password";
            togglePasswordButtonLogin.setAttribute("src", "images/view.png");
        }
    });
    togglePasswordButtonSignup.addEventListener("click", function () {
        if (signupPassword.type === "password") {
            signupPassword.type = "text";
            confirmPassword.type = "text";
            togglePasswordButtonSignup.setAttribute("src", "images/hide.png");
        } else {
            signupPassword.type = "password";
            confirmPassword.type = "password";
            togglePasswordButtonSignup.setAttribute("src", "images/view.png");
        }
    });

    // Обработчик события для кнопок отправки формы
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
            window.history.back();
        });
    });
});