document.getElementById("btnLoad").addEventListener("click", loadUsers);

async function loadUsers() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=6&nat=us,es,mx,fr");
    const data = await response.json();
    const users = data.results;

    const container = document.getElementById("userContainer");
    container.innerHTML = ""; // limpiar antes de cargar

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>País:</strong> ${user.location.country}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}
