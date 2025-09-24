fetch("https://randomuser.me/api/?results=5&nat=mx")
    .then(resp => resp.json())
    .then(datos => {

        const tarjeta = document.getElementById("tarjeta1")
        datos.results.forEach( contactos =>{
            const contenido = document.createElement("div")
            contenido.className = "card"
            contenido.innerHTML = `
            <img src="${contactos.picture.large}" />
            <h2>${contactos.name.first} ${contactos.name.last}</h2>
            <p>📞${contactos.phone}</p>
            <p>✉️${contactos.email}</p>
             `
            tarjeta.appendChild(contenido)

        }



        )



        }
        
        



    )


