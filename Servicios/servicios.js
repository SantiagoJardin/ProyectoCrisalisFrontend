const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")
const nombre = document.querySelector("#servico")
const precio = document.querySelector("#precio")
const soporte = document.querySelector("#soporte")

const guardarBtn = document.querySelector("#guardar")
const guardar = 'http://localhost:8080/servicio/guardar_servicio'
const lista = 'http://localhost:8080/servicio/lista'
let resultados = ''
const contenedor = document.querySelector("#data")
const btnEditar = document.querySelector("#editar")
const btnEliminar = document.querySelector("#eliminar")

const nombreServicio = document.querySelector("#nombre-servicio");
const precioServicio = document.querySelector("#precio-servicio");
const cargoSoporte= document.querySelector("#cargo-soporte");
const centerPanelContainer = document.querySelector("#centerpanel-container");
const centerPanelServicio = document.querySelector("#centerpanel-servicio");
const guardarEdicionServicio = document.querySelector("#guardar-edicion-servicio");
const cerrarEdicionServicio= document.querySelector("#cerrar-edicion-servicio");




//registro de servicios
function registroServicio() { 
    const data = {
        servicio : nombre.value,
        precio : precio.value,
        soporte : soporte.value,
    };
    const response = fetch(guardar, {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    alert("Servicio registrado")
}

guardarBtn.addEventListener("click", registroServicio)


async function fetchDataFromDB(lista) {
    const response = await fetch(lista)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function cargarBody(data) {
    console.log(data)
    for(let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < (dataObjectArray.length) - 0; i++) {

            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        editar = document.createElement("button");
        borrar = document.createElement("button");

        editar.addEventListener("click", () => {
            centerPanelContainer.style.display = "flex";
            centerPanelServicio.style.display = "flex";
            nombreServicio.value = dataObjectArray[1][1];
            precioServicio.value = dataObjectArray[2][1]
            cargoSoporte.value = dataObjectArray[3][1];

        })

        borrar.addEventListener("click", () => {
            let servicio = dataObjectArray[0][1];
            console.log
            let linkBorrar = `http://localhost:8080/servicio/borrar?servicio=${servicio}`
            let response = fetch(linkBorrar, {
                method: "POST"
               })
               console.log(response.status)
            refreshTable("./headers.json", lista)
        })

        let td = document.createElement("td");
        editar.innerHTML = '<img src="/home/santiago/Documentos/ProyectoCrisalis/img/boton-editar.png"/>'
        editar.className = "btn";
        borrar.innerHTML = '<img src="/home/santiago/Documentos/ProyectoCrisalis/img/basura.png"/>'
        borrar.className = "btn";
        td.append(editar)
        td.append(borrar)
        rowElement.appendChild(td)
        tableBody.appendChild(rowElement);

    }
}

async function refreshTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    tableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement); 
    }

    centerPanelServicio.style.display = "none";

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)

cerrarEdicionServicio.addEventListener("click", () => {
    centerPanelContainer.style.display = "none";
    centerPanelServicio.style.display = "none";
})

guardarEdicionServicio.addEventListener("click", () => {
    let link = `http://localhost:8080/servicio/actualizar?servicio=${nombreServicio.value}&precio=${precioServicio.value}&soporte=${cargoSoporte.value}`
    fetch(link, {
     method: "POST"
    })
     centerPanelContainer.style.display = "none";
     centerPanelServicio.style.display = "none";
     refreshTable("./headers.json", lista)
 
 })