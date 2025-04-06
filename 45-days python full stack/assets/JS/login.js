document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value;
            let errorMessage = document.getElementById("errorMessage");

            let storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                errorMessage.style.color = "green";
                errorMessage.innerHTML = `Welcome Back, ${storedUser.firstname}!`;

                setTimeout(() => {
                    window.location.href = "products.html";
                }, 2000);
            } else {
                errorMessage.style.color = "red";
                errorMessage.innerHTML = "Invalid email or password!";
            }
        });
    }
});
