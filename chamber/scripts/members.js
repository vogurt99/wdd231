document.addEventListener("DOMContentLoaded", () => {
    const displayContainer = document.querySelector(".display-container");
    const gridButton = document.getElementById("grid-view");
    const listButton = document.getElementById("list-view");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching members:", error);
            return [];
        }
    }

    function displayMembers(members, view, limit = null) {
        displayContainer.innerHTML = "";
        displayContainer.classList.remove("grid", "list");
        displayContainer.classList.add(view);

        const limitedMembers = limit ? members.slice(0, limit) : members;

        limitedMembers.forEach(member => {
            const memberElement = document.createElement("section");
            memberElement.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.info}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            displayContainer.appendChild(memberElement);
        });
    }

    const currentPage = window.location.pathname;

    fetchMembers().then(members => {
        if (currentPage.includes("index.html")) {
            displayMembers(members, "grid", 3);
        } else {
            displayMembers(members, "grid");
        }

        if (gridButton && listButton) {
            gridButton.addEventListener("click", () => {
                displayMembers(members, "grid");
            });

            listButton.addEventListener("click", () => {
                displayMembers(members, "list");
            });
        }
    });
});
