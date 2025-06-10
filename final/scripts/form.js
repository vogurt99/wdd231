document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", () => {
        localStorage.setItem("fname", document.getElementById("fname").value);
        localStorage.setItem("lname", document.getElementById("lname").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
    });
});
