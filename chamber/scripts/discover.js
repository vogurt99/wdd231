const container = document.getElementById("card-container");

fetch("data/discover.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const title = document.createElement("h2");
            title.textContent = item.name;

            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.setAttribute("src", item.image);
            img.setAttribute("alt", item.caption);
            img.setAttribute("loading", "lazy");
            img.setAttribute("width", "300");
            img.setAttribute("height", "200");

            const caption = document.createElement("figcaption");
            caption.textContent = item.caption;

            figure.appendChild(img);
            figure.appendChild(caption);

            const address = document.createElement("address");
            address.textContent = item.address;

            const description = document.createElement("p");
            description.textContent = item.description;

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = item.buttonText;

            card.appendChild(title);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(button);

            container.appendChild(card);
        });
    })
    .catch((error) => {
        console.error("Failed to load data:", error);
        container.textContent = "Error loading content.";
    });