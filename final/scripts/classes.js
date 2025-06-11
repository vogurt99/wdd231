document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("class-section");

  try {
    const res = await fetch("data/classes.json");
    if (!res.ok) throw new Error("Fetch failed");

    const data = await res.json();

    list.innerHTML = data.map(item => `
            <div class="class-card">
              <h3>${item.name}</h3>
              <p><strong>Days:</strong> ${item.day}</p>
              <p><strong>Time:</strong> ${item.time}</p>
              <p><strong>Location:</strong> ${item.location}</p>
            </div>
        `).join("");
  } catch (err) {
    list.innerHTML = `<p>Error loading class data.</p>`;
    console.error("Error loading class data:", err);
  }
});