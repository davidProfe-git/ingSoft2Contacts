fetch("https://randomuser.me/api/?results=10")
    .then(resp => resp.json())
    .then(datos =>  {

        const tarjeta = document.getElementById("tarjeta1")
        datos.results.forEach( contactos => {
            const contenido = document.createElement("article")
            contenido.className = "contact-card"
            contenido.innerHTML = `
            <img src="${contactos.picture.large}" />
            `
            tarjeta.appendChild(contenido)


        }


        )




    }

            


    )
