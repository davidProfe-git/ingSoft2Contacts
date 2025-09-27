document.addEventListener('DOMContentLoaded', () => {
    const userCard = document.getElementById('user-card');
    const loadUserBtn = document.getElementById('load-user-btn');


    const API_URL = 'https://randomuser.me/api/';


    async function loadRandomUser() {
        userCard.innerHTML = '<p>Cargando usuario...</p>'; 

        try {
            const response = await fetch(API_URL);

            const data = await response.json();

            const user = data.results[0];

            const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
            const email = user.email;
            const picture = user.picture.large; 
            const location = `${user.location.city}, ${user.location.country}`;
            const phone = user.phone;

            userCard.innerHTML = `
                <img src="${picture}" alt="Foto de ${name}">
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Ubicación:</strong> ${location}</p>
            `;

        } catch (error) {
            console.error('Error al cargar el usuario:', error);
            userCard.innerHTML = '<p style="color: red;">Error al cargar los datos. Inténtalo de nuevo.</p>';
        }
    }

    loadRandomUser();

    loadUserBtn.addEventListener('click', loadRandomUser);
});