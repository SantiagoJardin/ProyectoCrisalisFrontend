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

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)