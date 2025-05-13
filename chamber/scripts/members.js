document.addEventListener("DOMContentLoaded", () => {
    const displayContainer = document.querySelector(".display-container");
    const gridButton = document.getElementById("grid-view");
    const listButton = document.getElementById("list-view");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const members = await response.json();
            return members;
        } catch (error) {
            console.error("Error fetching members: ", error);
            return [];
        }
    }

    function displayMembers(members, view) {
        displayContainer.innerHTML = "";
        displayContainer.classList.remove("grid", "list");
        displayContainer.classList.add(view);

        members.forEach(member => {
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

    gridButton.addEventListener("click", async () => {
        const members = await fetchMembers();
        displayMembers(members, "grid");
    });

    listButton.addEventListener("click", async () => {
        const members = await fetchMembers();
        displayMembers(members, "list");
    });

    fetchMembers().then(members => displayMembers(members, "grid"));
});