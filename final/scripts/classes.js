document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("class-section");
    fetch("data/classes.json")
        .then(res => {
            if (!res.ok) throw new Error("Fetch failed");
            return res.json();
        })
        .then(data => {
            list.innerHTML = data.map(item => `
        <div class="class-card">
          <h3>${item.name}</h3>
          <p><strong>Days:</strong> ${item.day}</p>
          <p><strong>Time:</strong> ${item.time}</p>
          <p><strong>Location:</strong> ${item.location}</p>
        </div>
      `).join("");
        })
        .catch(err => {
            list.innerHTML = `<p>Error loading class data.</p>`;
        });
});