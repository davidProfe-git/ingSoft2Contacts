fetch("https://randomuser.me/api/?results=10&nat=mx")
    .then(resp => resp.json())
    .then(datos =>  {

        const tarjeta = document.getElementById("tarjeta1")
        datos.results.forEach( contactos => {
            const contenido = document.createElement("article")
            contenido.className = "contact-card"
            contenido.innerHTML = `
            <img src="${contactos.picture.large}" />
            <h2>${contactos.name.first} ${contactos.name.last}</h2>
            <p><strong>Email:</strong> ${contactos.email}</p>
            <p><strong>Teléfono:</strong> ${contactos.phone}</p>
            <p><strong>Ciudad:</strong> ${contactos.location.city}</p>
            `
            tarjeta.appendChild(contenido)


        }


        )




    }

            


    )
