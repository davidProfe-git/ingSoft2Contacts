console.log("Script cargado");
console.log("btnLoad elemento:", document.getElementById("btnLoad"));
console.log("userContainer elemento:", document.getElementById("userContainer"));

// Tu código actual aquí...
document.addEventListener('DOMContentLoaded', function() {
    const btnLoad = document.getElementById("btnLoad");
    const userContainer = document.getElementById("userContainer");

    async function fetchUser() {
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();
            const user = data.results[0];

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

    // Añadir event listener al botón
    if (btnLoad) {
        btnLoad.addEventListener("click", fetchUser);
    } else {
        console.error("No se encontró el botón btnLoad");
    }
});