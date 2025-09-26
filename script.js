fetch("https://randomuser.me/api/?results=5&nat=mx")
      .then(resp => resp.json())
      .then(datos => {
        const tarjeta = document.getElementById("tarjeta1")
        datos.results.forEach(contactos => {
          const contenido = document.createElement("div")
          contenido.className = "card"
          contenido.innerHTML = `
            <img src="${contactos.picture.large}" alt="Foto de ${contactos.name.first}" />
            <h2>${contactos.name.first} ${contactos.name.last}</h2>
            <p>📞 ${contactos.phone}</p>
            <p>📧 ${contactos.email}</p>
            <p>⚧ ${contactos.gender}</p>
            <p>🌍 ${contactos.location.country}</p>
            <p>🕒 Edad: ${contactos.dob.age}</p>
          `
          tarjeta.appendChild(contenido)
        })
      })
      .catch(error => console.error("Error:", error))