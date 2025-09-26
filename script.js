const btnLoad = document.getElementById("btnLoad");
const userContainer = document.getElementById("userContainer");

// Función para traer un usuario aleatorio
async function fetchUser() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = data.results[0];

    // Crear card
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
      <h2>${user.name.first} ${user.name.last}</h2>
      <p>📧 ${user.email}</p>
      <p>📞 ${user.phone}</p>
      <p>🌍 ${user.location.city}, ${user.location.country}</p>
    `;

    userContainer.appendChild(card);

  } catch (error) {
    console.error("Error al cargar usuario:", error);
  }
}

// Cargar un usuario inicial
fetchUser();

// Cargar más al dar clic
btnLoad.addEventListener("click", fetchUser);
