const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")
const nombre = document.querySelector("#nombre")
const precio = document.querySelector("#precio")
const stock = document.querySelector("#stock")
const fecha = document.querySelector("#fecha")
const guardarBtn = document.querySelector("#guardar")
const guardar = 'http://localhost:8080/producto/guardar_producto'
const lista = 'http://localhost:8080/producto/lista'
let resultados = ''
const contenedor = document.querySelector("#data")
const btnEditar = document.querySelector("#editar")
const btnEliminar = document.querySelector("#eliminar")

const nombreProducto = document.querySelector("#nombre-producto");
const precioProducto = document.querySelector("#precio-producto");
const fechaProducto = document.querySelector("#fecha-producto");
const cantidadProducto = document.querySelector("#cantidad-producto");
const centerPanelContainer = document.querySelector("#centerpanel-container");
const centerPanelProducto = document.querySelector("#centerpanel-producto");
const guardarEdicionProducto = document.querySelector("#guardar-edicion-producto");
const cerrarEdicionProducto = document.querySelector("#cerrar-edicion-producto");




//registro de productos
function registroProducto() { 
    const data = {
        producto : nombre.value,
        precio : precio.value,
        fecha : fecha.value,
        stock : stock.value,
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
    alert("Producto registrado")
}

guardarBtn.addEventListener("click", registroProducto)


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
            centerPanelProducto.style.display = "flex";
            nombreProducto.value = dataObjectArray[1][1];
            precioProducto.value = dataObjectArray[2][1];
            fechaProducto.value = dataObjectArray[3][1];
            cantidadProducto.value = dataObjectArray[4][1];

        })

        borrar.addEventListener("click", () => {
            let producto = dataObjectArray[0][1];
            let linkBorrar = `http://localhost:8080/producto/borrar?producto=${producto}`
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

    centerPanelProducto.style.display = "none";

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)

cerrarEdicionProducto.addEventListener("click", () => {
    centerPanelContainer.style.display = "none";
    centerPanelProducto.style.display = "none";
})

guardarEdicionProducto.addEventListener("click", () => {
    let link = `http://localhost:8080/producto/actualizar?producto=${nombreProducto.value}&precio=${precioProducto.value}&fecha=${fechaProducto.value}&stock=${cantidadProducto.value}`
    fetch(link, {
     method: "POST"
    })
     centerPanelContainer.style.display = "none";
     centerPanelProducto.style.display = "none";
     refreshTable("./headers.json", lista)
 
 })