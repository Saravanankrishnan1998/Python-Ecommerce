document.addEventListener("DOMContentLoaded", function () {
    let signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let firstname = document.getElementById("firstname").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value;
            let confirmpassword = document.getElementById("confirmpassword").value;
            let errorMessage = document.getElementById("errorMessage");

            errorMessage.innerHTML = ""; // Clear previous errors

            // ✅ Check if fields are empty
            if (!firstname || !email || !password || !confirmpassword) {
                errorMessage.style.color = "red";
                errorMessage.innerHTML = "All fields are required!";
                return;
            }

            // ✅ Validate password match
            if (password !== confirmpassword) {
                errorMessage.style.color = "red";
                errorMessage.innerHTML = "Passwords do not match!";
                return;
            }

            // ✅ Store only values
            let user = { firstname, email, password };
            localStorage.setItem("user", JSON.stringify(user));

            errorMessage.style.color = "green";
            errorMessage.innerHTML = "Registration Successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }
});