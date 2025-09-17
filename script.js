fetch("https://randomuser.me/api/?results=1")
.then(resp => resp.json())
.then(datos => { 
    const tarjeta = document.getElementById("tarjeta1")
    datos.results.forEach( contactos => {
        const contenido = document.createElement("div")
        contenido.className = "card"
        contenido.innerHTML = `
        <img src="${contactos.picture.large}" />
        `
        tarjeta.appendChild(contenido)
    
    }


    )



}
    




)