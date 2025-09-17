fetch("https://randomuser.me/api").then(resp=>resp.json())
.then(datos => {

    const tarjeta = document.getElementById("contacto1")

    datos.results.forEach( contactos => {
        const contenido = document.createElement("div")
        contenido.className = "contacto"
        contenido.innerHTML = `
        <img src="${contactos.picture.large}"/>
        `
        tarjeta.appendChild(contenido)
        
        })
    }
    
    )
