document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const map = {
        fname: "out-fname",
        lname: "out-lname",
        email: "out-email",
        phone: "out-phone",
        orgname: "out-org",
        timestamp: "out-timestamp"
    };

    for (const key in map) {
        const value = params.get(key) || "(Not provided)";
        const element = document.getElementById(map[key]);

        if (element) {
            if (key === "timestamp") {
                const date = new Date(value);
                element.textContent = isNaN(date)
                    ? "(Not provided)"
                    : date.toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short"
                    });
            } else {
                element.textContent = value;
            }
        }
    }
});