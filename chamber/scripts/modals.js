document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll(".modal-trigger");
    triggers.forEach(button => {
        button.addEventListener("click", () => {
            const level = button.dataset.level;
            const modal = document.getElementById(`modal-${level}`);
            if (modal) {
                modal.style.display = "flex";
            }
        });
    });

    const closeButtons = document.querySelectorAll(".modal-close");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            modal.style.display = "none";
        });
    });

    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});
