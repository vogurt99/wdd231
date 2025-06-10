document.addEventListener("DOMContentLoaded", () => {
    const map = {
        fname: "out-fname",
        lname: "out-lname",
        email: "out-email",
        phone: "out-phone"
    };

    for (const key in map) {
        const value = localStorage.getItem(key) || "(Not provided)";
        const element = document.getElementById(map[key]);

        if (element) {
            element.textContent = value;
        }
    }
});