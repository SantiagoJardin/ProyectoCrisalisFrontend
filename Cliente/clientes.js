const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")
const empresa = document.querySelector("#empresa")
const nombre = document.querySelector("#nombre")
const identificacion = document.querySelector("#identificacion")
const apellido = document.querySelector("#apellido")
const direccion = document.querySelector("#direccion")
const email = document.querySelector("#email")
const razonSocial = document.querySelector("#razon")
const fechaInicio = document.querySelector("#fecha")
const guardarBtn = document.querySelector("#guardar")
const guardar = 'http://localhost:8080/cliente/guardar_cliente'
const lista = 'http://localhost:8080/cliente/lista'
let resultados = ''
const contenedor = document.querySelector("#data")

//registro de clientes
function registroCliente() { 
    const data = {
        es_empresa : empresa.value,
        nombre : nombre.value,
        apellido : apellido.value,
        direccion : direccion.value,
        email : email.value,
        razon_social : razonSocial.value,
        fechaInicio : fechaInicio.value
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
    alert("Usuario registrado")
}

guardarBtn.addEventListener("click", registroCliente)


async function fetchDataFromDB(lista) {
    const response = await fetch(lista)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function cargarBody(data) {
    for(let dataObject of data) {
        console.log(dataObject)
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < (dataObjectArray.length) - 2; i++) {
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
