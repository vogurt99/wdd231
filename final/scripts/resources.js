// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.querySelector(".display-container");
//     const gridBtn = document.getElementById("grid-view");
//     const listBtn = document.getElementById("list-view");

//     const viewMode = localStorage.getItem("viewMode") || "grid";
//     container.className = `display-container ${viewMode}`;

//     fetch("data/resources.json")
//         .then(res => res.json())
//         .then(data => {
//             container.innerHTML = data.map((item, index) => `
//         <div class="card">
//           <h3>${item.name}</h3>
//           <p><strong>Type:</strong> ${item.type}</p>
//           <p>${item.description}</p>
//           <a href="${item.link}" target="_blank">Visit Resource</a>
//           <button class="modal-trigger" data-level="${index}">Details</button>
//         </div>

//         <div class="modal" id="modal-${index}">
//           <div class="modal-content">
//             <h2>${item.name}</h2>
//             <p>${item.description}</p>
//             <a href="${item.link}" target="_blank">Open Resource</a>
//             <button class="modal-close">Close</button>
//           </div>
//         </div>
//       `).join("");
//         });

//     gridBtn.addEventListener("click", () => {
//         container.className = "display-container grid";
//         localStorage.setItem("viewMode", "grid");
//     });

//     listBtn.addEventListener("click", () => {
//         container.className = "display-container list";
//         localStorage.setItem("viewMode", "list");
//     });

//     function handleResponsiveView() {
//         if (window.innerWidth < 600 && container.classList.contains("list")) {
//             container.className = "display-container grid";
//             localStorage.setItem("viewMode", "grid");
//         }
//     }

//     handleResponsiveView();
//     window.addEventListener("resize", handleResponsiveView);

// });

export function renderResources() {
    const container = document.querySelector(".display-container");
    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");

    const viewMode = localStorage.getItem("viewMode") || "grid";
    container.className = `display-container ${viewMode}`;

    fetch("data/resources.json")
        .then(res => {
            if (!res.ok) throw new Error("Fetch failed");
            return res.json();
        })
        .then(data => {
            render(data);
            setupModal(data);
        })
        .catch(err => {
            container.innerHTML = `<p>Error loading resources: ${err.message}</p>`;
        });

    function render(items) {
        container.innerHTML = items.map((item, index) => `
      <div class="card" data-index="${index}">
        <h3>${item.name}</h3>
        <p><strong>Type:</strong> ${item.type}</p>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Visit Resource</a>
        <button class="modal-trigger">Details</button>
      </div>
    `).join("");
    }

    function setupModal(items) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
      <div class="modal-content">
        <h2 id="modal-title"></h2>
        <p id="modal-desc"></p>
        <a id="modal-link" href="#" target="_blank">Open Resource</a>
        <button id="modal-close">Close</button>
      </div>`;
        document.body.appendChild(modal);

        container.addEventListener("click", e => {
            if (e.target.classList.contains("modal-trigger")) {
                const index = e.target.closest(".card").dataset.index;
                const item = items[index];
                document.getElementById("modal-title").textContent = item.name;
                document.getElementById("modal-desc").textContent = item.description;
                document.getElementById("modal-link").href = item.link;
                modal.style.display = "flex";
            }
        });

        document.getElementById("modal-close").addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("keydown", e => {
            if (e.key === "Escape") modal.style.display = "none";
        });
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth < 600 && container.classList.contains("list")) {
            container.className = "display-container grid";
            localStorage.setItem("viewMode", "grid");
        }
    });

    gridBtn.addEventListener("click", () => {
        container.className = "display-container grid";
        localStorage.setItem("viewMode", "grid");
    });

    listBtn.addEventListener("click", () => {
        container.className = "display-container list";
        localStorage.setItem("viewMode", "list");
    });
}